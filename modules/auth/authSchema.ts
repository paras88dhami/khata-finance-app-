import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  email: z
    .string()
    .email("Enter a valid email address"),
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(4, "Verification code must be 4 digits"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type OTPFormValues = z.infer<typeof otpSchema>;
    