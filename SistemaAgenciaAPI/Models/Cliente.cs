namespace SistemaAgenciaAPI.Models;

public class Cliente
{
    public Cliente() => CriadoEm = DateTime.Now;
    public int ClienteId { get; set; } 
    public string? Nome { get; set; } 
    public string? Email { get; set; } 
    public string? Cpf { get; set; }
    public string? Telefone { get; set; } 
    public DateTime CriadoEm { get; set; }
    
}

