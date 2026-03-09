import { createRegistration } from "../services/registration.service.js";

export async function register(req, res) {
  try {
    const registration = await createRegistration(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Confirmation email sent.",
      data: {
        id: registration._id,
        fullName: registration.fullName,
        email: registration.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
}