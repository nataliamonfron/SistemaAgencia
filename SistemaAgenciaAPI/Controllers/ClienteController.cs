using Microsoft.AspNetCore.Mvc;
using SistemaAgenciaAPI.Data;
using SistemaAgenciaAPI.Models;

namespace SistemaAgenciaAPI.Controllers
{
    [ApiController]
    [Route("api/cliente")]
    public class CLienteController : ControllerBase
    {
        private readonly AppDataContext _ctx;
        public CLienteController(AppDataContext ctx){
            _ctx = ctx;
        }
        
        // GET: api/clientes/listar
        [HttpGet]
        [Route("listar")]
        public IActionResult Listar()
        {
            try
            {
                List<Cliente> clientes = _ctx.Clientes.ToList();
                return clientes.Count == 0 ? NotFound() : Ok(clientes); 
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

        }

        // GET: api/cliente/{id}
        [HttpGet]
        [Route("buscar/{nome}")]
        public IActionResult Buscar([FromRoute] string nome)
        {
            try
            {
                Cliente? clienteCadastrado = _ctx.Clientes.FirstOrDefault(x => x.Nome == nome);
                if (clienteCadastrado != null)
                {
                    return Ok(clienteCadastrado);
                }
                return NotFound();  
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }

        }

        // POST: api/cliente
        [HttpPost]
        [Route("cadastrar")]
        public IActionResult Cadastrar([FromBody] Cliente cliente)
        {
            try
            {
                _ctx.Clientes.Add(cliente);
                _ctx.SaveChanges();
                return Created("", cliente);               
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // PUT: api/cliente/{id}
        [HttpPut]
        [Route("alterar/{id}")]
        public IActionResult Alterar([FromRoute] int id, [FromBody] Cliente cliente)
        {
            try
            {
                Cliente? clienteCadastrado =
                    _ctx.Clientes.FirstOrDefault(x => x.ClienteId == id);

                if (clienteCadastrado != null)
                {
                    clienteCadastrado.Nome = cliente.Nome;
                    clienteCadastrado.Email = cliente.Email;
                    clienteCadastrado.Cpf = cliente.Cpf;
                    clienteCadastrado.Telefone = cliente.Telefone;
                    _ctx.Clientes.Update(clienteCadastrado);
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

        // DELETE: api/cliente/{id}
        [HttpDelete]
        [Route("deletar/{id}")]
        public IActionResult Deletar([FromRoute] int id)
        {
            try
            {
                Cliente? clienteCadastrado = _ctx.Clientes.Find(id);
                if (clienteCadastrado != null)
                {
                    _ctx.Clientes.Remove(clienteCadastrado);
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
}
