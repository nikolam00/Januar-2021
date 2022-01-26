using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Grad")]
    public class Grad
    {
        [Key]
        public int IDGrad {get; set;}

        [Required]
        [MaxLength(30)]
        public string Naziv {get; set;}

        [Required]
        [Range (0,90)]
        public float North {get; set;}

        [Required]
        [Range (0,90)]
        public float East {get; set;}
        public List<MetPodatak> Podaci {get; set;}

    }
}