using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class StudentSubjectSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.StudentSubjects.AnyAsync())
            return;

        var students = await context.Students.ToListAsync();
        var subjects = await context.Subjects.ToListAsync();

        var enrollments = new List<StudentSubject>();

        foreach (var subject in subjects)
        {
            var departmentStudents = students
                .Where(s => s.DepartmentId == subject.DepartmentId);

            foreach (var student in departmentStudents)
            {
                enrollments.Add(new StudentSubject
                {
                    StudentId = student.Id,
                    SubjectId = subject.Id
                });
            }
        }

        context.StudentSubjects.AddRange(enrollments);

        await context.SaveChangesAsync();
    }
}