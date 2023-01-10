using AngularAPI.Data;
using AngularAPI.DTO;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAPI.Repository
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _dc;
        public CityRepository(DataContext dc)
        {
            _dc = dc;
        }

        public void AddCity(City city)
        {
            _dc.Cities.Add(city);
        }

        public void DeleteCity(int id)
        {
            var city = _dc.Cities.Find(id);
            _dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
            return await _dc.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCities()
        {
            return await _dc.Cities.ToListAsync();
        }
    }
}
