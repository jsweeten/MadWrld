using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MadWrld.Models;
using MadWrld.Repositories;
using Microsoft.AspNetCore.Http;
using MadWrld.Utils;

namespace MadWrld.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController(IMLTemplateRepository mlTemplateRepository,
        IMadLibRepository madlibRepository,
        IMLAnswerTemplateRepository mlAnswerTemplateRepository,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly UserProfile _currentUser = httpContextAccessor.HttpContext.Items["CurrentUser"] as UserProfile;
        private readonly IMLTemplateRepository _mlTemplateRepository = mlTemplateRepository;
        private readonly IMLAnswerTemplateRepository _mlAnswerTemplateRepository = mlAnswerTemplateRepository;
        private readonly IMadLibRepository _madlibRepository = madlibRepository;
        
        // GET: api/<TemplateController>
        [HttpGet("user")]
        public IActionResult GetTemplatesByUser()
        {
            return Ok(_mlTemplateRepository.GetByUserId(_currentUser.Id));
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
            if (_currentUser.UserTypeId == 1 || _currentUser.Id != template.UserId)
            {
                return Unauthorized();
            }

            template.UserId = _currentUser.Id; 
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

            completedMadLib.UserProfileId = _currentUser.Id;
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
    }
}
