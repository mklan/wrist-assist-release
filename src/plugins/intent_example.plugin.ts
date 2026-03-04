import {
  Plugin,
  Context,
  PluginHooks,
  PluginResult,
} from "../types/plugin.types";

const plugin: Plugin = {
  name: "intent_example",
  description: "Demo: Launches an Android intent to open a URL or share text.",
  options: {
    action: {
      type: "string",
      label: "Intent Action",
      description: "Android intent action, e.g. android.intent.action.VIEW",
      required: true,
    },
    data: {
      type: "string",
      label: "Data URI",
      description: "URI to open or share, e.g. https://example.com",
    },
    type: {
      type: "string",
      label: "MIME Type",
      description: "Optional MIME type, e.g. text/plain",
    },
    text: {
      type: "string",
      label: "Text to Share",
      description: "Text to share via intent (for SEND action)",
    },
  },
  handle: async function (
    context: Context,
    hooks: PluginHooks,
  ): Promise<PluginResult> {
    const { action, data, type, text } = context.options;
    const intentOpts: any = {};
    if (data) intentOpts.data = data;
    if (type) intentOpts.type = type;
    if (text) intentOpts.extras = { "android.intent.extra.TEXT": text };
    await hooks.intent(action, intentOpts);
    await hooks.log("Intent sent:", action, intentOpts);
    return { result: `Intent '${action}' sent.` };
  },
};

export = plugin;
