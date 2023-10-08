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
            Cliente? cliente =
                _ctx.Clientes.Find(reserva.ClienteId);
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

            _ctx.Reservas.Add(reserva);
            _ctx.SaveChanges();
            return Created("", reserva);
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
            //Expressões lambda
            Reserva? reservaCadastrada =
                _ctx.Reservas.FirstOrDefault(x => x.ReservaId == id);

            if (reservaCadastrada != null)
            {
                reservaCadastrada.ClienteId = reserva.ClienteId;
                reservaCadastrada.PacoteId = reserva.PacoteId;
                reservaCadastrada.NumeroPessoas = reserva.NumeroPessoas;
                reservaCadastrada.Status = reserva.Status;
                reservaCadastrada.ValorTotal = reserva.ValorTotal;
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