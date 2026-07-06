using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IDepartmentService
{
    Task<List<Department>> GetDepartments();

    Task<Department?> GetDepartmentById(int id);

    Task AddDepartment(Department department);

    Task<Department?> UpdateDepartment(int id, Department department);

    Task<bool> DeleteDepartment(int id);
}