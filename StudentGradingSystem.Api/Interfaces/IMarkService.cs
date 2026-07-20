using StudentGradingSystem.Api.DTOs.Marks;

namespace StudentGradingSystem.Api.Interfaces;

public interface IMarkService
{
    Task SaveMarks(
        int facultyUserId,
        SaveMarksDto dto);

    Task<List<MarkResponseDto>> GetMarks(
        int subjectId,
        string assessmentType);
}