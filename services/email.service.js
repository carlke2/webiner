import dotenv from "dotenv";
import { Resend } from "resend";
import { buildIcs } from "../utils/buildIcs.js";

dotenv.config();

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing. Check your .env file.");
  }

  return new Resend(apiKey);
}

function buildConfirmationEmailHtml(registration) {
  const webinarTitle =
    process.env.WEBINAR_TITLE || "AI Networking with Aruba — The Future of Campus Access";

  const webinarDate =
    process.env.WEBINAR_DATE || "Thursday, 26 March 2026";

  const webinarTime =
    process.env.WEBINAR_TIME || "10:00 AM (GMT+3)";

  const webinarTeamsUrl =
    process.env.WEBINAR_TEAMS_URL || "";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6fb;padding:40px 20px;">
    
    <div style="max-width:560px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;border:1px solid #e5e7eb;">
      
      <h2 style="margin-top:0;color:#111827;">
        Thank you for registering
      </h2>

      <p style="font-size:15px;color:#374151;">
        Hello <strong>${registration.fullName}</strong>, your seat has been successfully reserved.
      </p>

      <div style="margin:24px 0;padding:18px;border-radius:10px;background:#f9fafb;border:1px solid #e5e7eb;">
        
        <p style="margin:0 0 6px;font-weight:600;">${webinarTitle}</p>

        <p style="margin:0;color:#6b7280;">
          ${webinarDate}<br/>
          ${webinarTime}<br/>
          Microsoft Teams Webinar
        </p>

      </div>

      <a
        href="${webinarTeamsUrl}"
        style="display:inline-block;margin-top:10px;background:#c60f2b;color:white;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;"
      >
        Join Webinar
      </a>

      <p style="margin-top:20px;font-size:13px;color:#6b7280;">
        A calendar invite is attached to this email so you can add the event to your calendar.
      </p>

      <p style="margin-top:25px;font-size:14px;color:#374151;">
        Best regards,<br/>
        <strong>Millennium Team</strong>
      </p>

    </div>

  </div>
  `;
}

export async function sendConfirmationEmail(registration) {
  const resend = getResendClient();

  const webinarTitle =
    process.env.WEBINAR_TITLE || "AI Networking with Aruba — The Future of Campus Access";

  const webinarTeamsUrl =
    process.env.WEBINAR_TEAMS_URL || "";

  const webinarStartLocal =
    process.env.WEBINAR_START_LOCAL || "2026-03-26T10:00:00";

  const webinarDurationMinutes =
    Number(process.env.WEBINAR_DURATION_MINUTES || 90);

  const icsContent = buildIcs({
    title: webinarTitle,
    description: `Join the webinar using this link: ${webinarTeamsUrl}`,
    location: `Microsoft Teams: ${webinarTeamsUrl}`,
    url: webinarTeamsUrl,
    startLocal: webinarStartLocal,
    durationMinutes: webinarDurationMinutes,
  });

  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: registration.email,
    subject: `Your Webinar Registration — ${webinarTitle}`,
    html: buildConfirmationEmailHtml(registration),
    attachments: [
      {
        filename: "webinar-invite.ics",
        content: Buffer.from(icsContent).toString("base64"),
      },
    ],
  });
}

export async function sendInternalNotification(registration) {
  if (!process.env.INTERNAL_NOTIFY_EMAIL) return null;

  const resend = getResendClient();

  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: process.env.INTERNAL_NOTIFY_EMAIL,
    subject: "New Webinar Registration",
    html: `
      <p><strong>Name:</strong> ${registration.fullName}</p>
      <p><strong>Email:</strong> ${registration.email}</p>
      <p><strong>Phone:</strong> ${registration.phone}</p>
      <p><strong>Organisation:</strong> ${registration.organisation}</p>
      <p><strong>Role:</strong> ${registration.role}</p>
    `,
  });
}