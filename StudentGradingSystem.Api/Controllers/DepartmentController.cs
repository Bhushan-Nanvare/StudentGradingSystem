using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/departments")]
[Authorize]
public class DepartmentController : ControllerBase
{
    private readonly IDepartmentService _departmentService;
    private readonly IMapper _mapper;

    public DepartmentController(
        IDepartmentService departmentService,
        IMapper mapper)
    {
        _departmentService = departmentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetDepartments()
    {
       var departments = await _departmentService.GetDepartments();

        var response =
            _mapper.Map<List<DepartmentResponseDto>>(departments);

        return Ok(new ApiResponse<List<DepartmentResponseDto>>
        {
            Success = true,
            Message = "Departments retrieved successfully.",
            Data = response
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDepartmentById(int id)
    {
        var departments = await _departmentService.GetDepartments();

        var response =
            _mapper.Map<List<DepartmentResponseDto>>(departments);

        return Ok(new ApiResponse<List<DepartmentResponseDto>>
        {
            Success = true,
            Message = "Departments retrieved successfully.",
            Data = response
        });

        return Ok(new ApiResponse<Department>
        {
            Success = true,
            Message = "Department retrieved successfully.",
            Data = department
        });
    }

    [HttpPost]
    public async Task<IActionResult> AddDepartment(CreateDepartmentDto dto)
    {
        var department = _mapper.Map<Department>(dto);

        await _departmentService.AddDepartment(department);

        return CreatedAtAction(
            nameof(GetDepartmentById),
            new { id = department.Id },
            department);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(
        int id,
        UpdateDepartmentDto dto)
    {
        var department = _mapper.Map<Department>(dto);

        var updatedDepartment =
            await _departmentService.UpdateDepartment(id, department);

        if (updatedDepartment == null)
        {
            return NotFound(new ApiResponse<Department>
            {
                Success = false,
                Message = "Department not found."
            });
        }

        return Ok(new ApiResponse<Department>
        {
            Success = true,
            Message = "Department updated successfully.",
            Data = updatedDepartment
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var deleted = await _departmentService.DeleteDepartment(id);

        if (!deleted)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Department not found."
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Department deleted successfully."
        });
    }
}