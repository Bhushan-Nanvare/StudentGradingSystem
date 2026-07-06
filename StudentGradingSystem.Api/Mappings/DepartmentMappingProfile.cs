using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Mappings;

public class DepartmentMappingProfile : Profile
{
    public DepartmentMappingProfile()
    {
        CreateMap<CreateDepartmentDto, Department>();

        CreateMap<UpdateDepartmentDto, Department>();

        CreateMap<Department, CreateDepartmentDto>();

        CreateMap<Department, UpdateDepartmentDto>();

        CreateMap<Department, DepartmentResponseDto>();
    }
}