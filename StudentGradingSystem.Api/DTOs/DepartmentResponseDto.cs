namespace StudentGradingSystem.Api.DTOs;

public class DepartmentResponseDto
{
    public int Id { get; set; }

    public string DepartmentCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
}