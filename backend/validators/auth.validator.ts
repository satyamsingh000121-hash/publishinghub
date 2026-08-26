import { RegisterSchema, LoginSchema, UpdateProfileSchema } from "@/lib/validations";
import { ZodError } from "zod";

export class AuthValidator {
  static validateRegister(data: unknown) {
    return RegisterSchema.safeParse(data);
  }

  static validateLogin(data: unknown) {
    return LoginSchema.safeParse(data);
  }

  static validateUpdateProfile(data: unknown) {
    return UpdateProfileSchema.safeParse(data);
  }

  static formatErrors(error: ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};
    error.errors.forEach((err) => {
      const field = err.path.join(".");
      if (field) {
        formatted[field] = err.message;
      }
    });
    return formatted;
  }
}
