using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Mappings;

public class StudentMappingProfile : Profile
{
    public StudentMappingProfile()
    {
        CreateMap<CreateStudentDto, Student>();

        CreateMap<UpdateStudentDto, Student>();

        CreateMap<Student, StudentResponseDto>()
            .ForMember(
                dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department.Name))
            .ForMember(
                dest => dest.Email,
                opt => opt.MapFrom(src =>
                    src.ApplicationUser != null
                        ? src.ApplicationUser.Email
                        : string.Empty));
    }
}
