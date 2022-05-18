using AngularAPI.Models;
using System.Threading.Tasks;

namespace AngularAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);
        void Register(string username, string password);
        Task<bool> UserExists(string username);
    }
}