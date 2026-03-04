import {
  Context,
  Plugin,
  PluginHooks,
  PluginResult,
} from "../types/plugin.types";

const plugin: Plugin = {
  name: "set_alarm_intent",
  description:
    "Triggers an Android Intent to set an alarm at the provided time.",
  examplePattern:
    "^set alarm for (?<time>\\d{1,2}:\\d{2})(?: with message (?<message>.+))?",
  handle: async function (
    context: Context,
    hooks: PluginHooks,
  ): Promise<PluginResult> {
    const { time, message } = context.params;
    if (!time) {
      return { result: null, error: "Time is required" };
    }

    // Try sending a reminder intent (Wear OS)
    if (hooks.intent) {
      const reminderIntent = {
        action: "com.google.android.clockwork.reminders.CREATE_REMINDER",
        extras: {
          reminder_time: time,
          ...(message ? { reminder_message: message } : {}),
        },
      };
      await hooks.intent(reminderIntent.action, {
        extras: reminderIntent.extras,
      });
      await hooks.log(`Reminder intent sent for ${time}`);
    }
    return {
      result: `Notification and reminder intent sent for ${time}${message ? ` with message: ${message}` : ""}`,
    };
  },
};

export = plugin;
