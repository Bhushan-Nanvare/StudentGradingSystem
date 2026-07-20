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
    public DbSet<Attendance> Attendances { get; set; }

    public DbSet<StudentSubject> StudentSubjects { get; set; }

    

    public DbSet<Mark> Marks { get; set; }

    public DbSet<Assignment> Assignments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Faculty>()
            .HasOne(f => f.ApplicationUser)
            .WithOne(u => u.Faculty)
            .HasForeignKey<Faculty>(f => f.ApplicationUserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<StudentSubject>()
            .HasKey(ss => new
            {
                ss.StudentId,
                ss.SubjectId
            });

        modelBuilder.Entity<StudentSubject>()
            .HasOne(ss => ss.Student)
            .WithMany(s => s.StudentSubjects)
            .HasForeignKey(ss => ss.StudentId);

        modelBuilder.Entity<StudentSubject>()
            .HasOne(ss => ss.Subject)
            .WithMany(s => s.StudentSubjects)
            .HasForeignKey(ss => ss.SubjectId);
    }

}
