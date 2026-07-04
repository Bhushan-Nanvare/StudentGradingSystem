namespace StudentGradingSystem.Api.DTOs.Common;

public class StudentFilterDto : PaginationDto
{
    public string? Name { get; set; }

    public string? Department { get; set; }

    public double? MinCGPA { get; set; }

    public double? MaxCGPA { get; set; }

    public string? SortBy { get; set; } = "Id";

    public bool Descending { get; set; } = false;
}