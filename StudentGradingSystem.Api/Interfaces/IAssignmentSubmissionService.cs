using StudentGradingSystem.Api.DTOs.AssignmentSubmission;

namespace StudentGradingSystem.Api.Services.Interfaces;

public interface IAssignmentSubmissionService
{
    Task SubmitAsync(CreateAssignmentSubmissionDto dto);

    Task<List<AssignmentSubmissionDto>> GetByAssignmentAsync(int assignmentId);

    Task UpdateMarksAsync(int submissionId, UpdateSubmissionMarksDto dto);
}