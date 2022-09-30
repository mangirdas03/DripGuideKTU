using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DripGuide.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    Description2 = table.Column<string>(type: "nvarchar(300)", nullable: false),
                    Material = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    StyleCode = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Colorway = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    FK_User = table.Column<int>(type: "int", nullable: false),
                    SubmitDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    FK_Brand = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(200)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(150)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Role = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "fk_user",
                table: "Post",
                column: "FK_User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
