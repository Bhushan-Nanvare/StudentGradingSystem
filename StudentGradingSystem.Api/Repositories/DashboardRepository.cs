using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Dashboard;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly AppDbContext _context;

    public DashboardRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetDashboardStatistics()
    {
        return new DashboardStatsDto
        {
            StudentCount = await _context.Students.CountAsync(),

            FacultyCount = await _context.Faculties.CountAsync(),

            DepartmentCount = await _context.Departments.CountAsync(),

            SubjectCount = await _context.Subjects.CountAsync()
        };
    }
}