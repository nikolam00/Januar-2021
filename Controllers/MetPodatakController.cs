using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;

namespace Januar_2021.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MetPodatakController:ControllerBase
    {
        public Context Context {get; set;}

        public MetPodatakController(Context context)
        {
            Context=context;
        }

        [HttpPut]
        [Route("PromeniTemperaturu/{nazivGrada}/{mesec}/{novaTemperatura}")]
        public async Task<ActionResult> PromeniTemperaturu(string nazivGrada, string mesec, double novaTemperatura)
        {
            if(string.IsNullOrEmpty(nazivGrada)) return BadRequest("Morate uneti naziv grada!");
            if(string.IsNullOrEmpty(mesec)) return BadRequest("Morate uneti mesec!");
            if(novaTemperatura<-50 || novaTemperatura>50) return BadRequest("Neispravna vrednost!");

            try
            {
                var grad = Context.Gradovi.Include(p=>p.Podaci).Where(p=>(p.Naziv==nazivGrada)).FirstOrDefault();

                if(grad!=null)
                {
                    MetPodatak podatak=null;
                    foreach (var p in grad.Podaci)
                    {
                        if(p.Mesec==mesec)
                        {
                            podatak=p;
                            break;
                        }
                    }
                    if(podatak!=null)
                    {
                        podatak.Temperatura=novaTemperatura;
                        Context.Podaci.Update(podatak);
                        Context.Gradovi.Update(grad);
                    }
                    else
                    return BadRequest($"Podaci u gradu {nazivGrada} za mesec {mesec} ne postoje!");
                }
                else
                {
                    return BadRequest($"Grad {nazivGrada} ne postoji!");
                }
            
                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    
        [HttpPut]
        [Route("PromeniPadavine/{nazivGrada}/{mesec}/{novePadavine}")]
        public async Task<ActionResult> PromeniPadavine(string nazivGrada, string mesec, double novePadavine)
        {
            if(string.IsNullOrEmpty(nazivGrada)) return BadRequest("Morate uneti naziv grada!");
            if(string.IsNullOrEmpty(mesec)) return BadRequest("Morate uneti mesec!");
            if(novePadavine<0) return BadRequest("Neispravna vrednost!");
            try
            {
                var grad=Context.Gradovi.Include(p=>p.Podaci).Where(p=>(p.Naziv==nazivGrada)).FirstOrDefault();
                if(grad!=null)
                {
                    MetPodatak podatak=null;
                    foreach(var p in grad.Podaci)
                    {
                        if(p.Mesec==mesec)
                        {
                            podatak=p;
                            break;
                        }
                    }

                    if(podatak!=null)
                    {
                        podatak.Padavine=novePadavine;
                        Context.Podaci.Update(podatak);
                        Context.Gradovi.Update(grad);
                    }
                    else
                    return BadRequest($"Podaci u gradu {nazivGrada} za mesec {mesec} ne postoje!");
                }
                else
                    return BadRequest($"Ne postoje podaci o gradu {nazivGrada}!");

                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("PromeniDane/{nazivGrada}/{mesec}/{noviDani}")]
        public async Task<ActionResult> PromeniPadavine(string nazivGrada, string mesec, int noviDani)
        {
            if(string.IsNullOrEmpty(nazivGrada)) return BadRequest("Morate uneti naziv grada!");
            if(string.IsNullOrEmpty(mesec)) return BadRequest("Morate uneti mesec!");
            if(noviDani<0 || noviDani>31) return BadRequest("Neispravna vrednost!");
            try
            {
                var grad=Context.Gradovi.Include(p=>p.Podaci).Where(p=>(p.Naziv==nazivGrada)).FirstOrDefault();
                if(grad!=null)
                {
                    MetPodatak podatak=null;
                    foreach(var p in grad.Podaci)
                    {
                        if(p.Mesec==mesec)
                        {
                            podatak=p;
                            break;
                        }
                    }

                    if(podatak!=null)
                    {
                        podatak.Dani=noviDani;
                        Context.Podaci.Update(podatak);
                        Context.Gradovi.Update(grad);
                    }
                    else
                    return BadRequest($"Podaci u gradu {nazivGrada} za mesec {mesec} ne postoje!");
                }
                else
                    return BadRequest($"Ne postoje podaci o gradu {nazivGrada}!");

                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}