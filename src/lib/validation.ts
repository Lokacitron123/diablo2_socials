import { z } from "zod";

// Validation Account Registration

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(/^[a-zA-Z0-9_-]+$/), // Allows Uppercase and lowercase, numbers and underscore and hyphen, no other special characters
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignUpFormValues = SignUpValues & {
  repeatPassword: string;
};

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;
