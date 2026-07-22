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

    public DbSet<AssignmentSubmission> AssignmentSubmissions =>
        Set<AssignmentSubmission>();

    public DbSet<Mark> Marks { get; set; }

    public DbSet<Assignment> Assignments { get; set; }

    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Faculty>()
            .HasOne(f => f.ApplicationUser)
            .WithOne(u => u.Faculty)
            .HasForeignKey<Faculty>(f => f.ApplicationUserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Student>()
            .HasOne(s => s.ApplicationUser)
            .WithOne(u => u.Student)
            .HasForeignKey<Student>(s => s.ApplicationUserId)
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

        // Explicit relationship (recommended)
        modelBuilder.Entity<Subject>()
            .HasOne(s => s.Faculty)
            .WithMany(f => f.Subjects)
            .HasForeignKey(s => s.FacultyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Faculty → Department
        modelBuilder.Entity<Faculty>()
            .HasOne(f => f.Department)
            .WithMany(d => d.Faculties)
            .HasForeignKey(f => f.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Student → Department
        modelBuilder.Entity<Student>()
            .HasOne(s => s.Department)
            .WithMany(d => d.Students)
            .HasForeignKey(s => s.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Subject → Department
        modelBuilder.Entity<Subject>()
            .HasOne(s => s.Department)
            .WithMany(d => d.Subjects)
            .HasForeignKey(s => s.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Attendance → Student
        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Student)
            .WithMany()
            .HasForeignKey(a => a.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Attendance → Subject
        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Subject)
            .WithMany()
            .HasForeignKey(a => a.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Attendance → Faculty
        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Faculty)
            .WithMany()
            .HasForeignKey(a => a.FacultyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Mark → Student
        modelBuilder.Entity<Mark>()
            .HasOne(m => m.Student)
            .WithMany()
            .HasForeignKey(m => m.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Mark → Subject
        modelBuilder.Entity<Mark>()
            .HasOne(m => m.Subject)
            .WithMany()
            .HasForeignKey(m => m.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Mark → Faculty
        modelBuilder.Entity<Mark>()
            .HasOne(m => m.Faculty)
            .WithMany()
            .HasForeignKey(m => m.FacultyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Assignment → Subject
        modelBuilder.Entity<Assignment>()
            .HasOne(a => a.Subject)
            .WithMany()
            .HasForeignKey(a => a.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Assignment → Faculty
        modelBuilder.Entity<Assignment>()
            .HasOne(a => a.Faculty)
            .WithMany()
            .HasForeignKey(a => a.FacultyId)
            .OnDelete(DeleteBehavior.Restrict);

        // AssignmentSubmission → Assignment
        modelBuilder.Entity<AssignmentSubmission>()
            .HasOne(s => s.Assignment)
            .WithMany(a => a.Submissions)
            .HasForeignKey(s => s.AssignmentId)
            .OnDelete(DeleteBehavior.Cascade);

        // AssignmentSubmission → Student
        modelBuilder.Entity<AssignmentSubmission>()
            .HasOne(s => s.Student)
            .WithMany(st => st.AssignmentSubmissions)
            .HasForeignKey(s => s.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // RefreshToken → ApplicationUser
        modelBuilder.Entity<RefreshToken>()
            .HasOne(r => r.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}