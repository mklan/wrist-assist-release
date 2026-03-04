import { Context, Plugin, PluginResult } from "../types/plugin.types";

const plugin: Plugin = {
  name: "decision",
  description:
    "Returns randomly 'yes' or 'no' as a string to help make decisions.",
  options: {},
  handle: async function (context: Context): Promise<PluginResult> {
    return Math.random() < 0.5 ? "yes" : "no";
  },
};

export = plugin;
