using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Models;
using System.Threading.Tasks;

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
}