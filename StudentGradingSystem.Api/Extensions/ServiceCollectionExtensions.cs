using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Repositories;
using StudentGradingSystem.Api.Services;

namespace StudentGradingSystem.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(
    this IServiceCollection services)
{
    // Student
    services.AddScoped<IStudentRepository, StudentRepository>();
    services.AddScoped<IStudentService, StudentService>();

    // Subject
    services.AddScoped<ISubjectRepository, SubjectRepository>();
    services.AddScoped<ISubjectService, SubjectService>();

    return services;
}
}