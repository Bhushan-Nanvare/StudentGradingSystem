using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class StudentRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context)
    {
        _context = context;
    }

    public List<Student> GetStudents()
    {
        return _context.Students.ToList();
    }

    public void AddStudent(Student student)
    {
        _context.Students.Add(student);

        _context.SaveChanges();
    }
}