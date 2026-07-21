using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Services.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class AssignmentSubmissionService : IAssignmentSubmissionService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public AssignmentSubmissionService(
        AppDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
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

        _context.AssignmentSubmissions.Add(submission);

        await _context.SaveChangesAsync();
    }

    public async Task<List<AssignmentSubmissionDto>> GetByAssignmentAsync(int assignmentId)
    {
        return await _context.AssignmentSubmissions
            .Include(x => x.Student)
            .Where(x => x.AssignmentId == assignmentId)
            .Select(x => new AssignmentSubmissionDto
            {
                Id = x.Id,
                AssignmentId = x.AssignmentId,
                StudentId = x.StudentId,
                StudentName = x.Student.Name,
                FilePath = x.FilePath,
                SubmittedAt = x.SubmittedAt,
                Marks = x.Marks,
                Remarks = x.Remarks,
                Status = x.Status
            })
            .ToListAsync();
    }

    public async Task UpdateMarksAsync(
        int submissionId,
        UpdateSubmissionMarksDto dto)
    {
        var submission = await _context.AssignmentSubmissions
            .FirstOrDefaultAsync(x => x.Id == submissionId);

        if (submission == null)
            throw new Exception("Submission not found.");

        submission.Marks = dto.Marks;
        submission.Remarks = dto.Remarks;
        submission.Status = "Reviewed";

        await _context.SaveChangesAsync();
    }
}