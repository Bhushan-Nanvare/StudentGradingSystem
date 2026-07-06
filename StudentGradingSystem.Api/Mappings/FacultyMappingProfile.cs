using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Mappings;

public class FacultyMappingProfile : Profile
{
    public FacultyMappingProfile()
    {
        CreateMap<CreateFacultyDto, Faculty>();

        CreateMap<UpdateFacultyDto, Faculty>();

        CreateMap<Faculty, FacultyResponseDto>()
            .ForMember(
                dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department.Name));
    }
}