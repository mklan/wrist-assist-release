"use strict";
const plugin = {
    name: "dice",
    description: "Returns a random dice roll (1-6) as a string.",
    options: {},
    handle: async function (context) {
        const roll = Math.floor(Math.random() * 6) + 1;
        return roll.toString();
    },
};
module.exports = plugin;
//# sourceMappingURL=dice.plugin.js.map