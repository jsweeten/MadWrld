using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MadWrld.Models;
using MadWrld.Repositories;
using System.Collections.Generic;
using System;

namespace MadWrld.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly IMLTemplateRepository _mlTemplateRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMadLibRepository _madlibRepository;
        private readonly IMLAnswerTemplateRepository _mlAnswerTemplateRepository;
        public TemplateController(
            IMLTemplateRepository mlTemplateRepository,
            IUserProfileRepository userProfileRepository,
            IMadLibRepository madlibRepository,
            IMLAnswerTemplateRepository mlAnswerTemplateRepository)
        {
            _mlTemplateRepository = mlTemplateRepository;
            _userProfileRepository = userProfileRepository;
            _madlibRepository = madlibRepository;
            _mlAnswerTemplateRepository = mlAnswerTemplateRepository;
        }
        
        // GET: api/<TemplateController>
        [HttpGet("user")]
        public IActionResult GetTemplatesByUser()
        {
            var currentUser = GetCurrentUserProfile();

            return Ok(_mlTemplateRepository.GetByUserId(currentUser.Id));
        }

        // GET api/<TemplateController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var template = _mlTemplateRepository.GetById(id);
            if (template == null)
            {
                return NotFound();
            }
            return Ok(template);
        }

        // POST api/<TemplateController>
        [HttpPost]
        public IActionResult PostTemplate(MLTemplate template)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "Admin")
            {
                return Unauthorized();
            }

            template.UserId = currentUserProfile.Id; 
            _mlTemplateRepository.Add(template);
            return CreatedAtAction(
            nameof(Get), new { id = template.Id }, template);
        }
        
        // POST api/<TemplateController>
        [HttpPost("answertemplate")]
        public IActionResult PostAnswerTemplate(MLAnswerTemplate sentence)
        {
            _mlAnswerTemplateRepository.Add(sentence);
            return CreatedAtAction(
            nameof(Get), new { id = sentence.Id }, sentence);
        }
        
        // POST api/<TemplateController>
        [HttpPost("madlibform/{templateid}")]
        public IActionResult PostMadLib(List<string> inputs, int templateId)
        {
            var currentUserProfile = GetCurrentUserProfile();

            var currentTemplate = _mlTemplateRepository.GetById(templateId);
            
            var completedMadLib = new MadLib();

            try
            {
                for (var i = 0; i < 10; i++)
                {
                    string newSentence = currentTemplate.AnswerTemplates[i].Content.Replace("@input", inputs[i]);
                    completedMadLib.Story += newSentence;
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            completedMadLib.UserProfileId = currentUserProfile.Id;
            completedMadLib.TemplateId = currentTemplate.Id;
            _madlibRepository.Add(completedMadLib);
            return CreatedAtAction(
            nameof(Get), new { id = completedMadLib.Id }, completedMadLib);
        }

        // PUT api/<TemplateController>/5
        [HttpPut("{id}")]
        public IActionResult EditTemplate(MLTemplate template)
        {
            try
            {
                _mlTemplateRepository.Update(template);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT api/<TemplateController>/answertemplate/5
        [HttpPut("answertemplate/{id}")]
        public IActionResult EditAnswerTemplate(MLAnswerTemplate sentence)
        {
            try
            {
                _mlAnswerTemplateRepository.Update(sentence);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE api/<TemplateController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mlTemplateRepository.Remove(id);

            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
