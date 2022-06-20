using Microsoft.EntityFrameworkCore.Migrations;

namespace Minecraft_5._0.Migrations
{
    public partial class initial_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Things_Users_userid",
                table: "Things");

            migrationBuilder.AlterColumn<int>(
                name: "userid",
                table: "Things",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Things_Users_userid",
                table: "Things",
                column: "userid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Things_Users_userid",
                table: "Things");

            migrationBuilder.AlterColumn<int>(
                name: "userid",
                table: "Things",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Things_Users_userid",
                table: "Things",
                column: "userid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
