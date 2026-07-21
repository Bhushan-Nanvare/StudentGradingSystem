import axios from "@/lib/axios";
import type { AssignmentSubmission } from "@/types/assignmentSubmission";

export const getSubmissions = async (
  assignmentId: number
): Promise<AssignmentSubmission[]> => {
  const { data } = await axios.get(
    `/AssignmentSubmissions/${assignmentId}`
  );

  return data;
};

export const submitAssignment = async (
  formData: FormData
) => {
  const { data } = await axios.post(
    "/AssignmentSubmissions",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateSubmissionMarks = async (
  submissionId: number,
  payload: {
    marks: number;
    remarks: string;
  }
) => {
  const { data } = await axios.put(
    `/AssignmentSubmissions/${submissionId}`,
    payload
  );

  return data;
};