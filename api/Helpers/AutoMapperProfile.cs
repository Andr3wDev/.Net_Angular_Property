using AngularAPI.DTO;
using AngularAPI.Models;
using AutoMapper;
using System.Linq;

namespace AngularAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<FurnishingType, KeyValuePairDto>();
            CreateMap<PropertyType, KeyValuePairDto>();
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto> ().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<Property, PropertyDto>().ReverseMap();

            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(d => d.Photo, opt => opt.MapFrom(src => src.Photos
                    .FirstOrDefault(p => p.IsPrimary).ImageUrl));

            CreateMap<Property, PropertyDetailDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));       
        }
    }
}