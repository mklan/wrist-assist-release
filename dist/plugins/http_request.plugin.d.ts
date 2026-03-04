/**
 * Default plugin – forwards the request to any HTTP endpoint configured in
 * the "context.endpoint" field, mirroring the behaviour of the native
 * ApiClient so that a power-user can intercept and modify requests in JS.
 *
 * Context shape expected by this plugin:
 *   text              – the user's input text
 *   context.endpoint  – { url, method?, headers?, body? }
 *
 * If no endpoint is provided the plugin echoes the input back (useful for
 * local testing).
 */
import { Plugin } from "../types/plugin.types";
declare const plugin: Plugin;
export = plugin;
//# sourceMappingURL=http_request.plugin.d.ts.map