# Wrist-Ops Agents & Plugins

This repository contains plugins (agents) for the Wear OS app **Wrist-Ops**. These plugins are downloaded and executed on the watch when a specific regex pattern matches the user's text input, either by voice or touch keyboard.

## How Agents Work

- **Trigger:** Each plugin is activated by matching a regex pattern against the user's input.
- **Execution:** When triggered, the plugin runs on the device, providing extended functionality to the Wrist-Ops app.
- **Distribution:** Plugins are downloaded dynamically to the watch as needed.

## Repository Location

- **Local Path:** `~/projects/wrist-assist` ("wrist-assist" was the original working title)
- **Repo Status:** Private

## Plugin List

- `debug.plugin.ts`
- `http_request.plugin.ts`
- `note.plugin.ts`
- `openai2.plugin.ts`

## Usage

1. Install Wrist-Ops on your Wear OS device.
2. Plugins are automatically downloaded and executed when their regex pattern matches your input.

## Contributing

This repository is private. For local development, use the path above.

---

For more details, see the main [README.md](README.md).
