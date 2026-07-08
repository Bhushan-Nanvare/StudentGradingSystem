using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class FacultySeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var departments = await context.Departments.ToListAsync();
        if (departments.Count == 0)
        {
            return;
        }

        var facultyMembers = new List<Faculty>();

        var seedData = new[]
        {
            new Faculty
            {
                EmployeeCode = "FAC-1001",
                FirstName = "Aarav",
                LastName = "Sharma",
                Email = "aarav.sharma@university.edu",
                Designation = "Professor",
                Salary = 95000m,
                JoiningDate = DateTime.SpecifyKind(new DateTime(2018, 6, 15), DateTimeKind.Utc),
                DepartmentId = departments.First(d => d.Name == "Computer Science").Id
            },
            new Faculty
            {
                EmployeeCode = "FAC-1002",
                FirstName = "Priya",
                LastName = "Nair",
                Email = "priya.nair@university.edu",
                Designation = "Associate Professor",
                Salary = 88000m,
                JoiningDate = DateTime.SpecifyKind(new DateTime(2019, 8, 21), DateTimeKind.Utc),
                DepartmentId = departments.First(d => d.Name == "Information Technology").Id
            },
            new Faculty
            {
                EmployeeCode = "FAC-1003",
                FirstName = "Rahul",
                LastName = "Mehta",
                Email = "rahul.mehta@university.edu",
                Designation = "Assistant Professor",
                Salary = 76000m,
                JoiningDate = DateTime.SpecifyKind(new DateTime(2020, 1, 10), DateTimeKind.Utc),
                DepartmentId = departments.First(d => d.Name == "Mechanical Engineering").Id
            },
            new Faculty
            {
                EmployeeCode = "FAC-1004",
                FirstName = "Sneha",
                LastName = "Patel",
                Email = "sneha.patel@university.edu",
                Designation = "Professor",
                Salary = 91000m,
                JoiningDate = DateTime.SpecifyKind(new DateTime(2017, 9, 3), DateTimeKind.Utc),
                DepartmentId = departments.First(d => d.Name == "Civil Engineering").Id
            },
            new Faculty
            {
                EmployeeCode = "FAC-1005",
                FirstName = "Vikram",
                LastName = "Singh",
                Email = "vikram.singh@university.edu",
                Designation = "Senior Lecturer",
                Salary = 71000m,
                JoiningDate = DateTime.SpecifyKind(new DateTime(2021, 4, 12), DateTimeKind.Utc),
                DepartmentId = departments.First(d => d.Name == "Electrical Engineering").Id
            }
        };

        foreach (var faculty in seedData)
        {
            var exists = await context.Faculties.AnyAsync(f => f.EmployeeCode == faculty.EmployeeCode);
            if (!exists)
            {
                facultyMembers.Add(faculty);
            }
        }

        if (facultyMembers.Count > 0)
        {
            context.Faculties.AddRange(facultyMembers);
            await context.SaveChangesAsync();
        }
    }
}
