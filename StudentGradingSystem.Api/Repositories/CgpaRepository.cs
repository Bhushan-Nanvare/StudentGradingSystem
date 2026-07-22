using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Cgpa;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Repositories;

public class CgpaRepository : ICgpaRepository
{
    private readonly AppDbContext _context;

    public CgpaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StudentCgpaSummaryDto?> GetStudentCgpaSummaryAsync(int studentId)
    {
        var student = await _context.Students
            .Include(s => s.Department)
            .FirstOrDefaultAsync(s => s.Id == studentId && !s.IsDeleted);

        if (student == null)
            return null;

        var studentSubjects = await _context.StudentSubjects
            .Include(ss => ss.Subject)
            .Where(ss => ss.StudentId == studentId && !ss.Subject.IsDeleted)
            .ToListAsync();

        var marks = await _context.Marks
            .Where(m => m.StudentId == studentId)
            .ToListAsync();

        var subjectGrades = new List<SubjectGradeDto>();

        foreach (var ss in studentSubjects)
        {
            var subj = ss.Subject;
            var subjectMarks = marks.Where(m => m.SubjectId == subj.Id).ToList();

            decimal totalObtained = subjectMarks.Sum(m => m.MarksObtained);
            decimal totalMax = subjectMarks.Sum(m => m.MaxMarks);

            double percentage = totalMax > 0 ? (double)(totalObtained * 100m / totalMax) : 0;

            var (letterGrade, gradePoint) = CalculateGrade(percentage);

            subjectGrades.Add(new SubjectGradeDto
            {
                SubjectId = subj.Id,
                SubjectCode = subj.SubjectCode,
                SubjectName = subj.Name,
                Credits = subj.Credits,
                Semester = subj.Semester,
                TotalMarksObtained = totalObtained,
                TotalMaxMarks = totalMax,
                Percentage = Math.Round(percentage, 2),
                LetterGrade = letterGrade,
                GradePoint = gradePoint
            });
        }

        var semesterGroups = subjectGrades.GroupBy(s => s.Semester).OrderBy(g => g.Key);
        var semesterGpas = new List<SemesterGpaDto>();

        double totalWeightedGradePoints = 0;
        decimal totalCredits = 0;

        foreach (var group in semesterGroups)
        {
            decimal semCredits = group.Sum(s => s.Credits);
            double semWeightedPoints = group.Sum(s => s.GradePoint * (double)s.Credits);
            double semGpa = semCredits > 0 ? semWeightedPoints / (double)semCredits : 0;

            totalCredits += semCredits;
            totalWeightedGradePoints += semWeightedPoints;

            semesterGpas.Add(new SemesterGpaDto
            {
                Semester = group.Key,
                GPA = Math.Round(semGpa, 2),
                TotalCredits = semCredits,
                SubjectGrades = group.ToList()
            });
        }

        double overallCgpa = totalCredits > 0 ? totalWeightedGradePoints / (double)totalCredits : 0;

        return new StudentCgpaSummaryDto
        {
            StudentId = student.Id,
            StudentName = student.Name,
            RollNumber = student.RollNumber,
            DepartmentName = student.Department?.Name ?? string.Empty,
            OverallCGPA = Math.Round(overallCgpa, 2),
            TotalEarnedCredits = totalCredits,
            SemesterGPAs = semesterGpas
        };
    }

    public async Task UpdateStudentCgpaInDatabaseAsync(int studentId, double cgpa)
    {
        var student = await _context.Students.FindAsync(studentId);
        if (student != null)
        {
            student.CGPA = cgpa;
            student.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static (string LetterGrade, double GradePoint) CalculateGrade(double percentage)
    {
        if (percentage >= 90) return ("O", 10.0);
        if (percentage >= 80) return ("A+", 9.0);
        if (percentage >= 70) return ("A", 8.0);
        if (percentage >= 60) return ("B+", 7.0);
        if (percentage >= 50) return ("B", 6.0);
        if (percentage >= 40) return ("C", 5.0);
        return ("F", 0.0);
    }
}
