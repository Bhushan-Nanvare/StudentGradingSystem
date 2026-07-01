using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class StudentRepository
{
    public List<Student> GetStudents()
    {
        return new List<Student>
        {
            new Student
            {
                Id = 1,
                Name = "Bhushan",
                Age = 21,
                Department = "Computer Science",
                CGPA = 8.9
            },

            new Student
            {
                Id = 2,
                Name = "Rahul",
                Age = 20,
                Department = "Mechanical",
                CGPA = 8.1
            }
        };
    }
}