import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "./windcalm-fan-card-editor";
import { localize } from "./localize/localize";
import {
  WindcalmCardConfig,
  ResolvedEntities,
  TIMER_OPTIONS_MIN,
  SPEED_COUNT,
  percentageToSpeed,
  speedToPercentage,
  resolveEntities,
} from "./types";

class WindcalmFanCard extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: WindcalmCardConfig;

  // ── Static HA card registration ─────────────────────────────────────────────

  public static getStubConfig(): WindcalmCardConfig {
    return {
      fan_entity: "fan.ceiling_fan_with_light",
      show_name: true,
    };
  }

  public static getConfigElement() {
    return document.createElement("windcalm-fan-card-editor");
  }

  public getCardSize(): number {
    return 4;
  }

  // ── Config ──────────────────────────────────────────────────────────────────

  public setConfig(config: WindcalmCardConfig): void {
    if (!config?.fan_entity) throw new Error("fan_entity is required.");
    this._config = {
      show_name: true,
      ...config,
    };
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  private _t(key: Parameters<typeof localize>[1]): string {
    return localize(this.hass, key);
  }

  private get _entities(): ResolvedEntities {
    return resolveEntities(this.hass, this._config);
  }

  private get _fanState(): any {
    return this.hass?.states[this._entities.fan];
  }
  private get _lightState(): any {
    const id = this._entities.light;
    return id ? this.hass?.states[id] : undefined;
  }
  private get _timerState(): any {
    const id = this._entities.timer;
    return id ? this.hass?.states[id] : undefined;
  }
  private get _soundState(): any {
    const id = this._entities.sound;
    return id ? this.hass?.states[id] : undefined;
  }

  private get _currentSpeed(): number {
    const fan = this._fanState;
    if (!fan || fan.state === "off" || fan.state === "unavailable") return 0;
    return percentageToSpeed(Number(fan.attributes?.percentage ?? 0));
  }

  // FanEntityFeature.DIRECTION = 4
  private get _fanSupportsDirection(): boolean {
    const features = Number(this._fanState?.attributes?.supported_features ?? 0);
    return (features & 4) !== 0;
  }

  private get _fanDirection(): "forward" | "reverse" {
    return this._fanState?.attributes?.direction === "reverse"
      ? "reverse"
      : "forward";
  }

  private get _isLightOn(): boolean {
    return this._lightState?.state === "on";
  }

  private get _lightSupportsColorTemp(): boolean {
    const modes: string[] = this._lightState?.attributes?.supported_color_modes ?? [];
    return modes.includes("color_temp");
  }

  private get _minKelvin(): number {
    return Number(this._lightState?.attributes?.min_color_temp_kelvin ?? 2700);
  }
  private get _maxKelvin(): number {
    return Number(this._lightState?.attributes?.max_color_temp_kelvin ?? 6500);
  }
  private get _currentKelvin(): number {
    return Number(
      this._lightState?.attributes?.color_temp_kelvin ?? this._minKelvin
    );
  }

  private get _isSoundOn(): boolean {
    return this._soundState?.state === "on";
  }

  private get _timerValue(): number {
    return Number(this._timerState?.state ?? 0);
  }

  private _speedStateKey(speed: number): Parameters<typeof localize>[1] {
    if (speed === 0) return "speed.state_off";
    return `speed.state_s${speed}` as Parameters<typeof localize>[1];
  }

  private _speedLabelKey(speed: number): Parameters<typeof localize>[1] {
    return `speed.s${speed}` as Parameters<typeof localize>[1];
  }

  // ── Actions ─────────────────────────────────────────────────────────────────

  private _setSpeed(speed: number): void {
    if (speed === 0) {
      this.hass.callService("fan", "turn_off", { entity_id: this._entities.fan });
    } else {
      this.hass.callService("fan", "set_percentage", {
        entity_id: this._entities.fan,
        percentage: speedToPercentage(speed),
      });
    }
  }

  private _setDirection(direction: "forward" | "reverse"): void {
    this.hass.callService("fan", "set_direction", {
      entity_id: this._entities.fan,
      direction,
    });
  }

  private _toggleLight(): void {
    if (!this._entities.light) return;
    this.hass.callService("light", "toggle", { entity_id: this._entities.light });
  }

  private _setColorTemp(ev: Event): void {
    if (!this._entities.light) return;
    const kelvin = Number((ev.target as HTMLInputElement).value);
    this.hass.callService("light", "turn_on", {
      entity_id: this._entities.light,
      color_temp_kelvin: kelvin,
    });
  }

  private _setTimer(ev: Event): void {
    if (!this._entities.timer) return;
    const minutes = Number((ev.target as HTMLSelectElement).value);
    this.hass.callService("number", "set_value", {
      entity_id: this._entities.timer,
      value: minutes,
    });
  }

  private _toggleSound(): void {
    if (!this._entities.sound) return;
    this.hass.callService("switch", "toggle", { entity_id: this._entities.sound });
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  private _renderSpeedIcon(speed: number) {
    const animDurations = ["none", "2.5s", "1.5s", "0.9s", "0.6s", "0.35s", "0.15s"];
    const isOff = speed === 0;
    const iconStyle = isOff
      ? ""
      : `animation: spin ${animDurations[speed]} linear infinite;`;
    return html`
      <div class="fan-icon-wrap ${isOff ? "off" : ""}">
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          class="fan-svg ${isOff ? "off" : ""}"
          style="${iconStyle}"
          aria-hidden="true"
        >
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.69 9.22,10.88C9.41,10.4 9.73,9.97 10.13,9.65C8.14,5.96 8.92,2 12.5,2Z" />
        </svg>
      </div>
    `;
  }

  protected render() {
    if (!this._config) return nothing;
    if (!this.hass) return nothing;

    const fan = this._fanState;
    if (!fan) {
      return html`<ha-card><div class="error">${this._t("card.config_required")}</div></ha-card>`;
    }

    const speed = this._currentSpeed;
    const isUnavailable = fan.state === "unavailable";
    const cardName =
      this._config.name ||
      fan.attributes?.friendly_name ||
      this._t("card.name_default");

    return html`
      <ha-card>
        <div class="card-content ${isUnavailable ? "unavailable" : ""}">

          ${this._config.show_name !== false
            ? html`
              <div class="card-header">
                <div class="card-title">${cardName}</div>
              </div>
            `
            : nothing}

          ${isUnavailable
            ? html`<div class="unavailable-msg">${this._t("card.unavailable")}</div>`
            : nothing}

          <div class="fan-status-row">
            ${this._renderSpeedIcon(speed)}
            <div class="fan-info">
              <div class="fan-state">${this._t(this._speedStateKey(speed))}</div>
              <div class="fan-pct">
                ${speed === 0 ? "—" : `${speedToPercentage(speed)}%`}
              </div>
            </div>
          </div>

          <div class="section-label">${this._t("speed.label")}</div>

          <button
            class="off-btn ${speed === 0 ? "active" : ""}"
            @click=${() => this._setSpeed(0)}
            ?disabled=${isUnavailable}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            ${this._t("speed.off")}
          </button>

          <div class="speed-grid">
            ${Array.from({ length: SPEED_COUNT }, (_, i) => i + 1).map(
              (s) => html`
                <button
                  class="speed-btn ${speed === s ? "active" : ""}"
                  @click=${() => this._setSpeed(s)}
                  ?disabled=${isUnavailable}
                >
                  <span class="speed-num">${s}</span>
                  <span class="speed-lbl">${this._t(this._speedLabelKey(s))}</span>
                </button>
              `
            )}
          </div>

          ${this._fanSupportsDirection
            ? html`
              <div class="section-label dir-label">${this._t("controls.direction")}</div>
              <div class="dir-segment">
                <button
                  class="dir-btn ${this._fanDirection === "forward" ? "active" : ""}"
                  @click=${() => this._setDirection("forward")}
                  ?disabled=${isUnavailable}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M4 12a8 8 0 1 0 2.3 -5.6"/>
                    <polyline points="4 3 4 7 8 7"/>
                  </svg>
                  ${this._t("controls.dir_forward")}
                </button>
                <button
                  class="dir-btn ${this._fanDirection === "reverse" ? "active" : ""}"
                  @click=${() => this._setDirection("reverse")}
                  ?disabled=${isUnavailable}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M20 12a8 8 0 1 1 -2.3 -5.6"/>
                    <polyline points="20 3 20 7 16 7"/>
                  </svg>
                  ${this._t("controls.dir_reverse")}
                </button>
              </div>
            `
            : nothing}

          ${this._lightState || this._timerState || this._soundState
            ? html`<div class="divider"></div>`
            : nothing}

          ${this._lightState
            ? html`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1 -9 -9z"/>
                  </svg>
                  ${this._t("controls.light")}
                </div>
                <button
                  class="toggle ${this._isLightOn ? "on" : ""}"
                  @click=${this._toggleLight}
                  ?disabled=${isUnavailable}
                  aria-label="${this._t("controls.light")}"
                ></button>
              </div>
              ${this._isLightOn && this._lightSupportsColorTemp
                ? html`
                  <div class="temp-row">
                    <span class="temp-label warm">${this._t("controls.temp_warm")}</span>
                    <input
                      class="temp-slider"
                      type="range"
                      min="${this._minKelvin}"
                      max="${this._maxKelvin}"
                      step="100"
                      .value=${String(this._currentKelvin)}
                      @change=${this._setColorTemp}
                      ?disabled=${isUnavailable}
                      aria-label="${this._t("controls.color_temp")}"
                    />
                    <span class="temp-label cool">${this._t("controls.temp_cool")}</span>
                    <span class="temp-value">${this._currentKelvin}K</span>
                  </div>
                `
                : nothing}
            `
            : nothing}

          ${this._timerState
            ? html`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                    <polyline points="12 7 12 12 15 15"/>
                  </svg>
                  ${this._t("controls.timer")}
                </div>
                <select
                  class="timer-select"
                  .value=${String(this._timerValue)}
                  @change=${this._setTimer}
                  ?disabled=${isUnavailable}
                >
                  ${TIMER_OPTIONS_MIN.map(
                    (m) => html`
                      <option value="${m}" ?selected=${this._timerValue === m}>
                        ${m === 0
                          ? this._t("controls.timer_none")
                          : m < 60
                          ? `${m} min`
                          : `${m / 60} h`}
                      </option>
                    `
                  )}
                </select>
              </div>
            `
            : nothing}

          ${this._soundState
            ? html`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                  ${this._t("controls.sound")}
                </div>
                <button
                  class="toggle ${this._isSoundOn ? "on" : ""}"
                  @click=${this._toggleSound}
                  ?disabled=${isUnavailable}
                  aria-label="${this._t("controls.sound")}"
                ></button>
              </div>
            `
            : nothing}

        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      --wc-teal: #1d9e75;
      --wc-teal-light: #e1f5ee;
      --wc-teal-dark: #085041;
      --wc-teal-mid: #0f6e56;
      --wc-red-light: #fcebeb;
      --wc-red: #e24b4a;
      --wc-red-dark: #a32d2d;
    }

    ha-card {
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
    }
    .card-content.unavailable {
      opacity: 0.6;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
      text-align: center;
    }

    .unavailable-msg {
      font-size: 13px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 8px 0;
    }

    .fan-status-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .fan-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--wc-teal-light);
      border: 1.5px solid var(--wc-teal);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.3s, border-color 0.3s;
    }
    .fan-icon-wrap.off {
      background: var(--secondary-background-color);
      border-color: var(--divider-color);
    }

    .fan-svg {
      color: var(--wc-teal);
      transition: color 0.3s;
      transform-origin: center;
    }
    .fan-svg.off {
      color: var(--secondary-text-color);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .fan-info { min-width: 0; }
    .fan-state {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .fan-pct {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .section-label {
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .off-btn {
      width: 100%;
      padding: 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--secondary-text-color);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 8px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .off-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .off-btn.active {
      background: var(--wc-red-light);
      border-color: var(--wc-red);
      color: var(--wc-red-dark);
    }
    .off-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 16px;
    }

    .speed-btn {
      padding: 10px 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      text-align: center;
      transition: background 0.15s, border-color 0.15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }
    .speed-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .speed-btn.active {
      background: var(--wc-teal-light);
      border-color: var(--wc-teal);
    }
    .speed-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-num {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .speed-btn.active .speed-num {
      color: var(--wc-teal-dark);
    }
    .speed-lbl {
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .speed-btn.active .speed-lbl {
      color: var(--wc-teal-mid);
    }

    .dir-label {
      margin-top: 16px;
    }
    .dir-segment {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .dir-btn {
      padding: 9px 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .dir-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .dir-btn.active {
      background: var(--wc-teal-light);
      border-color: var(--wc-teal);
      color: var(--wc-teal-dark);
    }
    .dir-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .divider {
      height: 1px;
      background: var(--divider-color);
      margin: 12px 0;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 0;
    }
    .row-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .row-label svg {
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .temp-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0 10px 26px;
    }
    .temp-label {
      font-size: 11px;
      flex-shrink: 0;
    }
    .temp-label.warm {
      color: #ba7517;
    }
    .temp-label.cool {
      color: #378add;
    }
    .temp-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 42px;
      text-align: right;
      flex-shrink: 0;
    }
    .temp-slider {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(to right, #ffb46e, #fff6e8 50%, #cfe4ff);
      outline: none;
      cursor: pointer;
    }
    .temp-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .toggle {
      width: 40px;
      height: 22px;
      background: var(--divider-color);
      border-radius: 11px;
      position: relative;
      cursor: pointer;
      transition: background 0.2s;
      border: none;
      flex-shrink: 0;
      padding: 0;
    }
    .toggle.on {
      background: var(--wc-teal);
    }
    .toggle::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      background: white;
      border-radius: 50%;
      top: 3px;
      left: 3px;
      transition: left 0.2s;
    }
    .toggle.on::after {
      left: 21px;
    }
    .toggle:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .timer-select {
      font-size: 13px;
      padding: 5px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .timer-select:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .error {
      padding: 16px;
      font-size: 13px;
      color: var(--error-color, var(--wc-red));
    }
  `;
}

customElements.define("windcalm-fan-card", WindcalmFanCard);

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview?: boolean }[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "windcalm-fan-card",
  name: "Windcalm Fan Card",
  description: "Custom card for the CREATE Windcalm ceiling fan",
  preview: true,
});
