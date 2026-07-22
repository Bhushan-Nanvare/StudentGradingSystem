using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class AssignmentRepository : IAssignmentRepository
{
    private readonly AppDbContext _context;

    public AssignmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAssignmentAsync(Assignment assignment)
    {
        _context.Assignments.Add(assignment);
        await _context.SaveChangesAsync();
    }

    public async Task<List<AssignmentResponseDto>> GetAssignmentsBySubjectAsync(
        int subjectId)
    {
        return await _context.Assignments
            .Where(a => a.SubjectId == subjectId)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AssignmentResponseDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                DueDate = a.DueDate,
                MaxMarks = a.MaxMarks,
                SubjectName = a.Subject.Name,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<Assignment?> GetAssignmentByIdAndFacultyAsync(
        int id, int facultyId)
    {
        return await _context.Assignments
            .FirstOrDefaultAsync(a =>
                a.Id == id &&
                a.FacultyId == facultyId);
    }

    public async Task RemoveAssignmentAsync(Assignment assignment)
    {
        _context.Assignments.Remove(assignment);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> AnyAssignmentsBySubjectAsync(int subjectId)
    {
        return await _context.Assignments
            .Where(a => a.SubjectId == subjectId)
            .AnyAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
