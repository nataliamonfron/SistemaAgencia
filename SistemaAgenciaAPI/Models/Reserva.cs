using SistemaAgenciaAPI.Models;
namespace SistemaAgenciaAPI;
public class Reserva
{
    public Reserva() => CriadoEm = DateTime.Now;
    public int ReservaId { get; set; }
    public Cliente? Cliente { get; set; }
    public int ClienteId { get; set; }
    public Pacote? Pacote { get; set; }
    public int PacoteId { get; set; }
    public int NumeroPessoas { get; set; }
    public string? Status { get; set; } // pendente, confirmada, cancelada
    public double ValorTotal { get; set; } 
    public DateTime CriadoEm { get; set; }

}