using SistemaAgenciaAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAgenciaAPI;
using SistemaAgenciaAPI.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/reserva")]
public class ReservaController : ControllerBase
{
    private readonly AppDataContext _ctx;
    public ReservaController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    //GET: api/reserva/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Reserva> reservas =
                _ctx.Reservas
                .Include(x => x.Cliente)
                .Include(x => x.Pacote)
                .ToList();
            return reservas.Count == 0 ? NotFound() : Ok(reservas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Reserva reserva)
    {
        try
        {
            Cliente? cliente = _ctx.Clientes.Find(reserva.ClienteId);
            if (cliente == null)
            {
                return NotFound("Cliente não encontrado.");
            }

            Pacote? pacote = _ctx.Pacotes.Find(reserva.PacoteId);
            if (pacote == null)
            {
                return NotFound("Pacote não encontrado.");
            }

            reserva.Pacote = pacote;
            reserva.Cliente = cliente;

            //Verifica se o numero de vagas disponiveis eh maior que o numero de pessoas que estao reservando o pacote. Se true, ele cadastra

            if (pacote.VagasDisponiveis >= reserva.NumeroPessoas)
            {
                pacote.VagasDisponiveis -= reserva.NumeroPessoas;

                reserva.ValorTotal = reserva.CalcularValorTotal();

                _ctx.Reservas.Add(reserva);
                _ctx.SaveChanges();
                return Created("", reserva);
            } 
            else 
            {
                return BadRequest("Não há vagas disponíveis para esta reserva.");
            }
            }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("buscar/{id}")]
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            Reserva? reservaCadastrada =
                _ctx.Reservas
                .Include(x => x.Cliente)
                .Include(x => x.Pacote)
                .FirstOrDefault(x => x.ReservaId == id);
            if (reservaCadastrada != null)
            {
                return Ok(reservaCadastrada);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [Route("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            Reserva? reservaCadastrada = _ctx.Reservas.Find(id);
            if (reservaCadastrada != null)
            {
                _ctx.Reservas.Remove(reservaCadastrada);
                _ctx.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id,
        [FromBody] Reserva reserva)
    {
        try
        {

            Reserva? reservaCadastrada = _ctx.Reservas.FirstOrDefault(x => x.ReservaId == id);

            if (reservaCadastrada != null)
            {
                //guarda o pacote da reserva anterior 

                Pacote? pacoteAnterior = _ctx.Pacotes.Find(reservaCadastrada.PacoteId);
                pacoteAnterior = reservaCadastrada.Pacote;

                // guarda em variaveis a info do ID anterior do pacote e do num de pessoas 

                int numPessoasReservaAnterior = reservaCadastrada.NumeroPessoas;
                int pacoteIdReservaAnterior = reservaCadastrada.PacoteId;

                reservaCadastrada.ClienteId = reserva.ClienteId;
                reservaCadastrada.PacoteId = reserva.PacoteId;
                reservaCadastrada.NumeroPessoas = reserva.NumeroPessoas;
                reservaCadastrada.Status = reserva.Status;

                Cliente? cliente = _ctx.Clientes.Find(reserva.ClienteId);
                if (cliente == null)
                {
                    return NotFound("Cliente não encontrado.");
                }

                Pacote? pacote = _ctx.Pacotes.Find(reserva.PacoteId);
                if (pacote == null)
                {
                    return NotFound("Pacote não encontrado.");
                }

                reserva.Pacote = pacote;
                reserva.Cliente = cliente;

                // Restaura as vagas disponiveis no pacote anterior se o pacote mudou
                if (pacoteAnterior.PacoteId != pacote.PacoteId)
                {
                    pacoteAnterior.VagasDisponiveis += numPessoasReservaAnterior;
                    pacote.VagasDisponiveis -= reservaCadastrada.NumeroPessoas;
                    _ctx.Pacotes.Update(pacoteAnterior);
                    _ctx.Pacotes.Update(pacote);
                }
                
                // Atualiza as vagas disponiveis no novo pacote se o num de pessoas mudou
                else if (reservaCadastrada.NumeroPessoas != numPessoasReservaAnterior)
                {
                    int res = reservaCadastrada.NumeroPessoas - numPessoasReservaAnterior;
                    if (pacote.VagasDisponiveis + res >= 0)
                    {
                        pacote.VagasDisponiveis -= res;
                        _ctx.Pacotes.Update(pacote);
                    }
                    else
                    {
                        return BadRequest("Não há vagas disponíveis para esta reserva.");
                    }
                }

                reservaCadastrada.ValorTotal = reservaCadastrada.NumeroPessoas * pacote.Valor;

                _ctx.Reservas.Update(reservaCadastrada);
                _ctx.SaveChanges();

                return Ok();
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}