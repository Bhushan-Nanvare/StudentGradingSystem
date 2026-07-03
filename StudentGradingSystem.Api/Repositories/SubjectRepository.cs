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
        return _context.Subjects.ToList();
    }

    public async Task<Subject?> GetSubjectById(int id)
    {
        return await _context.Subjects
            .FirstOrDefaultAsync(subject => subject.Id == id);
    }

    public async Task AddSubject(Subject subject)
    {
        _context.Subjects.Add(subject);

        await _context.SaveChangesAsync();
    }

    public async Task<Subject?> UpdateSubject(int id, UpdateSubjectDto dto)
    {
        var subject = await _context.Subjects.FindAsync(id);

        if (subject == null)
        {
            return null;
        }

        subject.SubjectCode = dto.SubjectCode;
        subject.Name = dto.Name;
        subject.Credits = dto.Credits;
        subject.Semester = dto.Semester;

        await _context.SaveChangesAsync();

        return subject;
    }

    public async Task<bool> DeleteSubject(int id)
    {
        var subject = await _context.Subjects.FindAsync(id);

        if (subject == null)
        {
            return false;
        }

        _context.Subjects.Remove(subject);

        await _context.SaveChangesAsync();

        return true;
    }
}