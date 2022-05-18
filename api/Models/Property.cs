using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAPI.Models
{
    public class Property : BaseEntity
    {
        public int SellRent { get; set; }
        public string Name { get; set; }
        public int Bedrooms { get; set; }

        // Property
        public int PropertyTypeId { get; set; }
        public PropertyType PropertyType { get; set; }

        // FurnishingType
        public int FurnishingTypeId { get; set; }
        public FurnishingType FurnishingType { get; set; }

        public int Price { get; set; }
        public int LandArea { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        // City
        public int CityId { get; set; }
        public City City { get; set; }

        public bool ReadyToMove { get; set; }
        public int Bond { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
        public DateTime PostedOn { get; set; } = DateTime.Now;
        public ICollection<Photo> Photos { get; set; }

        // User
        [ForeignKey("User")]
        public int PostedBy { get; set; }
        public User User { get; set; }        
    }
}
