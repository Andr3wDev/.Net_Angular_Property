using AngularAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAPI.Interfaces
{
    public interface IFurnishingTypeRepository
    {
        Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync();
    }
}
