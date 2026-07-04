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
    }
}