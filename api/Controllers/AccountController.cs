using AngularAPI.DTO;
using AngularAPI.Errors;
using AngularAPI.Extensions;
using AngularAPI.Interfaces;
using AngularAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AngularAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _iuow;
        private readonly IConfiguration _config;

        public AccountController(IUnitOfWork iuow, IConfiguration config)
        {
            _iuow = iuow;
            _config = config;
        }

        // api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginDto)
        {
            ApiError apiError = new ApiError();

            var user = await _iuow.UserRepository.Authenticate(
                loginDto.UserName,
                loginDto.Password);            

            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorDetails = "When userid or password dont exist";
                apiError.ErrorMessage = "Invalid username or password";

                return Unauthorized(apiError);
            }

            var loginResDto = new LoginResponseDto
            {
                UserName = loginDto.UserName,
                Token = CreateJWT(user)
            };

            return Ok(loginResDto);
        }

        public string CreateJWT(User user)
        {
            var secretKey = _config.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }

        // api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginRequestDto loginDto)
        {
            ApiError apiError = new ApiError();

            if (loginDto.UserName.IsEmpty() || loginDto.Password.IsEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Username and Password cannot be empty";
                return BadRequest(apiError);
            }

            if (await _iuow.UserRepository.UserExists(loginDto.UserName))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exists";
                return BadRequest(apiError);
            }

            try
            {
                _iuow.UserRepository.Register(
                    loginDto.UserName,
                    loginDto.Password);

                await _iuow.SaveAsync();

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}