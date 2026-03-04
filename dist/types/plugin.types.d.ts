/**
 * Shared plugin interfaces for Wrist Assist plugins
 */
export interface Context {
    options: Record<string, any>;
    params: Record<string, any>;
    text: string;
    messages?: Message[];
}
export interface PluginResult {
    result: any;
    error?: string;
}
export type PluginOptionType = "string" | "boolean" | "number";
export interface PluginOptionDescriptor {
    type: PluginOptionType;
    label: string;
    description?: string;
    default?: string | boolean | number;
    required?: boolean;
    enum?: Array<string | number | boolean>;
}
export type PluginOptionsSchema = Record<string, PluginOptionDescriptor>;
export interface Plugin {
    name: string;
    description: string;
    options?: PluginOptionsSchema;
    handle: (context: Context, hooks?: PluginHooks) => Promise<PluginResult | null>;
}
export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}
export interface PluginHooks {
    log: (...data: any) => Promise<void>;
    onResult?: (delta: string) => void;
}
//# sourceMappingURL=plugin.types.d.ts.map