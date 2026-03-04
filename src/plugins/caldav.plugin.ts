import https from "https";
import http from "http";
import url from "url";
import { Context, Plugin, PluginHooks } from "../types/plugin.types";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function nowStamp(): string {
  const d = new Date();
  const dt =
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z";
  return dt;
}

function uid(): string {
  return (
    Date.now() + "-" + Math.random().toString(36).slice(2) + "@wrist-assist"
  );
}

function buildVTODO(summary: string): string {
  const stamp = nowStamp();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WristAssist//NodePlugin//EN",
    "BEGIN:VTODO",
    "UID:" + uid(),
    "DTSTAMP:" + stamp,
    "CREATED:" + stamp,
    "SUMMARY:" + summary,
    "STATUS:NEEDS-ACTION",
    "END:VTODO",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildVEVENT(summary: string): string {
  const stamp = nowStamp();
  // 1-hour event starting now
  const d = new Date();
  const start = stamp;
  d.setHours(d.getHours() + 1);
  const end =
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WristAssist//NodePlugin//EN",
    "BEGIN:VEVENT",
    // ...existing code for event fields...
  ].join("\r\n");
}

// ...existing code for plugin implementation...
