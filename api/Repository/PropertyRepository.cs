using AngularAPI.Data;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace AngularAPI.Repository
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext context;

        public PropertyRepository(DataContext context)
        {
            this.context = context;
        }

        public void AddProperty(Property property)
        {
            context.Properties.Add(property);
        }

        public void DeleteProperty(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            return await context.Properties
                .Include(p => p.PropertyType)
                .Include(p => p.City)
                .Include(p => p.FurnishingType)
                .Include(p => p.Photos)
                .Where(p => p.Id == id)
                .FirstAsync();
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            return await context.Properties
                .Include(p => p.Photos)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            var properties = new List<Property>();

            if (sellRent <= 0)
            {
                return properties;
            }

            if (context.Properties.Any())
            {
                properties = await context.Properties
                     .Include(p => p.City)
                     .Include(p => p.FurnishingType)
                     .Include(p => p.Photos)
                     .Include(p => p.PropertyType)
                     .Where(p => p.SellRent == sellRent)
                     .ToListAsync();
            }

            return properties;
        }
    }
}
