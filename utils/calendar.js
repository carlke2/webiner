export function formatDateToICS(dateInput) {
  const date = new Date(dateInput);

  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");

  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

export function generateWebinarICS() {
  const title = "AI Networking with Aruba — The Future of Campus Access";
  const description =
    "Join Joseph Njogu, Pre-sales Manager — HPE operated by Selectium, for a live Microsoft Teams webinar.";
  const location = "Microsoft Teams Webinar";
  const teamsUrl = process.env.WEBINAR_TEAMS_URL;

  const start = "2026-03-26T10:00:00+03:00";
  const end = "2026-03-26T11:00:00+03:00";

  const uid = `webinar-${Date.now()}@millenium.co.ke`;
  const dtStamp = formatDateToICS(new Date());
  const dtStart = formatDateToICS(start);
  const dtEnd = formatDateToICS(end);

  const finalDescription = `${description}\\n\\nJoin Teams: ${teamsUrl}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Millenium Webinar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${finalDescription}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}