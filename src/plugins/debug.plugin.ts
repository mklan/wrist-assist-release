/**
 * Debug plugin – Echo input text with Node.js runtime stats (no network)
 */

import { Context, PluginResult, Plugin } from "../types/plugin.types";

const plugin: Plugin = {
  name: "debug",
  description: "Echo input text with Node.js runtime stats (no network)",

  handle: async function (context: Context): Promise<PluginResult> {
    const mem = process.memoryUsage();
    const mb = (b: number) => (b / 1024 / 1024).toFixed(1) + " MB";
    const upSec = Math.floor(process.uptime());

    const stats = [
      `date: ${new Date()}`,
      "node " + process.version,
      "uptime: " + upSec + "s",
      "heap: " + mb(mem.heapUsed) + " / " + mb(mem.heapTotal),
      "rss: " + mb(mem.rss),
    ].join(" | ");

    return { result: context.text + "\n\n[echo] " + stats };
  },
};

export = plugin;
