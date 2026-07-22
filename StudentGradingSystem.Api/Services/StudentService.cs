using AutoMapper;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;
    private readonly IApplicationUserRepository _userRepository;
    private readonly ILogger<StudentService> _logger;
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public StudentService(
        IStudentRepository studentRepository,
        IApplicationUserRepository userRepository,
        ILogger<StudentService> logger,
        IMapper mapper,
        AppDbContext context)
    {
        _studentRepository = studentRepository;
        _userRepository = userRepository;
        _logger = logger;
        _mapper = mapper;
        _context = context;
    }

    public async Task<List<StudentResponseDto>> GetStudents(StudentFilterDto filter)
    {
        var students = await _studentRepository.GetStudents(filter);

        return _mapper.Map<List<StudentResponseDto>>(students);
    }

    public async Task<StudentResponseDto?> GetStudentById(int id)
    {
        var student = await _studentRepository.GetStudentById(id);

        if (student == null)
            return null;

        return _mapper.Map<StudentResponseDto>(student);
    }

    public async Task AddStudent(CreateStudentDto dto)
    {
        _logger.LogInformation("Creating student {RollNumber}", dto.RollNumber);

        await using var transaction =
            await _context.Database.BeginTransactionAsync();

        try
        {
            if (await _userRepository.ExistsByUsernameAsync(dto.RollNumber))
                throw new Exception("Roll Number already exists.");

            if (await _userRepository.ExistsByEmailAsync(dto.Email))
                throw new Exception("Email already exists.");

            var user = await _userRepository.AddAsync(new ApplicationUser
            {
                Username = dto.RollNumber,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.RollNumber),
                Role = "Student"
            });

            var student = new Student
            {
                Name = dto.Name,
                Age = dto.Age,
                DepartmentId = dto.DepartmentId,
                RollNumber = dto.RollNumber,
                CGPA = dto.CGPA,
                ApplicationUserId = user.Id
            };

            await _studentRepository.AddStudent(student);

            await transaction.CommitAsync();

            _logger.LogInformation(
                "Student created successfully. StudentId={StudentId}",
                student.Id);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<Student?> UpdateStudent(int id, Student dto)
    {
        _logger.LogInformation("Updating student {Id}", id);

        var student = await _studentRepository.UpdateStudent(id, dto);

        if (student == null)
        {
            _logger.LogWarning("Student not found {Id}", id);
            return null;
        }

        return student;
    }

    public async Task<bool> DeleteStudent(int id)
    {
        _logger.LogInformation("Deleting student {Id}", id);

        return await _studentRepository.DeleteStudent(id);
    }
}