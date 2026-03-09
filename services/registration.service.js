import Registration from "../models/registration.model.js";
import {
  sendConfirmationEmail,
  sendInternalNotification,
} from "./email.service.js";

export async function createRegistration(payload) {
  const existing = await Registration.findOne({
    email: payload.email.trim().toLowerCase(),
  });

  if (existing) {
    const error = new Error("This email is already registered for the webinar.");
    error.statusCode = 409;
    throw error;
  }

  const registration = await Registration.create({
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    organisation: payload.organisation.trim(),
    role: payload.role.trim(),
  });

  await sendConfirmationEmail(registration);
  await sendInternalNotification(registration);

  return registration;
}