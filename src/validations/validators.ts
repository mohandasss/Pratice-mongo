import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .length(10, "Phone must be exactly 10 digits")
    .regex(/^\d+$/, "Phone must contain only digits"),

  role: z
    .enum(["USER", "ADMIN"])
    .optional(),

  address: z.object({
    houseNo: z
      .string()
      .min(1, "House number is required"),

    landmark: z
      .string()
      .min(3, "Landmark must be at least 3 characters"),

    city: z
      .string()
      .min(3, "City must be at least 3 characters"),

    state: z
      .string()
      .min(3, "State must be at least 3 characters"),

    pincode: z
      .string()
      .length(6, "Pincode must be exactly 6 digits")
      .regex(/^\d+$/, "Pincode must contain only digits"),
  }).optional(),
  
});