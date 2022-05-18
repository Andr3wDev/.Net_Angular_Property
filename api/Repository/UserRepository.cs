using AngularAPI.Data;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace AngularAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dc;

        public UserRepository(DataContext dc)
        {
            this._dc = dc;
        }

        public async Task<User> Authenticate(string username, string passwordText)
        {
            var user = await _dc.Users.FirstOrDefaultAsync(
                x => x.Username == username); 

            if(user == null || user.PasswordKey == null)
            {
                return null;
            }

            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
            {
                return null;
            }

            return user;
        }

        private bool MatchPasswordHash(
            string passwordText,
            byte[] password,
            byte[] passwordKey)
        {

            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes(passwordText));

                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (password[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        public void Register(string username, string password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User
            {
                Username = username,
                Password = passwordHash,
                PasswordKey = passwordKey
            };

            _dc.Users.Add(user);
        }

        public async Task<bool> UserExists(string username)
        {
            return await _dc.Users.AnyAsync(x => x.Username == username);
        }
    }
}