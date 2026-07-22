using StudentGradingSystem.Api.DTOs.Cgpa;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class CgpaService : ICgpaService
{
    private readonly ICgpaRepository _cgpaRepository;

    public CgpaService(ICgpaRepository cgpaRepository)
    {
        _cgpaRepository = cgpaRepository;
    }

    public async Task<StudentCgpaSummaryDto?> GetStudentCgpa(int studentId)
    {
        return await _cgpaRepository.GetStudentCgpaSummaryAsync(studentId);
    }

    public async Task<StudentCgpaSummaryDto?> RecalculateAndSaveStudentCgpa(int studentId)
    {
        var summary = await _cgpaRepository.GetStudentCgpaSummaryAsync(studentId);
        if (summary != null)
        {
            await _cgpaRepository.UpdateStudentCgpaInDatabaseAsync(studentId, summary.OverallCGPA);
        }
        return summary;
    }
}
