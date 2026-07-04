using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Student>> GetStudents(StudentFilterDto filter)
    {
        IQueryable<Student> query = _context.Students
        .Where(student => !student.IsDeleted);

        // Filtering
        if (!string.IsNullOrWhiteSpace(filter.Name))
        {
            query = query.Where(student =>
                student.Name.Contains(filter.Name));
        }

        if (!string.IsNullOrWhiteSpace(filter.Department))
        {
            query = query.Where(student =>
                student.Department == filter.Department);
        }

        if (filter.MinCGPA.HasValue)
        {
            query = query.Where(student =>
                student.CGPA >= filter.MinCGPA.Value);
        }

        if (filter.MaxCGPA.HasValue)
        {
            query = query.Where(student =>
                student.CGPA <= filter.MaxCGPA.Value);
        }

        // Sorting
        query = filter.SortBy?.ToLower() switch
        {
            "name" => filter.Descending
                ? query.OrderByDescending(student => student.Name)
                : query.OrderBy(student => student.Name),

            "age" => filter.Descending
                ? query.OrderByDescending(student => student.Age)
                : query.OrderBy(student => student.Age),

            "department" => filter.Descending
                ? query.OrderByDescending(student => student.Department)
                : query.OrderBy(student => student.Department),

            "cgpa" => filter.Descending
                ? query.OrderByDescending(student => student.CGPA)
                : query.OrderBy(student => student.CGPA),

            _ => filter.Descending
                ? query.OrderByDescending(student => student.Id)
                : query.OrderBy(student => student.Id)
        };

        // Pagination
        return await query
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();
    }

    public async Task<Student?> GetStudentById(int id)
    {
        return await _context.Students
    .FirstOrDefaultAsync(student =>
        student.Id == id &&
        !student.IsDeleted);
    }

    public async Task AddStudent(Student student)
    {
        _context.Students.Add(student);
        student.CreatedAt = DateTime.UtcNow;
        student.CreatedBy = "System";
        await _context.SaveChangesAsync();
    }

    public async Task<Student?> UpdateStudent(int id, Student updatedStudent)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return null;
        }

        student.Name = updatedStudent.Name;
        student.Age = updatedStudent.Age;
        student.Department = updatedStudent.Department;
        student.CGPA = updatedStudent.CGPA;


        student.UpdatedAt = DateTime.UtcNow;
        student.UpdatedBy = "System";

        await _context.SaveChangesAsync();

        return student;
    }

    public async Task<bool> DeleteStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return false;
        }

        student.IsDeleted = true;
        student.DeletedAt = DateTime.UtcNow;

        

        await _context.SaveChangesAsync();

        return true;
    }
}