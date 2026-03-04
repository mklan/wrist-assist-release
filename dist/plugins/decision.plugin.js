"use strict";
const plugin = {
    name: "decision",
    description: "Returns randomly 'yes' or 'no' as a string to help make decisions.",
    options: {},
    handle: async function (context) {
        return Math.random() < 0.5 ? "yes" : "no";
    },
};
module.exports = plugin;
//# sourceMappingURL=decision.plugin.js.map