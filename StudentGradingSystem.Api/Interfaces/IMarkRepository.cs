using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IMarkRepository
{
    Task<Mark?> GetExistingMarkAsync(
        int studentId, int subjectId, string assessmentType);

    Task AddMarkAsync(Mark mark);

    Task<List<MarkResponseDto>> GetMarksBySubjectAsync(
        int subjectId, string assessmentType);

    Task SaveChangesAsync();
}
