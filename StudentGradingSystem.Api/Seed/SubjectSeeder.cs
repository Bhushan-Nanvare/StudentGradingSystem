using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class SubjectSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var departments = await context.Departments.ToListAsync();
        var faculties = await context.Faculties.ToListAsync();

        if (departments.Count == 0 || faculties.Count == 0)
        {
            return;
        }

        var subjectsToAdd = new List<Subject>();
        var seedData = new[]
        {
            new Subject
            {
                SubjectCode = "CS101",
                Name = "Data Structures",
                Credits = 4m,
                Semester = 1,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder",
                DepartmentId = departments.First(d => d.Name == "Computer Science").Id,
                FacultyId = faculties.First(f => f.EmployeeCode == "FAC-1001").Id
            },
            new Subject
            {
                SubjectCode = "IT201",
                Name = "Database Management Systems",
                Credits = 3.5m,
                Semester = 3,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder",
                DepartmentId = departments.First(d => d.Name == "Information Technology").Id,
                FacultyId = faculties.First(f => f.EmployeeCode == "FAC-1002").Id
            },
            new Subject
            {
                SubjectCode = "ME301",
                Name = "Thermodynamics",
                Credits = 4m,
                Semester = 4,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder",
                DepartmentId = departments.First(d => d.Name == "Mechanical Engineering").Id,
                FacultyId = faculties.First(f => f.EmployeeCode == "FAC-1003").Id
            },
            new Subject
            {
                SubjectCode = "CE401",
                Name = "Structural Analysis",
                Credits = 3m,
                Semester = 5,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder",
                DepartmentId = departments.First(d => d.Name == "Civil Engineering").Id,
                FacultyId = faculties.First(f => f.EmployeeCode == "FAC-1004").Id
            },
            new Subject
            {
                SubjectCode = "EE501",
                Name = "Power Systems",
                Credits = 3.5m,
                Semester = 6,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder",
                DepartmentId = departments.First(d => d.Name == "Electrical Engineering").Id,
                FacultyId = faculties.First(f => f.EmployeeCode == "FAC-1005").Id
            }
        };

        foreach (var subject in seedData)
        {
            var exists = await context.Subjects.AnyAsync(s => s.SubjectCode == subject.SubjectCode);
            if (!exists)
            {
                subjectsToAdd.Add(subject);
            }
        }

        if (subjectsToAdd.Count > 0)
        {
            context.Subjects.AddRange(subjectsToAdd);
            await context.SaveChangesAsync();
        }
    }
}
