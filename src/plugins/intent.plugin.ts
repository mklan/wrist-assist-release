import http from 'http';
import { Context, Plugin, PluginHooks } from '../types/plugin.types';

const intentPlugin: Plugin = {
  name: 'intent',
  description: 'Fire an Android Intent from JS via native callback server',

  handle: async function(context: Context, hooks?: PluginHooks) {
    const p = context.params || {};
    const action = p.action || 'android.intent.action.VIEW';
    const nativePort = parseInt(process.env.NATIVE_PORT || '3001', 10);

    const payload = JSON.stringify({
      action:      action,
      packageName: p.packageName || null,
      className:   p.className   || null,
      extras:      p.extras      || {}
    });

    return new Promise((resolve, reject) => {
      const opts = {
        hostname: '127.0.0.1',
        port:     nativePort,
        path:     '/intent',
        method:   'POST',
        headers:  {
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = http.request(opts, (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c) => { chunks.push(c); });
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ result: 'Intent sent: ' + action });
          } else {
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

export default intentPlugin;
