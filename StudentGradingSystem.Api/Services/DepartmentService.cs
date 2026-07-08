using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository _departmentRepository;

    public DepartmentService(IDepartmentRepository departmentRepository)
    {
        _departmentRepository = departmentRepository;
    }

    public async Task<List<Department>> GetDepartments()
    {
        return await _departmentRepository.GetDepartments();
    }

    public async Task<Department?> GetDepartmentById(int id)
    {
        return await _departmentRepository.GetDepartmentById(id);
    }

    public async Task AddDepartment(Department department)
    {
        await _departmentRepository.AddDepartment(department);
    }

    public async Task<Department?> UpdateDepartment(int id, Department department)
    {
        return await _departmentRepository.UpdateDepartment(id, department);
    }

    public async Task<bool> DeleteDepartment(int id)
    {
        return await _departmentRepository.DeleteDepartment(id);
    }
}
