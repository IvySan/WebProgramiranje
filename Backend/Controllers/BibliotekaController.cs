using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjekatWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjekatWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BibliotekaController : ControllerBase
    {   
        public BibliotekaContext Context { get; set; }

        public BibliotekaController(BibliotekaContext context)
        {
            Context = context;
        }

        // preuzimanje biblioteka
        [Route("PreuzmiBiblioteke")]
        [HttpGet]
        public async Task<List<Biblioteka>> PreuzmiBiblioteke()
        {
            return await Context.Biblioteke.Include(p => p.Police).ThenInclude(p => p.Knjige).ToListAsync();
        }

        //upis biblioteke
        [Route("UpisiBiblioteku")]
        [HttpPost]
        public async Task UpisiBiblioteku([FromBody] Biblioteka biblioteka)
        {
            Context.Biblioteke.Add(biblioteka);
            await Context.SaveChangesAsync();
        }

        //izmena biblioteke
        [Route("IzmeniBiblioteku")]
        [HttpPut]
        public async Task IzmeniBiblioteku( [FromBody] Biblioteka biblioteka )
        {
            //var staraBiblioteka = await Context.Biblioteke.FindAsync(biblioteka.ID);
            //staraBiblioteka.Naziv = biblioteka.Naziv;
            //staraBiblioteka.BrojPolica = biblioteka.BrojPolica;

            Context.Update<Biblioteka>(biblioteka);
            await Context.SaveChangesAsync();
        }

        //brisanje biblioteke
        [Route("IzbrisiBiblioteku")]
        [HttpDelete]
        public async Task IzbrisiBiblioteku(int id)
        {
            var biblioteka = await Context.Biblioteke.FindAsync(id);
            Context.Remove(biblioteka);
            await Context.SaveChangesAsync();
        }

        //upis police
        [Route("UpisiPolicu/{idBiblioteke}")]
        [HttpPost]
        public async Task UpisiPolicu(int idBiblioteke, [FromBody] Polica polica)
        {
            var biblioteka = await Context.Biblioteke.FindAsync(idBiblioteke);
            polica.Biblioteka = biblioteka;
            Context.Police.Add(polica);
            await Context.SaveChangesAsync();
        }

        //preuzimanje polica 
        [Route("PreuzmiPolice")]
        [HttpGet]
        public async Task<List<Polica>> PreuzmiPolice()
        {
            return await Context.Police.Include(p => p.Knjige).ToListAsync();
        }

        //izmena trenutnog broja knjiga na polici
        [Route("IzmeniTrBr/{idPolice}/{trenutniBrojKnjiga}")]
        [HttpPut]
        public async Task  IzmeniTrBr(int idPolice, int trenutniBrojKnjiga )
        {
            var policaZaPromenu = await Context.Police.Where(p => p.ID == idPolice).FirstOrDefaultAsync();
            policaZaPromenu.TrenutniBroj = trenutniBrojKnjiga;
            Context.Police.Update(policaZaPromenu);
            await Context.SaveChangesAsync();

           /*if( policaZaPromenu.TrenutniBroj < policaZaPromenu.MaxBroj)
            {
                trenutniBrojKnjiga++;
                policaZaPromenu.TrenutniBroj = trenutniBrojKnjiga;
                Context.Police.Update(policaZaPromenu);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else return StatusCode(406);
            */
            
        }

        //upis knjige
        [Route("UpisiKnjigu/{idPolice}")]
        [HttpPost]
        public async Task UpisiKnjigu( int idPolice, [FromBody] Knjiga knjiga )
        {
            var polica = await Context.Police.FindAsync(idPolice);
            knjiga.Polica = polica;
            Context.Knjige.Add(knjiga);
            await Context.SaveChangesAsync();
            
    
        }

        //preuzimanje svih knjiga
        [Route("PreuzmiSveKnjige")]
        [HttpGet]
        public async Task<List<Knjiga>> PreuzmiSveKnjige()
        {
            return await Context.Knjige.ToListAsync();
             
        }

        //preuzimanje jedne knjige
        [Route("PreuzmiKnjigu/{idKnjige}")]
        [HttpGet]
        public async Task<Knjiga> PreuzmiKnjigu (int idKnjige)
        {
            var knjiga1 = Context.Knjige.Where(p => p.ID == idKnjige).FirstOrDefaultAsync();
            return await knjiga1;
        }

        //izmena knjige
        [Route("IzmeniKnjigu/{idKnjige}/{noviID}")]
        [HttpPut]
        public async Task IzmeniKnjigu(int idKnjige, int noviID, [FromBody] Knjiga knjiga)
        {
            var knjiga1 = await Context.Knjige.Where(p => p.ID == idKnjige).FirstOrDefaultAsync();
            knjiga1.ID = noviID;
            knjiga1.Naziv = knjiga.Naziv;
            knjiga1.Autor = knjiga.Autor;
            knjiga1.BrojStrana = knjiga.BrojStrana;
            await Context.SaveChangesAsync();
        }

        //brisanje knjige
        [Route("IzbrisiKnjigu/{idKnjige}")]
        [HttpDelete]
        public async Task IzbrisiKnjigu(int idKnjige, [FromBody] Knjiga knjiga)
        {
            var knjiga1 = await Context.Knjige.Where(p => p.ID == idKnjige).FirstOrDefaultAsync();
            Context.Remove(knjiga1);
            await Context.SaveChangesAsync();
        }

    }
}
