using System.ComponentModel.DataAnnotations;

namespace AngularAPI.Models
{
    public class FurnishingType : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}