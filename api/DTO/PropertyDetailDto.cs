using System.Collections.Generic;
using System;
using AngularAPI.Models;

namespace AngularAPI.DTO
{
    public class PropertyDetailDto : PropertyListDto
    {
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int Bond { get; set; }
        public int Maintenance { get; set; }
        public string Description { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}