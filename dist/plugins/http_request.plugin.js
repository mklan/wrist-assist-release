"use strict";
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
const plugin = {
    name: "http_request",
    description: "Forward to HTTP endpoint or echo (no endpoint configured)",
    handle: async function (context) {
        const ep = context.options;
        if (!ep || !ep.url) {
            // No endpoint – echo back so the watch UI receives a response.
            return { result: context.text };
        }
        const method = (ep.method || "POST").toUpperCase();
        const headers = {
            "Content-Type": "application/json",
            ...(ep.headers || {}),
        };
        let url = ep.url;
        let body = null;
        if (method === "GET") {
            const hasQuery = url.indexOf("?") !== -1;
            url += `${hasQuery ? "&" : "?"}text=${encodeURIComponent(context.text)}`;
        }
        else {
            const bodyObj = ep.body
                ? ep.body
                : { text: context.text, timestamp: Date.now() };
            body = JSON.stringify(bodyObj);
        }
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
            });
            const responseType = (ep.responseType || "text").toLowerCase();
            let result;
            if (responseType === "json") {
                result = await response.json();
            }
            else {
                result = await response.text();
            }
            if (!response.ok) {
                return {
                    result,
                    error: `HTTP ${response.status}: ${response.statusText}`,
                };
            }
            return { result };
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            return { result: null, error: `Request failed: ${errorMsg}` };
        }
    },
};
module.exports = plugin;
//# sourceMappingURL=http_request.plugin.js.map