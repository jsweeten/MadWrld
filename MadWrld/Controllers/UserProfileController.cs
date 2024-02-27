using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MadWrld.Models;
using MadWrld.Repositories;
using Microsoft.AspNetCore.Http;

namespace MadWrld.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController(IUserProfileRepository userProfileRepository, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository = userProfileRepository;
        private readonly UserProfile _currentUser = httpContextAccessor.HttpContext.Items["CurrentUser"] as UserProfile;

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserIdAsync(firebaseUserId));
        }
        
        [HttpGet("usertype")]
        public IActionResult GetUserTypes()
        {
            return Ok(_userProfileRepository.GetUserTypes());
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            if (_currentUser.UserTypeId == 1)
            {
                return Ok(_userProfileRepository.GetUsers());
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            
            if (userProfile == null)
            {
                return NotFound();
            }

            if (_currentUser.UserTypeId == 1 || _currentUser.Id == userProfile.Id)
            {
                return Ok(userProfile);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.UserTypeId = 2;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(UserProfile userProfile)
        {
            if (userProfile.Id == _currentUser.Id || _currentUser.UserTypeId == 1)
            {
                _userProfileRepository.Update(userProfile);
                return NoContent();
            }

            return BadRequest();
        }

        // DELETE api/<UserProfileController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Remove(id);
            return NoContent();
        }
    }
}