
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjekatWeb.Models
{
    [Table("Biblioteka")]
    public class Biblioteka
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        [Column("BrojPolica")]
        public int  BrojPolica { get; set; }
        
        public virtual List<Polica> Police { get; set; }

    }
} 