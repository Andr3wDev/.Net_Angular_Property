using AngularAPI.DTO;
using AngularAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCities();
        void AddCity(City city);
        void DeleteCity(int id);

        Task<City> FindCity(int id);
    }
}
