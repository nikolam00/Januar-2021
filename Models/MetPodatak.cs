using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    public class MetPodatak
    {
        [Key]
        public int IDPodatak {get; set;}

        [Required]
        [Range (-50,50)]
        public double Temperatura {get; set;}

        [Required]
        [Range(0,2000)]
        public double Padavine {get; set;}

        [Required]
        [Range(0,31)]
        public int Dani {get; set;}

        [Required]
        public string Mesec {get; set;}

        public Grad grad{get; set;}
    }
}