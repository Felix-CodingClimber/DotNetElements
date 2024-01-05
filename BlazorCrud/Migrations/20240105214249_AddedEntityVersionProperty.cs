using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlazorCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddedEntityVersionProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Version",
                table: "Tags",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Version",
                table: "BlogPosts",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "BlogPosts");
        }
    }
}
