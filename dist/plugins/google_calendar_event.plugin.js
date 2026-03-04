"use strict";
const plugin = {
    name: "google_calendar_event",
    description: "Erstellt einen neuen Termin in Google Kalender zu einem bestimmten Datum und einer bestimmten Uhrzeit.",
    examplePattern: "^Erstelle einen Termin (?<title>.+) am (?<date>\\d{4}-\\d{2}-\\d{2}) um (?<time>\\d{1,2}:\\d{2})$",
    handle: async function (context, hooks) {
        const { title, date, time } = context.params;
        // Convert DD.MM to YYYY-MM-DD if needed
        let formattedDate = date;
        const ddmmMatch = /^([0-9]{1,2})\\.([0-9]{1,2})$/.exec(date);
        if (ddmmMatch) {
            const year = new Date().getFullYear();
            const month = ddmmMatch[2].padStart(2, "0");
            const day = ddmmMatch[1].padStart(2, "0");
            formattedDate = `${year}-${month}-${day}`;
        }
        // Compose intent for Google Calendar event creation
        await hooks.intent("android.intent.action.INSERT", {
            packageName: "com.google.android.calendar",
            data: "content://com.android.calendar/events",
            extras: {
                title: title,
                beginTime: `${formattedDate}T${time}`,
            },
        });
        await hooks.log(`Calendar event intent sent: ${title} on ${formattedDate} at ${time}`);
        return {
            result: `Event '${title}' created for ${formattedDate} at ${time}.`,
        };
    },
};
module.exports = plugin;
//# sourceMappingURL=google_calendar_event.plugin.js.map