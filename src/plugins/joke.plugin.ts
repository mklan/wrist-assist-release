import { Context, Plugin, PluginResult } from "../types/plugin.types";

const plugin: Plugin = {
  name: "joke",
  description: "Returns a random joke from an open jokes API.",
  options: {},
  handle: async function (context: Context, hooks): Promise<PluginResult> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
      );
      if (!response.ok) {
        return {
          result: null,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      const data = await response.json();
      const joke = `${data.setup} ${data.punchline}`;
      return joke;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return { result: null, error: `Request failed: ${errorMsg}` };
    }
  },
};

export = plugin;
