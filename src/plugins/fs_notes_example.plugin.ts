import {
  Plugin,
  Context,
  PluginHooks,
  PluginResult,
} from "../types/plugin.types";

const plugin: Plugin = {
  name: "fs_notes_example",
  description:
    "Demo: Create, list, and read notes using the plugin_data filesystem.",
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
  handle: async function (
    context: Context,
    hooks: PluginHooks,
  ): Promise<PluginResult> {
    const { note } = context.options;
    const fname = `note_${Date.now()}.txt`;
    await hooks.fs.write(fname, note || "");
    await hooks.log("Note created:", fname);
    const files = await hooks.fs.list();
    return `Notes: "${files.join(", ")}"`;
  },
};

export = plugin;
