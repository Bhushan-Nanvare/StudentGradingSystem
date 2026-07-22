using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class AssignmentSubmissionRepository : IAssignmentSubmissionRepository
{
    private readonly AppDbContext _context;

    public AssignmentSubmissionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddSubmissionAsync(AssignmentSubmission submission)
    {
        _context.AssignmentSubmissions.Add(submission);
        await _context.SaveChangesAsync();
    }

    public async Task<List<AssignmentSubmissionDto>> GetByAssignmentAsync(
        int assignmentId)
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

    public async Task<AssignmentSubmission?> GetByIdAsync(int submissionId)
    {
        return await _context.AssignmentSubmissions
            .FirstOrDefaultAsync(x => x.Id == submissionId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
