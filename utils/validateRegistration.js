const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistration(payload) {
  const errors = [];

  const fullName = String(payload.fullName || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const phone = String(payload.phone || "").trim();
  const organisation = String(payload.organisation || "").trim();
  const role = String(payload.role || "").trim();

  if (!fullName) errors.push("Full name is required.");
  if (!email) errors.push("Email is required.");
  if (email && !emailRegex.test(email)) errors.push("Email is invalid.");
  if (!phone) errors.push("Phone number is required.");
  if (!organisation) errors.push("Organisation is required.");
  if (!role) errors.push("Role is required.");

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      fullName,
      email,
      phone,
      organisation,
      role
    }
  };
}