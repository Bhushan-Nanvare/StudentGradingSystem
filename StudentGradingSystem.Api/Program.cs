using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Repositories;
using StudentGradingSystem.Api.Services;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Extensions;
using StudentGradingSystem.Api.Middleware;
using StudentGradingSystem.Api.Mappings;
using FluentValidation;
using StudentGradingSystem.Api.Validators;
using StudentGradingSystem.Api.Filters;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddApplication();

builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddAutoMapper(typeof(StudentProfile));
builder.Services.AddValidatorsFromAssemblyContaining<CreateStudentValidator>();
builder.Services.AddScoped(typeof(ValidationFilter<>));


// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<ExceptionMiddleware>();

// app.UseHttpsRedirection();

app.MapControllers();

app.Run();