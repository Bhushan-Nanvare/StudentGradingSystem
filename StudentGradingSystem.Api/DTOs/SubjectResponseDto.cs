public class SubjectResponseDto
{
    public int Id { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public decimal Credits { get; set; }

    public int Semester { get; set; }

    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;

    public int FacultyId { get; set; }

    public string FacultyName { get; set; } = string.Empty;
}