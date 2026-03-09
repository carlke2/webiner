import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: required("MONGODB_URI"),
  RESEND_API_KEY: required("RESEND_API_KEY"),
  FROM_EMAIL: required("FROM_EMAIL"),
  WEBINAR_TITLE: required("WEBINAR_TITLE"),
  WEBINAR_DATE: required("WEBINAR_DATE"),
  WEBINAR_TIME: required("WEBINAR_TIME"),
  WEBINAR_TEAMS_URL: required("WEBINAR_TEAMS_URL"),
};