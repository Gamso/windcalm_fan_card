# Windcalm Fan Card

A custom Home Assistant card to control the CREATE Windcalm ceiling fan (6 speeds) via Tuya Local.

## Features

- 6-speed control with named labels (Très doux → Turbo)
- Animated fan icon that spins faster with speed
- Light toggle, stop timer, and sound beep controls
- Language auto-detected from Home Assistant (`fr` / `en`)
- Visual editor in the HA dashboard UI

## Installation

### Manual Installation

### HACS (recommended)

1. Add this repository to HACS as a custom **Frontend** repository.
2. Search for **Windcalm Fan Card** and install it.
3. HACS automatically registers the JS resource.

## Configuration

Only `fan_entity` is required. The light, timer, and sound entities are
auto-discovered from the fan's base object id, so you can drop one card per fan
with a single line of config. Add a second card for a second fan, etc.

### Minimal

```yaml
type: custom:windcalm-fan-card
fan_entity: fan.ceiling_fan_with_light
```

### Full

```yaml
type: custom:windcalm-fan-card
fan_entity: fan.ceiling_fan_with_light
name: Ventilateur salon # optional — defaults to the fan's friendly name
show_name: true # optional — default: true
```

The visual editor only asks for the fan entity, the card name, and the
"show name" toggle. The related entities are derived automatically and shown
read-only under "Auto-discovered entities". If auto-discovery ever picks the
wrong entity you can still override it in YAML with `light_entity`,
`timer_entity`, or `sound_entity`.

### Auto-discovery

From `fan.ceiling_fan_with_light` the card extracts the base id
`ceiling_fan_with_light` and looks for entities in each domain whose object id
starts with that base — e.g. `light.ceiling_fan_with_light`,
`number.ceiling_fan_with_light_minuteur`, `switch.ceiling_fan_with_light_son`.
This is robust to language-specific suffixes (`_minuteur`, `_son`, `_timer`, …).
Rows for entities that aren't found are simply hidden.

## Entities

| Entity                                   | Role                         |
| ---------------------------------------- | ---------------------------- |
| `fan.ceiling_fan_with_light`             | Fan on/off + speed (0–100 %) |
| `light.ceiling_fan_with_light`           | Ceiling light on/off         |
| `number.ceiling_fan_with_light_minuteur` | Stop timer (minutes)         |
| `switch.ceiling_fan_with_light_son`      | Audible beep on action       |

### Speed mapping

The fan entity uses a 0–100 % percentage. The card maps it to 6 named speeds:

| Speed | Percentage | FR label  | EN label |
| ----- | ---------- | --------- | -------- |
| Off   | 0 %        | Arrêt     | Off      |
| 1     | 17 %       | Très doux | Gentle   |
| 2     | 33 %       | Doux      | Soft     |
| 3     | 50 %       | Modéré    | Moderate |
| 4     | 67 %       | Moyen     | Normal   |
| 5     | 83 %       | Fort      | Strong   |
| 6     | 100 %      | Turbo     | Turbo    |

## Development

### DevContainer (Recommended)

To test the card in an isolated Home Assistant environment:

1. Open the project in VS Code
2. Install the **Dev Containers** extension
3. Build the card on your host first: `npm install && npm run build`
4. Click **"Reopen in Container"**
5. Home Assistant will be available at `http://localhost:8123`

See [.devcontainer/README.md](.devcontainer/README.md) for full details.
d

## License

MIT
