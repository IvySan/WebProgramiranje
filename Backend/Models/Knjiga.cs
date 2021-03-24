using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace ProjekatWeb.Models
{
    [Table("Knjiga")]
    public class Knjiga
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Autor")]
        [MaxLength(255)]
        public string Autor { get; set; }

        [Column("BrojStrana")]
        public int BrojStrana { get; set; }

        //pokazivac na klasu polica
        [JsonIgnore]
        public Polica Polica{ get; set; }
    }
}