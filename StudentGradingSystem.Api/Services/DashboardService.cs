using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.DTOs.Dashboard;
namespace StudentGradingSystem.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
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
            SubjectCount = await _context.Subjects.CountAsync(),
        };
    }
}