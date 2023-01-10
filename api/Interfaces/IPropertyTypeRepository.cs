using AngularAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAPI.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypesAsync();
    }   
}
