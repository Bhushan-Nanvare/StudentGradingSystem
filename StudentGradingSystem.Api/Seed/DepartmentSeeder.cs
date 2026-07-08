using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class DepartmentSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var departmentsToAdd = new List<Department>();

        var seedData = new[]
        {
            new Department { DepartmentCode = "CSE", Name = "Computer Science" },
            new Department { DepartmentCode = "IT", Name = "Information Technology" },
            new Department { DepartmentCode = "ME", Name = "Mechanical Engineering" },
            new Department { DepartmentCode = "CE", Name = "Civil Engineering" },
            new Department { DepartmentCode = "EE", Name = "Electrical Engineering" }
        };

        foreach (var department in seedData)
        {
            var exists = await context.Departments.AnyAsync(d => d.DepartmentCode == department.DepartmentCode);
            if (!exists)
            {
                departmentsToAdd.Add(department);
            }
        }

        if (departmentsToAdd.Count > 0)
        {
            context.Departments.AddRange(departmentsToAdd);
            await context.SaveChangesAsync();
        }
    }
}