using System;

namespace AngularAPI.DTO
{
    public class PropertyDto
    {
        public int SellRent { get; set; }
        public string Name { get; set; }
        public int PropertyTypeId { get; set; }
        public int FurnishingTypeId { get; set; }
        public int Price { get; set; }
        public int Bedrooms { get; set; }
        public int LandArea { get; set; }
        public int CityId { get; set; }
        public bool ReadyToMove { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int Bond { get; set; } = 0;
        public int Maintenance { get; set; } = 0;
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; } = 0;
        public string Description { get; set; }
    }
}
