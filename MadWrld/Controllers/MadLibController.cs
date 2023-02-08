using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MadWrld.Models;
using MadWrld.Repositories;
using System;
using System.Security.Permissions;

namespace MadWrld.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MadLibController : ControllerBase
    {
        private readonly IMadLibRepository _madlibRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public MadLibController(IMadLibRepository madlibRepository,
            IUserProfileRepository userProfileRepository)
        {
            _madlibRepository = madlibRepository;
            _userProfileRepository = userProfileRepository;
        }

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
            var currentUser = GetCurrentUserProfile();
            return Ok(_madlibRepository.GetByUserId(currentUser.Id));
        }

        // DELETE api/<MadLibController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _madlibRepository.Remove(id);

            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
