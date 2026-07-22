using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAssignmentRepository
{
    Task AddAssignmentAsync(Assignment assignment);

    Task<List<AssignmentResponseDto>> GetAssignmentsBySubjectAsync(
        int subjectId);

    Task<Assignment?> GetAssignmentByIdAndFacultyAsync(
        int id, int facultyId);

    Task RemoveAssignmentAsync(Assignment assignment);

    Task<bool> AnyAssignmentsBySubjectAsync(int subjectId);

    Task SaveChangesAsync();
}
