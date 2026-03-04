import net from 'net';
import { Context, Plugin, PluginHooks } from '../types/plugin.types';

/**
 * Encode a variable-length integer (MQTT remaining-length encoding).
 */
const encodeVarInt = (n: number): Buffer => {
  const bytes: number[] = [];
  do {
    let byte = n & 0x7f;
    n >>= 7;
    if (n > 0) byte |= 0x80;
    bytes.push(byte);
  } while (n > 0);
  return Buffer.from(bytes);
};

/**
 * Encode a UTF-8 string as MQTT "two-byte length prefix + UTF-8 bytes".
 */
const encodeString = (s: string): Buffer => {
  const b = Buffer.from(s, 'utf8');
  const len = Buffer.alloc(2);
  len.writeUInt16BE(b.length);
  return Buffer.concat([len, b]);
};

/**
 * Build a minimal MQTT 3.1.1 CONNECT packet.
 */
const buildConnect = (clientId: string, username?: string, password?: string): Buffer => {
  const protocol   = encodeString('MQTT');
  const level      = Buffer.from([0x04]);         // MQTT 3.1.1
  let flags        = 0x02;                        // Clean session
  if (username) flags |= 0x80;
  if (password) flags |= 0x40;
  const flagsBuf   = Buffer.from([flags]);
  const keepAlive  = Buffer.from([0x00, 0x3c]);   // 60 s
  let payload      = encodeString(clientId);
  if (username) payload = Buffer.concat([payload, encodeString(username)]);
  if (password) payload = Buffer.concat([payload, encodeString(password)]);
  const variableHeader = Buffer.concat([protocol, level, flagsBuf, keepAlive]);
  const remainingLength = encodeVarInt(variableHeader.length + payload.length);
  return Buffer.concat([
    Buffer.from([0x10]), // CONNECT packet type
    remainingLength,
    variableHeader,
    payload
  ]);
};

// ...existing code for publish and plugin implementation...
