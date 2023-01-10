using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BaseController : ControllerBase
    {
        protected int getUserId()
        {
            return int.Parse(User.FindFirst(
                ClaimTypes.NameIdentifier).Value);
        }
    }
}