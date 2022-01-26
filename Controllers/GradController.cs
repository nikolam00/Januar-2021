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

    public class GradController:ControllerBase
    {
        public Context Context {get; set;}

        public GradController(Context context)
        {
            Context=context;
        }

        [HttpGet]
        [Route("SviGradovi")]

        public ActionResult SviGradovi()
        {
            var gradovi=Context.Gradovi.Include(p=>p.Podaci).ToList();
            return Ok(gradovi);
        }

        [HttpGet]
        [Route("VratiGrad/{id}")]
        public ActionResult VratiGrad(int id)
        {
            var grad=Context.Gradovi.Include(p=>p.Podaci).Where(p=>p.IDGrad==id).FirstOrDefault();
            if(grad!=null)
            {
                return Ok(grad);
            }
            else
            {
                return BadRequest($"Zahtevani grad ne postoji!");
            }
        }
    }

}
