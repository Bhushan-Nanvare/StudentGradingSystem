using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class FacultyService : IFacultyService
{
    private readonly IFacultyRepository _facultyRepository;

    public FacultyService(IFacultyRepository facultyRepository)
    {
        _facultyRepository = facultyRepository;
    }

    public async Task<List<Faculty>> GetFaculties()
    {
        return await _facultyRepository.GetFaculties();
    }

    public async Task<Faculty?> GetFacultyById(int id)
    {
        return await _facultyRepository.GetFacultyById(id);
    }

    public async Task AddFaculty(Faculty faculty)
    {
        await _facultyRepository.AddFaculty(faculty);
    }

    public async Task<Faculty?> UpdateFaculty(int id, Faculty faculty)
    {
        return await _facultyRepository.UpdateFaculty(id, faculty);
    }

    public async Task<bool> DeleteFaculty(int id)
    {
        return await _facultyRepository.DeleteFaculty(id);
    }
}