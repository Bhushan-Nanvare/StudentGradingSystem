using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class FacultyRepository : IFacultyRepository
{
    private readonly AppDbContext _context;

    public FacultyRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Faculty>> GetFaculties()
    {
        return await _context.Faculties
            .Include(f => f.Department)
            .ToListAsync();
    }

    public async Task<Faculty?> GetFacultyById(int id)
    {
        return await _context.Faculties
            .Include(f => f.Department)
            .FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task AddFaculty(Faculty faculty)
    {
        _context.Faculties.Add(faculty);

        await _context.SaveChangesAsync();
    }

    public async Task<Faculty?> UpdateFaculty(int id, Faculty updatedFaculty)
    {
        var faculty = await _context.Faculties.FindAsync(id);

        if (faculty == null)
        {
            return null;
        }

        faculty.EmployeeCode = updatedFaculty.EmployeeCode;
        faculty.FirstName = updatedFaculty.FirstName;
        faculty.LastName = updatedFaculty.LastName;
        faculty.Email = updatedFaculty.Email;
        faculty.Designation = updatedFaculty.Designation;
        faculty.Salary = updatedFaculty.Salary;
        faculty.JoiningDate = updatedFaculty.JoiningDate;
        faculty.DepartmentId = updatedFaculty.DepartmentId;

        await _context.SaveChangesAsync();

        return faculty;
    }

    public async Task<bool> DeleteFaculty(int id)
    {
        var faculty = await _context.Faculties.FindAsync(id);

        if (faculty == null)
        {
            return false;
        }

        _context.Faculties.Remove(faculty);

        await _context.SaveChangesAsync();

        return true;
    }
}