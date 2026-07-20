using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Services.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class AssignmentService : IAssignmentService
{
    private readonly AppDbContext _context;

    public AssignmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateAssignment(
        int facultyUserId,
        CreateAssignmentDto dto)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f => f.ApplicationUserId == facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = new Assignment
        {
            Title = dto.Title,
            Description = dto.Description,
            SubjectId = dto.SubjectId,
            FacultyId = faculty.Id,
            DueDate = dto.DueDate,
            MaxMarks = dto.MaxMarks
        };

        _context.Assignments.Add(assignment);

        await _context.SaveChangesAsync();
    }

    public async Task<List<AssignmentResponseDto>> GetAssignments(
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

    public async Task UpdateAssignment(
        int id,
        int facultyUserId,
        UpdateAssignmentDto dto)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f => f.ApplicationUserId == facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(a =>
                a.Id == id &&
                a.FacultyId == faculty.Id);

        if (assignment == null)
            throw new Exception("Assignment not found.");

        assignment.Title = dto.Title;
        assignment.Description = dto.Description;
        assignment.DueDate = dto.DueDate;
        assignment.MaxMarks = dto.MaxMarks;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAssignment(
        int id,
        int facultyUserId)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f => f.ApplicationUserId == facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(a =>
                a.Id == id &&
                a.FacultyId == faculty.Id);

        if (assignment == null)
            throw new Exception("Assignment not found.");

        _context.Assignments.Remove(assignment);

        await _context.SaveChangesAsync();
    }
}