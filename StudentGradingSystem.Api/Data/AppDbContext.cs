using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Faculty> Faculties { get; set; }

    public DbSet<Department> Departments { get; set; }

}
