using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.FacultyPortal;
using StudentGradingSystem.Api.DTOs.Subject;
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
            .Include(s => s.Department)
            .Include(s => s.Faculty)
            .Where(s => !s.IsDeleted)
            .ToList();
    }

    public async Task<Subject?> GetSubjectById(int id)
    {
        return await _context.Subjects
            .Include(s => s.Department)
            .Include(s => s.Faculty)
            .FirstOrDefaultAsync(s =>
                s.Id == id &&
                !s.IsDeleted);
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
        subject.DepartmentId = updatedSubject.DepartmentId;
        subject.FacultyId = updatedSubject.FacultyId;
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

    public async Task<List<Subject>> GetSubjectsByFacultyIdAsync(
        int facultyId)
    {
        return await _context.Subjects
            .Include(s => s.Department)
            .Where(s => s.FacultyId == facultyId)
            .ToListAsync();
    }

    public async Task<List<FacultyStudentDto>> GetStudentsBySubjectIdAsync(
        int subjectId)
    {
        var subject = await _context.Subjects
            .Include(s => s.Department)
            .FirstOrDefaultAsync(s => s.Id == subjectId);

        if (subject == null)
        {
            return new List<FacultyStudentDto>();
        }

        return await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => new FacultyStudentDto
            {
                Id = ss.Student.Id,
                Name = ss.Student.Name,
                CGPA = ss.Student.CGPA,
                DepartmentName = ss.Student.Department.Name
            })
            .ToListAsync();
    }

    public async Task<List<StudentEnrolledDto>> GetEnrolledStudentsAsync(
        int subjectId)
    {
        return await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => new StudentEnrolledDto
            {
                StudentId = ss.Student.Id,
                Name = ss.Student.Name,
                RollNumber = ss.Student.RollNumber,
                DepartmentName = ss.Student.Department.Name,
                CGPA = ss.Student.CGPA
            })
            .ToListAsync();
    }

    public async Task<List<StudentEnrolledDto>> GetAvailableStudentsAsync(
        int subjectId)
    {
        var enrolledIds = await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => ss.StudentId)
            .ToListAsync();

        return await _context.Students
            .Where(s => !s.IsDeleted && !enrolledIds.Contains(s.Id))
            .Select(s => new StudentEnrolledDto
            {
                StudentId = s.Id,
                Name = s.Name,
                RollNumber = s.RollNumber,
                DepartmentName = s.Department.Name,
                CGPA = s.CGPA
            })
            .ToListAsync();
    }

    public async Task EnrollStudentsAsync(int subjectId, List<int> studentIds)
    {
        var existingIds = await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId &&
                         studentIds.Contains(ss.StudentId))
            .Select(ss => ss.StudentId)
            .ToListAsync();

        var newEnrollments = studentIds
            .Where(id => !existingIds.Contains(id))
            .Select(id => new StudentSubject
            {
                SubjectId = subjectId,
                StudentId = id
            });

        _context.StudentSubjects.AddRange(newEnrollments);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UnenrollStudentAsync(int subjectId, int studentId)
    {
        var enrollment = await _context.StudentSubjects
            .FirstOrDefaultAsync(ss =>
                ss.SubjectId == subjectId &&
                ss.StudentId == studentId);

        if (enrollment == null)
            return false;

        _context.StudentSubjects.Remove(enrollment);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> AssignFacultyAsync(int subjectId, int facultyId)
    {
        var subject = await _context.Subjects
            .FirstOrDefaultAsync(s => s.Id == subjectId && !s.IsDeleted);

        if (subject == null)
            return false;

        subject.FacultyId = facultyId;
        subject.UpdatedAt = DateTime.UtcNow;
        subject.UpdatedBy = "System";

        await _context.SaveChangesAsync();

        return true;
    }
}