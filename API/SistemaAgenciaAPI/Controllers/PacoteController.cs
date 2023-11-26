using Microsoft.AspNetCore.Mvc;
using SistemaAgenciaAPI.Data;

namespace SistemaAgenciaAPI.Controllers
{
    [ApiController]
    [Route("api/pacote")]
    public class PacoteDeViagem : ControllerBase
    {
        private readonly AppDataContext _ctx;
        public PacoteDeViagem(AppDataContext ctx){
            _ctx = ctx;
        }
        
        // GET: api/pacotes/listar
        [HttpGet]
        [Route("listar")]
        public IActionResult Listar()
        {
            try
            {
                List<Pacote> pacotes = _ctx.Pacotes.ToList();
                return pacotes.Count == 0 ? NotFound() : Ok(pacotes); 
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

        }

        // GET: api/pacote/{nome}
        [HttpGet]
        [Route("buscarNome/{nome}")]
        public IActionResult Buscar([FromRoute] string nome)
        {
            try
            {
                Pacote? pacoteCadastrado = _ctx.Pacotes.FirstOrDefault(x => x.NomePacote == nome);
                if (pacoteCadastrado != null)
                {
                    return Ok(pacoteCadastrado);
                }
                return NotFound();  
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // GET: api/cliente/{id}
        [HttpGet]
        [Route("buscar/{id}")]
        public IActionResult Buscar([FromRoute] int id)
        {
            try
            {
                Pacote? pacoteCadastrado =
                    _ctx.Pacotes
                    .FirstOrDefault(x => x.PacoteId == id);
                if (pacoteCadastrado != null)
                {
                    return Ok(pacoteCadastrado);
                }
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/pacote
        [HttpPost]
        [Route("cadastrar")]
        public IActionResult Cadastrar([FromBody] Pacote pacote)
        {
            try
            {
                _ctx.Pacotes.Add(pacote);
                _ctx.SaveChanges();
                return Created("", pacote);               
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // PUT: api/pacote/{id}
        [HttpPut]
        [Route("alterar/{id}")]
        public IActionResult Alterar([FromRoute] int id, [FromBody] Pacote pacote)
        {
            try
            {
                Pacote? pacoteCadastrado =
                    _ctx.Pacotes.FirstOrDefault(x => x.PacoteId == id);

                if (pacoteCadastrado != null)
                {
                    pacoteCadastrado.NomePacote = pacote.NomePacote;
                    pacoteCadastrado.Origem = pacote.Origem;
                    pacoteCadastrado.Destino = pacote.Destino;
                    pacoteCadastrado.Valor = pacote.Valor;
                    pacoteCadastrado.DataPartida = pacote.DataPartida;
                    pacoteCadastrado.DataRetorno = pacote.DataRetorno;
                    pacoteCadastrado.VagasDisponiveis = pacote.VagasDisponiveis;
                    _ctx.Pacotes.Update(pacoteCadastrado);
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

        // DELETE: api/pacote/{id}
        [HttpDelete]
        [Route("deletar/{id}")]
        public IActionResult Deletar([FromRoute] int id)
        {
            try
            {
                Pacote? pacoteCadastrado = _ctx.Pacotes.Find(id);
                if (pacoteCadastrado != null)
                {
                    _ctx.Pacotes.Remove(pacoteCadastrado);
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