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
    // [Authorize]
    public class TemplateController : ControllerBase
    {
        private readonly IMLTemplateRepository _mlTemplateRepository;
        public TemplateController(IMLTemplateRepository mlTemplateRepository)
        {
            _mlTemplateRepository = mlTemplateRepository;
        }
        // GET: api/<TemplateController>
        [HttpGet]
        public IActionResult GetAllTemplates()
        {
            return Ok(_mlTemplateRepository.GetAll());
        }

        // GET api/<TemplateController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_mlTemplateRepository.GetById(id));
        }

        // POST api/<TemplateController>
        [HttpPost]
        public IActionResult Post(MLTemplate template)
        {
            _mlTemplateRepository.Add(template);
            return CreatedAtAction(
            nameof(Get), template);
        }

        // PUT api/<TemplateController>/5
        [HttpPut("{id}")]
        public IActionResult Edit(int id,MLTemplate template)
        {
            if (id != template.Id)
            {
                return BadRequest();
            }

            _mlTemplateRepository.Update(template);
            return NoContent();
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
