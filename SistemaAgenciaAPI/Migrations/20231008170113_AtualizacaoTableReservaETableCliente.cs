using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaAgenciaAPI.Migrations
{
    public partial class AtualizacaoTableReservaETableCliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Clientes",
                newName: "NomeCliente");

            migrationBuilder.AddColumn<int>(
                name: "NumeroPessoas",
                table: "Reservas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumeroPessoas",
                table: "Reservas");

            migrationBuilder.RenameColumn(
                name: "NomeCliente",
                table: "Clientes",
                newName: "Nome");
        }
    }
}
