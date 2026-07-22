using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAssignmentSubmissionRepository
{
    Task AddSubmissionAsync(AssignmentSubmission submission);

    Task<List<AssignmentSubmissionDto>> GetByAssignmentAsync(
        int assignmentId);

    Task<AssignmentSubmission?> GetByIdAsync(int submissionId);

    Task SaveChangesAsync();
}
