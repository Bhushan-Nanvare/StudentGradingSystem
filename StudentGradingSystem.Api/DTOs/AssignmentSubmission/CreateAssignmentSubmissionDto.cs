using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace StudentGradingSystem.Api.DTOs.AssignmentSubmission;

public class CreateAssignmentSubmissionDto
{
    [Required]
    public int AssignmentId { get; set; }

    [Required]
    public int StudentId { get; set; }

    [Required]
    public IFormFile File { get; set; } = null!;
}