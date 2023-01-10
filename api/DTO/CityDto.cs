

using System.ComponentModel.DataAnnotations;

namespace AngularAPI.DTO
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
