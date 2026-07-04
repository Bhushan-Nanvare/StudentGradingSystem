using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;
using System.Threading.Tasks;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Repositories;

public class StudentRepository : IStudentRepository
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

   public async Task AddStudent(Student student)
{
    _context.Students.Add(student);

    await _context.SaveChangesAsync();

}

public async Task<Student?> GetStudentById(int id)
{
    return await _context.Students
        .FirstOrDefaultAsync(student => student.Id == id);
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

    _context.Students.Remove(student);

    await _context.SaveChangesAsync();

    return true;
}
}