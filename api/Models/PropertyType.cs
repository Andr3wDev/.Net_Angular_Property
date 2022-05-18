using System.ComponentModel.DataAnnotations;

namespace AngularAPI.Models
{
    public class PropertyType : BaseEntity
    {
        [Required]
        public string Name {  get; set; }
    }
}