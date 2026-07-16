using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Mappings;

public class SubjectProfile : Profile
{
    public SubjectProfile()
    {
        CreateMap<CreateSubjectDto, Subject>();

        CreateMap<UpdateSubjectDto, Subject>();

        CreateMap<Subject, SubjectResponseDto>()
            .ForMember(
                dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department.Name))
            .ForMember(
                dest => dest.FacultyName,
                opt => opt.MapFrom(src => src.Faculty.FirstName + " " + src.Faculty.LastName));
    }
}