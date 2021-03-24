using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace ProjekatWeb.Models
{
    [Table("Polica")]
    public class Polica
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Oznaka")]
        [MaxLength(255)]
        public string Oznaka { get; set; }

        [Column("MaxBroj")]
        public int MaxBroj { get; set; }

        [Column("TrenutniBroj")]
        public int TrenutniBroj { get; set; }

        public virtual List<Knjiga> Knjige { get; set; }

        //pokazivac na klasu biblioteka

        [JsonIgnore]
        public Biblioteka Biblioteka{ get; set; }

    }
}