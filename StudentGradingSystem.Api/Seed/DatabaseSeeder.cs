using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Users.AnyAsync())
        {
            return;
        }

        var admin = new ApplicationUser
        {
            Username = "admin",
           PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin"
        };

        var student = new ApplicationUser
    {
        Username = "student",
        PasswordHash = BCrypt.Net.BCrypt.HashPassword("student123"),
        Role = "Student"
    };


        context.Users.Add(admin);
        context.Users.Add(student);

        

        await context.SaveChangesAsync();
    }
}