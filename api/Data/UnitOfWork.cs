using AngularAPI.Interfaces;
using AngularAPI.Repository;
using System.Threading.Tasks;

namespace AngularAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _dc;

        public UnitOfWork(DataContext dc)
        {
            _dc = dc;
        }

        public ICityRepository CityRepository => new CityRepository(_dc);
        public IUserRepository UserRepository => new UserRepository(_dc);
        public IPropertyRepository PropertyRepository => new PropertyRepository(_dc);
        public IPropertyTypeRepository PropertyTypeRepository => new PropertyTypeRepository(_dc);
        public IFurnishingTypeRepository FurnishingTypeRepository => new FurnishingTypeRepository(_dc);

        public async Task<bool> SaveAsync()
        {
            return await _dc.SaveChangesAsync() > 0;   
        }
    }
}
