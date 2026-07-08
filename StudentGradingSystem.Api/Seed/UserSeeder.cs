using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class UserSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var usersToAdd = new List<ApplicationUser>();

        if (!await context.Users.AnyAsync(u => u.Username == "admin"))
        {
            usersToAdd.Add(new ApplicationUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin"
            });
        }

        if (!await context.Users.AnyAsync(u => u.Username == "student"))
        {
            usersToAdd.Add(new ApplicationUser
            {
                Username = "student",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("student123"),
                Role = "Student"
            });
        }

        if (usersToAdd.Count > 0)
        {
            context.Users.AddRange(usersToAdd);
            await context.SaveChangesAsync();
        }
    }
}
