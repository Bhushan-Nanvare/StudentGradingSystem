using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class SubjectRepository : ISubjectRepository
{
    private readonly AppDbContext _context;

    public SubjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public List<Subject> GetSubjects()
    {
        return _context.Subjects
            .Where(subject => !subject.IsDeleted)
            .ToList();
    }

    public async Task<Subject?> GetSubjectById(int id)
    {
        return await _context.Subjects
            .FirstOrDefaultAsync(subject =>
                subject.Id == id &&
                !subject.IsDeleted);
    }

    public async Task AddSubject(Subject subject)
    {
        _context.Subjects.Add(subject);
        subject.CreatedAt = DateTime.UtcNow;
        subject.CreatedBy = "System";

        await _context.SaveChangesAsync();
    }

    public async Task<Subject?> UpdateSubject(int id, Subject updatedSubject)
    {
        var subject = await _context.Subjects.FindAsync(id);

        if (subject == null || subject.IsDeleted)
        {
            return null;
        }

        subject.SubjectCode = updatedSubject.SubjectCode;
        subject.Name = updatedSubject.Name;
        subject.Credits = updatedSubject.Credits;
        subject.Semester = updatedSubject.Semester;
        subject.UpdatedAt = DateTime.UtcNow;
        subject.UpdatedBy = "System";

        await _context.SaveChangesAsync();

        return subject;
    }

    public async Task<bool> DeleteSubject(int id)
    {
        var subject = await _context.Subjects.FindAsync(id);

        if (subject == null || subject.IsDeleted)
        {
            return false;
        }

        subject.IsDeleted = true;
        subject.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<Subject?> GetBySubjectCode(string subjectCode)
    {
        return await _context.Subjects
            .FirstOrDefaultAsync(subject =>
                subject.SubjectCode == subjectCode &&
                !subject.IsDeleted);
    }
}