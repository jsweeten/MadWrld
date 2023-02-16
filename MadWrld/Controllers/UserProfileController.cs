using MadWrld.Models;
using MadWrld.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace MadWrld.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }
        
        [HttpGet("usertype")]
        public IActionResult GetUserTypes()
        {
            return Ok(_userProfileRepository.GetUserTypes());
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile == null)
            {
                return NotFound();
            }

            return Ok(currentUserProfile);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserType.Name == "Admin")
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
            var currentUserProfile = GetCurrentUserProfile();
            var userProfile = _userProfileRepository.GetById(id);
            
            if (userProfile == null)
            {
                return NotFound();
            }

            if (currentUserProfile.UserType.Name == "Admin" || currentUserProfile.Id == userProfile.Id)
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
            var currentUserProfile = GetCurrentUserProfile();

            if (userProfile.Id == currentUserProfile.Id || currentUserProfile.UserTypeId == 1)
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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}