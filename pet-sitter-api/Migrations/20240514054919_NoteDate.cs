using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pet_sitter_api.Migrations
{
    public partial class NoteDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NoteDate",
                table: "Note",
                type: "datetime(6)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoteDate",
                table: "Note");
        }
    }
}
