using StudentGradingSystem.Api.DTOs.Cgpa;

namespace StudentGradingSystem.Api.Interfaces;

public interface ICgpaService
{
    Task<StudentCgpaSummaryDto?> GetStudentCgpa(int studentId);

    Task<StudentCgpaSummaryDto?> RecalculateAndSaveStudentCgpa(int studentId);
}
