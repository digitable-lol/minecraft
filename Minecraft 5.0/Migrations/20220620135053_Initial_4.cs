using Microsoft.EntityFrameworkCore.Migrations;

namespace Minecraft_5._0.Migrations
{
    public partial class Initial_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Things_thingid",
                table: "Photos");

            migrationBuilder.AlterColumn<int>(
                name: "thingid",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Things_thingid",
                table: "Photos",
                column: "thingid",
                principalTable: "Things",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Things_thingid",
                table: "Photos");

            migrationBuilder.AlterColumn<int>(
                name: "thingid",
                table: "Photos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Things_thingid",
                table: "Photos",
                column: "thingid",
                principalTable: "Things",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
