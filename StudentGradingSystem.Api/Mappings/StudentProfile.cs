using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Mappings;

public class StudentProfile : Profile
{
    public StudentProfile()
    {
        // Student
        CreateMap<CreateStudentDto, Student>();

        CreateMap<UpdateStudentDto, Student>();

        CreateMap<Student, StudentResponseDto>()
            .ForMember(
                dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department.Name));

        // Department
        CreateMap<CreateDepartmentDto, Department>();

        CreateMap<UpdateDepartmentDto, Department>();

        CreateMap<Department, CreateDepartmentDto>();

        CreateMap<Department, UpdateDepartmentDto>();
    }
}