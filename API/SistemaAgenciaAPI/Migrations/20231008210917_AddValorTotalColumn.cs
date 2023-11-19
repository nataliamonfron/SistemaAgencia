using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaAgenciaAPI.Migrations
{
    public partial class AddValorTotalColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ValorTotal",
                table: "Reservas",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorTotal",
                table: "Reservas");
        }
    }
}
