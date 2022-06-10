using Microsoft.EntityFrameworkCore.Migrations;

namespace Minecraft_5._0.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    owner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    photoItem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    photoBill = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    count = table.Column<int>(type: "int", nullable: true),
                    date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Item");
        }
    }
}
