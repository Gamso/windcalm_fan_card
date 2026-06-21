#!/bin/bash
set -e

echo "════════════════════════════════════════════════════"
echo "  Windcalm Card – Home Assistant DevContainer setup"
echo "════════════════════════════════════════════════════"
echo ""

WORKSPACE=/workspaces/create_windcalm_card
CONFIG=/config

# ── Directories ──────────────────────────────────────────────────────────────
mkdir -p "$CONFIG/www/windcalm_card"
mkdir -p "$CONFIG/.storage"
mkdir -p "$CONFIG/custom_components"

# ── configuration.yaml ───────────────────────────────────────────────────────
if [ ! -f "$CONFIG/configuration.yaml" ] || \
   [ "$WORKSPACE/.devcontainer/config/configuration.yaml" -nt "$CONFIG/configuration.yaml" ]; then
  echo "📝 Copying configuration.yaml..."
  cp "$WORKSPACE/.devcontainer/config/configuration.yaml" "$CONFIG/configuration.yaml"
  echo "   ✅ Done"
fi

# ── Lovelace dashboard ───────────────────────────────────────────────────────
if [ ! -f "$CONFIG/ui-lovelace.yaml" ] || \
   [ "$WORKSPACE/.devcontainer/config/ui-lovelace.yaml" -nt "$CONFIG/ui-lovelace.yaml" ]; then
  echo "📝 Copying ui-lovelace.yaml..."
  cp "$WORKSPACE/.devcontainer/config/ui-lovelace.yaml" "$CONFIG/ui-lovelace.yaml"
  echo "   ✅ Done"
fi

# ── Card JS file ─────────────────────────────────────────────────────────────
if [ -f "$WORKSPACE/dist/windcalm-fan-card.js" ]; then
  echo "✅ windcalm-fan-card.js found in dist/ – mounted automatically via devcontainer."
else
  echo ""
  echo "⚠️  WARNING: dist/windcalm-fan-card.js not found."
  echo ""
  echo "   Build the card first on your HOST machine:"
  echo "   1. cd $WORKSPACE"
  echo "   2. npm install"
  echo "   3. npm run build"
  echo ""
  echo "   The dist/ folder is mounted into /config/www/windcalm_card/,"
  echo "   so the card will appear automatically after building."
fi

# ── Start Home Assistant ─────────────────────────────────────────────────────
echo ""
echo "🚀 Starting Home Assistant..."
nohup python3 -m homeassistant --config "$CONFIG" > "$CONFIG/home-assistant.log" 2>&1 &
echo "   PID: $!"

echo ""
echo "✅ Setup complete!"
echo ""
echo "⏳ Home Assistant is starting (1–2 min for first boot)."
echo "   → http://localhost:8123"
echo ""
echo "📋 First-run steps:"
echo "   1. Complete the onboarding wizard (create an admin account)."
echo "   2. Profile (bottom-left) → enable Advanced Mode."
echo "   3. The 'Windcalm Dev' dashboard should appear automatically."
echo ""
echo "🔧 Simulate fan actions from the Home Assistant UI:"
echo "   Settings → Devices & Services → Helpers"
echo "   (search for 'wc_' to find all simulated Windcalm entities)"
echo ""
echo "📦 Rebuild card (run on HOST, not inside container):"
echo "   npm run build   (or: npm run watch)"
echo "   Then hard-refresh the browser (Ctrl+Shift+R)."
echo ""

sleep 2
