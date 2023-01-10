using AngularAPI.Data;
using AngularAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AngularAPI.DTO;
using System.Threading.Tasks;
using AngularAPI.Models;
using System;
using AutoMapper;
using System.Collections.Generic;

namespace AngularAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork _iuow;

        private readonly IMapper _mapper;

        public CityController(IUnitOfWork iuow, IMapper mapper)
        {
            _iuow = iuow;
            _mapper = mapper;
        }

        [HttpGet("cities")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _iuow.CityRepository.GetCities();
            var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);
            
            return Ok(citiesDto);
        }

        // api/city/post (JSON Format)
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            _iuow.CityRepository.AddCity(city);

            await _iuow.SaveAsync();
            return StatusCode(201);
        }

        // api/city/add?cityName=
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await _iuow.CityRepository.FindCity(id);

            if (cityFromDb == null)
            {
                return BadRequest("Error, update not permitted");
            }

            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            _mapper.Map(cityDto, cityFromDb);
           
            await _iuow.SaveAsync();
            return StatusCode(201);
        }

        // api/city/add?cityName=
        [HttpDelete("delete/{id} ")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _iuow.CityRepository.DeleteCity(id);
            await _iuow.SaveAsync();

            return Ok();
        }
    }
}
