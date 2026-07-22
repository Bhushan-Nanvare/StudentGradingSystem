using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Services.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AssignmentSubmissionService : IAssignmentSubmissionService
{
    private readonly IAssignmentSubmissionRepository _repository;
    private readonly IWebHostEnvironment _environment;

    public AssignmentSubmissionService(
        IAssignmentSubmissionRepository repository,
        IWebHostEnvironment environment)
    {
        _repository = repository;
        _environment = environment;
    }

    public async Task SubmitAsync(CreateAssignmentSubmissionDto dto)
    {
        var uploadsFolder = Path.Combine(
            _environment.WebRootPath,
            "uploads");

        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName =
            $"{Guid.NewGuid()}{Path.GetExtension(dto.File.FileName)}";

        var filePath = Path.Combine(uploadsFolder, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);

        await dto.File.CopyToAsync(stream);

        var submission = new AssignmentSubmission
        {
            AssignmentId = dto.AssignmentId,
            StudentId = dto.StudentId,
            FilePath = "/uploads/" + fileName
        };

        await _repository.AddSubmissionAsync(submission);
    }

    public async Task<List<AssignmentSubmissionDto>> GetByAssignmentAsync(
        int assignmentId)
    {
        return await _repository.GetByAssignmentAsync(assignmentId);
    }

    public async Task UpdateMarksAsync(
        int submissionId,
        UpdateSubmissionMarksDto dto)
    {
        var submission = await _repository.GetByIdAsync(submissionId);

        if (submission == null)
            throw new Exception("Submission not found.");

        submission.Marks = dto.Marks;
        submission.Remarks = dto.Remarks;
        submission.Status = "Reviewed";

        await _repository.SaveChangesAsync();
    }
}