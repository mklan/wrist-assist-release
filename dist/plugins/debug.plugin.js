"use strict";
/**
 * Debug plugin – Echo input text with Node.js runtime stats (no network)
 */
const plugin = {
    name: "debug",
    description: "Echo input text with Node.js runtime stats (no network)",
    handle: async function (context) {
        const mem = process.memoryUsage();
        const mb = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
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
module.exports = plugin;
//# sourceMappingURL=debug.plugin.js.map