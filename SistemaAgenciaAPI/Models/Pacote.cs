namespace SistemaAgenciaAPI;
public class Pacote
{
    public Pacote() => CriadoEm = DateTime.Now;
    public int PacoteId { get; set; }
    public string? NomePacote { get; set; } 
    public string? Origem { get; set; } 
    public string? Destino { get; set; } 
    public decimal Valor { get; set; } 
    public DateTime DataPartida { get; set; } 
    public DateTime DataRetorno { get; set; } 
    public int VagasDisponiveis { get; set; } 
    public DateTime CriadoEm { get; set; }

}