using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using FluentValidation;

using StudentGradingSystem.Api.Authentication;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Extensions;
using StudentGradingSystem.Api.Filters;
using StudentGradingSystem.Api.Mappings;
using StudentGradingSystem.Api.Middleware;
using StudentGradingSystem.Api.Validators;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Services;
using StudentGradingSystem.Api.Seed;
using StudentGradingSystem.Api.Security;
using StudentGradingSystem.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Dependency Injection
builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<CreateStudentValidator>();

// Validation Filter
builder.Services.AddScoped(typeof(ValidationFilter<>));

builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();

builder.Services.AddScoped<IAttendanceService, AttendanceService>();

// JWT Settings
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));



builder.Services.AddSingleton<PasswordHasher>();

builder.Services.AddScoped<IFacultyRepository, FacultyRepository>();

builder.Services.AddScoped<IFacultyService, FacultyService>();

builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

builder.Services.AddScoped<IDepartmentService, DepartmentService>();

builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
// JWT Authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration
            .GetSection("JwtSettings")
            .Get<JwtSettings>();

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings!.Issuer,
            ValidAudience = jwtSettings.Audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    });

// Authorization
builder.Services.AddAuthorization();

// JWT Token Generator
builder.Services.AddScoped<JwtTokenGenerator>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<ExceptionMiddleware>();

// app.UseHttpsRedirection();

// Authentication & Authorization
app.UseAuthentication();

app.UseCors("ReactPolicy");

app.UseAuthorization();

// Controllers
app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    await DatabaseSeeder.SeedAsync(context);
}

app.Run();