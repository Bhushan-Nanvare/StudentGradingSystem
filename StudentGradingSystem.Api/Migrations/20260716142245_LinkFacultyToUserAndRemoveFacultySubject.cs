using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentGradingSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class LinkFacultyToUserAndRemoveFacultySubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "Faculties",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Faculties_ApplicationUserId",
                table: "Faculties",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Faculties_Users_ApplicationUserId",
                table: "Faculties",
                column: "ApplicationUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Faculties_Users_ApplicationUserId",
                table: "Faculties");

            migrationBuilder.DropIndex(
                name: "IX_Faculties_ApplicationUserId",
                table: "Faculties");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Faculties");
        }
    }
}
