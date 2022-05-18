
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAPI.Models
{
    public class City : BaseEntity
    {
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }
    }
}
