using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class StudentSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var departments = await context.Departments.ToListAsync();
        if (departments.Count == 0)
        {
            return;
        }

        var studentsToAdd = new List<Student>();
        var seedData = new[]
        {
            new Student
            {
                Name = "Aditya Kumar",
                Age = 20,
                DepartmentId = departments.First(d => d.Name == "Computer Science").Id,
                CGPA = 8.7,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder"
            },
            new Student
            {
                Name = "Meera Joshi",
                Age = 21,
                DepartmentId = departments.First(d => d.Name == "Information Technology").Id,
                CGPA = 9.1,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder"
            },
            new Student
            {
                Name = "Karthik Rao",
                Age = 22,
                DepartmentId = departments.First(d => d.Name == "Mechanical Engineering").Id,
                CGPA = 7.9,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder"
            },
            new Student
            {
                Name = "Nisha Verma",
                Age = 19,
                DepartmentId = departments.First(d => d.Name == "Civil Engineering").Id,
                CGPA = 8.3,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder"
            },
            new Student
            {
                Name = "Rohan Das",
                Age = 23,
                DepartmentId = departments.First(d => d.Name == "Electrical Engineering").Id,
                CGPA = 8.9,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "Seeder"
            }
        };

        foreach (var student in seedData)
        {
            var exists = await context.Students.AnyAsync(s => s.Name == student.Name);
            if (!exists)
            {
                studentsToAdd.Add(student);
            }
        }

        if (studentsToAdd.Count > 0)
        {
            context.Students.AddRange(studentsToAdd);
            await context.SaveChangesAsync();
        }
    }
}
