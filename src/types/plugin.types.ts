/**
 * Shared plugin interfaces for Wrist Assist plugins
 */

export interface Context {
  options: Record<string, any>;
  params: Record<string, any>;
  text: string;
  messages?: Message[]; // For multi-turn chat context
}

export interface PluginResult {
  result: any;
  error?: string;
}

export interface Plugin {
  name: string;
  description: string;
  handle: (
    context: Context,
    callbacks?: PluginCallbacks,
  ) => Promise<PluginResult | null>;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface PluginCallbacks {
  log: (prefix: string, data?: any) => void;
  onResult: (delta: string) => void;
}
