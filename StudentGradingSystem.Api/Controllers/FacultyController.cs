using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/faculties")]
[Authorize(Roles = "Admin")]
public class FacultyController : ControllerBase
{
    private readonly IFacultyService _facultyService;
    private readonly IMapper _mapper;

    public FacultyController(
        IFacultyService facultyService,
        IMapper mapper)
    {
        _facultyService = facultyService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetFaculties()
    {
        var faculties = await _facultyService.GetFaculties();

        var response =
            _mapper.Map<List<FacultyResponseDto>>(faculties);

        return Ok(new ApiResponse<List<FacultyResponseDto>>
        {
            Success = true,
            Message = "Faculties retrieved successfully.",
            Data = response
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFacultyById(int id)
    {
        var faculty = await _facultyService.GetFacultyById(id);

        if (faculty == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Faculty not found.",
                Data = null
            });
        }

        var response =
            _mapper.Map<FacultyResponseDto>(faculty);

        return Ok(new ApiResponse<FacultyResponseDto>
        {
            Success = true,
            Message = "Faculty retrieved successfully.",
            Data = response
        });
    }

    [HttpPost]
    public async Task<IActionResult> AddFaculty(CreateFacultyDto dto)
    {
        var faculty = _mapper.Map<Faculty>(dto);

        await _facultyService.AddFaculty(faculty);

        return CreatedAtAction(
            nameof(GetFacultyById),
            new { id = faculty.Id },
            faculty);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFaculty(
        int id,
        UpdateFacultyDto dto)
    {
        var faculty = _mapper.Map<Faculty>(dto);

        var updatedFaculty =
            await _facultyService.UpdateFaculty(id, faculty);

        if (updatedFaculty == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Faculty not found."
            });
        }

        var response =
            _mapper.Map<FacultyResponseDto>(updatedFaculty);

        return Ok(new ApiResponse<FacultyResponseDto>
        {
            Success = true,
            Message = "Faculty updated successfully.",
            Data = response
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFaculty(int id)
    {
        var deleted = await _facultyService.DeleteFaculty(id);

        if (!deleted)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Faculty not found."
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Faculty deleted successfully."
        });
    }
}