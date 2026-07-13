import { z } from "zod";

export const facultySchema = z.object({
  employeeCode: z.string().min(1, "Employee Code is required"),
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  email: z.string().email("Invalid email"),
  designation: z.string().min(2, "Designation is required"),
  salary: z.number().min(0, "Salary must be positive"),
  joiningDate: z.string().min(1, "Joining Date is required"),
  departmentId: z.number().min(1, "Department is required"),
});

export type FacultyFormData = z.infer<typeof facultySchema>;