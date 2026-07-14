import { z } from "zod";

export const subjectSchema = z.object({
  subjectCode: z.string().min(1, "Subject Code is required"),

  name: z.string().min(2, "Subject Name is required"),

  credits: z.number().min(1),

  semester: z.number().min(1).max(8),

  departmentId: z.number().min(1),

  facultyId: z.number().min(1),
});

export type SubjectFormData =
  z.infer<typeof subjectSchema>;