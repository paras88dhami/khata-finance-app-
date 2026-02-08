import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // email
        /^[0-9]{7,15}$/.test(value),               // phone
      {
        message: "Enter a valid email or phone number",
      }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
