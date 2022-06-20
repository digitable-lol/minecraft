using Microsoft.EntityFrameworkCore.Migrations;

namespace Minecraft_5._0.Migrations
{
    public partial class initial_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "photoBill",
                table: "Things",
                newName: "photosrc");

            migrationBuilder.RenameColumn(
                name: "photo",
                table: "Things",
                newName: "photoBillsrc");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "photosrc",
                table: "Things",
                newName: "photoBill");

            migrationBuilder.RenameColumn(
                name: "photoBillsrc",
                table: "Things",
                newName: "photo");
        }
    }
}
