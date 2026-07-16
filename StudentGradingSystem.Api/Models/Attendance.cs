namespace StudentGradingSystem.Api.Models;

public class Attendance
{
    public int Id { get; set; }

    public int StudentId { get; set; }

    public Student Student { get; set; } = null!;

    public int SubjectId { get; set; }

    public Subject Subject { get; set; } = null!;

    public int FacultyId { get; set; }

    public Faculty Faculty { get; set; } = null!;

    public DateOnly Date { get; set; }

    public bool IsPresent { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}