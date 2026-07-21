import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(100, "Age cannot exceed 100"),

  rollNumber: z
    .string()
    .min(1, "Roll Number is required"),

  email: z
    .string()
    .email("Invalid email address"),

  departmentId: z
    .number()
    .min(1, "Please select a department"),

  cgpa: z
    .number()
    .min(0, "CGPA cannot be negative")
    .max(10, "CGPA cannot exceed 10"),

  facultyId: z.number().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;