using StudentGradingSystem.Api.DTOs.Cgpa;

namespace StudentGradingSystem.Api.Interfaces;

public interface ICgpaRepository
{
    Task<StudentCgpaSummaryDto?> GetStudentCgpaSummaryAsync(int studentId);

    Task UpdateStudentCgpaInDatabaseAsync(int studentId, double cgpa);
}
