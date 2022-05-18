using AngularAPI.DTO;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace AngularAPI.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork iow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PropertyController(
            IUnitOfWork iow,
            IMapper mapper,
            IPhotoService photoService)
        {
            this.iow = iow;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        // property/list/1
        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPropertyList(int sellRent)
        {
            var properties = await iow.PropertyRepository
                .GetPropertiesAsync(sellRent);
            var propertyListDto = mapper
                .Map<IEnumerable<PropertyListDto>>(properties);

            return Ok(propertyListDto);
        }

        // property/detail/1
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPropertyDetail(int id)
        {
            var property = await iow.PropertyRepository
                .GetPropertyDetailAsync(id);

            var propertyDto = mapper
                .Map<PropertyDetailDto>(property);

            return Ok(propertyDto);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> CreateProperty(
            PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            var userId = getUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;

            iow.PropertyRepository.AddProperty(property);
            await iow.SaveAsync();

            return StatusCode(201); //CreatedAtRoute(201);
        }

        [HttpPost("add/photo/{propId}")]
        [Authorize]
        public async Task<IActionResult> AddPhoto(IFormFile image, int propId)
        {
            var result = await photoService.UploadPhotoAsync(image);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            var property = await iow.PropertyRepository
                .GetPropertyByIdAsync(propId);

            // Check if first photo in collection
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            property.Photos.Add(photo);
            await iow.SaveAsync();

            return StatusCode(201); //CreatedAtRoute(201);
        }

        // /property/set-primary-photo/1/abc123
        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int propId, string photoPublicId)
        {
            if (string.IsNullOrWhiteSpace(photoPublicId))
            {
                return BadRequest("Invalid photo Id");
            }

            var userId = getUserId();
            // Handle invalid userId

            var property = await iow.PropertyRepository.GetPropertyByIdAsync(propId);
            if (property == null)
            {
                return BadRequest("Invalid property");
            }

            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorised to make changes");
            }

            var photo = property.Photos
                .FirstOrDefault(p => p.PublicId == photoPublicId);
            if (photo == null)
            {
                return BadRequest("Invalid photo Id");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("Photo is already set as primary.");
            }

            var currentPrimary = property.Photos
                .FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null)
            {
                currentPrimary.IsPrimary = false;
            }
            photo.IsPrimary = true;

            if (await iow.SaveAsync())
            {
                return NoContent();
            }

            return BadRequest("An error occurred setting primary photo.");
        }

        // /property/delete-photo/1/abc123
        [HttpDelete("delete-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(
            int propId,
            string photoPublicId)
        {
            if (string.IsNullOrWhiteSpace(photoPublicId))
            {
                return BadRequest("Invalid photo Id");
            }

            var userId = getUserId();
            // Handle invalid userId

            var property = await iow.PropertyRepository.GetPropertyByIdAsync(propId);
            if (property == null)
            {
                return BadRequest("Invalid property");
            }

            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorised to delete this photo");
            }

            var photo = property.Photos
                .FirstOrDefault(p => p.PublicId == photoPublicId);
            if (photo == null)
            {
                return BadRequest("Invalid photo Id");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("Unable to delete primary photo.");
            }

            var deleteFromCloud = await photoService
                .DeletePhotoAsync(photoPublicId);

            if(deleteFromCloud.Error != null)
            { 
                return BadRequest(deleteFromCloud.Error.Message); 
            }

            property.Photos.Remove(photo);

            if (await iow.SaveAsync())
            {
                return Ok();
            }

            return BadRequest("An error occurred deleting photo.");
        }
    }
}
