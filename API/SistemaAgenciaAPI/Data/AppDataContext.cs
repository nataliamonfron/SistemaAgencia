using Microsoft.EntityFrameworkCore;
using SistemaAgenciaAPI.Models;

namespace SistemaAgenciaAPI.Data;
public class AppDataContext : DbContext
{

    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) 
    {

    }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Pacote> Pacotes { get; set; }
    public DbSet<Reserva> Reservas { get; set; }
}