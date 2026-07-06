using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IFacultyService
{
    Task<List<Faculty>> GetFaculties();

    Task<Faculty?> GetFacultyById(int id);

    Task AddFaculty(Faculty faculty);

    Task<Faculty?> UpdateFaculty(int id, Faculty faculty);

    Task<bool> DeleteFaculty(int id);
}