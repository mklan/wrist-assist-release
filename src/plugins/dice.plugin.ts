import { Context, Plugin, PluginResult } from "../types/plugin.types";

const plugin: Plugin = {
  name: "dice",
  description: "Returns a random dice roll (1-6) as a string.",
  options: {},
  handle: async function (context: Context): Promise<PluginResult> {
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll.toString();
  },
};

export = plugin;
