using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MadWrld.Models;
using MadWrld.Repositories;
using Microsoft.AspNetCore.Http;

namespace MadWrld.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MadLibController(IMadLibRepository madlibRepository, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly IMadLibRepository _madlibRepository = madlibRepository;
        private readonly UserProfile _currentUser = httpContextAccessor.HttpContext.Items["CurrentUser"] as UserProfile;

        // GET: api/<MadLibController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_madlibRepository.GetAll());
        }

        // GET api/<MadLibController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var madlib = _madlibRepository.GetById(id);
            if (madlib == null)
            {
                return NotFound();
            }
            return Ok(madlib);
        }

        // GET api/madlib/userposts
        [HttpGet("userposts")]
        public IActionResult GetByUserId()
        {
            return Ok(_madlibRepository.GetByUserId(_currentUser.Id));
        }

        // DELETE api/<MadLibController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _madlibRepository.Remove(id);

            return NoContent();
        }
    }
}
