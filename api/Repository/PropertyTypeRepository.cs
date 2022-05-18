using System.Collections.Generic;
using System.Threading.Tasks;
using AngularAPI.Data;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularAPI.Repository
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dc;

        public PropertyTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await dc.PropertyTypes.ToListAsync();
        }
    }
}
