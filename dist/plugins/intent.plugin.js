"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const intentPlugin = {
    name: 'intent',
    description: 'Fire an Android Intent from JS via native callback server',
    handle: async function (context, hooks) {
        const p = context.params || {};
        const action = p.action || 'android.intent.action.VIEW';
        const nativePort = parseInt(process.env.NATIVE_PORT || '3001', 10);
        const payload = JSON.stringify({
            action: action,
            packageName: p.packageName || null,
            className: p.className || null,
            extras: p.extras || {}
        });
        return new Promise((resolve, reject) => {
            const opts = {
                hostname: '127.0.0.1',
                port: nativePort,
                path: '/intent',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                }
            };
            const req = http_1.default.request(opts, (res) => {
                const chunks = [];
                res.on('data', (c) => { chunks.push(c); });
                res.on('end', () => {
                    const body = Buffer.concat(chunks).toString('utf8');
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ result: 'Intent sent: ' + action });
                    }
                    else {
                        reject(new Error('Native callback error: HTTP ' + res.statusCode + ' ' + body));
                    }
                });
            });
            req.on('error', reject);
            req.write(payload);
            req.end();
        });
    }
};
exports.default = intentPlugin;
//# sourceMappingURL=intent.plugin.js.map