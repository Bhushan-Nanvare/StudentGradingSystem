using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs.AssignmentSubmission;

public class UpdateSubmissionMarksDto
{
    [Range(0,100)]
    public decimal Marks { get; set; }

    public string Remarks { get; set; } = "";
}