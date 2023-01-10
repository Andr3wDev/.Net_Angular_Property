using System.Collections.Generic;
using System.Threading.Tasks;
using AngularAPI.Data;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularAPI.Repository
{
    public class FurnishingTypeRepository : IFurnishingTypeRepository
    {
        private readonly DataContext dc;

        public FurnishingTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}
