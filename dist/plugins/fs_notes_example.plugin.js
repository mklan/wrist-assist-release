"use strict";
const plugin = {
    name: "fs_notes_example",
    description: "Demo: Create, list, and read notes using the plugin_data filesystem.",
    options: {
        action: {
            type: "string",
            label: "Action",
            description: "create, list, or read",
            required: true,
            enum: ["create", "list", "read"],
        },
        note: {
            type: "string",
            label: "Note Text",
            description: "Text to save as a note (for create)",
        },
        filename: {
            type: "string",
            label: "Filename",
            description: "Filename to read (for read)",
        },
    },
    handle: async function (context, hooks) {
        const { action, note, filename } = context.options;
        if (action === "create") {
            const fname = `note_${Date.now()}.txt`;
            await hooks.fs.write(fname, note || "");
            await hooks.log("Note created:", fname);
            return { result: `Note saved as ${fname}` };
        }
        else if (action === "list") {
            const files = await hooks.fs.list();
            return { result: `Notes: "${files.join(", ")}"` };
        }
        else if (action === "read") {
            if (!filename)
                return { result: null, error: "Filename required" };
            const content = await hooks.fs.read(filename);
            return { result: `Content of ${filename}:\n${content}` };
        }
        return { result: null, error: "Unknown action" };
    },
};
module.exports = plugin;
//# sourceMappingURL=fs_notes_example.plugin.js.map