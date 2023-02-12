using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MadWrld.Models;
using MadWrld.Repositories;
using System.Collections.Generic;
using System;


namespace MadWrld.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMLTemplateRepository _mlTemplateRepository;

        public CategoryController(
            ICategoryRepository categoryRepository,
            IMLTemplateRepository mlTemplateRepository)
        {
            _categoryRepository = categoryRepository;
            _mlTemplateRepository = mlTemplateRepository;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public IActionResult GetCategoryNames()
        {
            return Ok(_categoryRepository.GetCategoryNames());
        }
        
        // GET: api/<CategoryController>
        [HttpGet("categorytemplates/{id}")]
        public IActionResult GetCategoryTemplates(int id)
        {
            return Ok(_categoryRepository.GetCategoryTemplates(id));
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult GetTemplatesByCategoryId(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(CategoryTemplate categoryTemplate)
        {
            _categoryRepository.AddCategoryTemplate(categoryTemplate);
            return CreatedAtAction(
                nameof(GetCategoryTemplates),new { id = categoryTemplate.Id }, categoryTemplate);
        }


        // DELETE api/<TemplateController>/5
        [HttpDelete("categorytemplates")]
        public IActionResult Delete(CategoryTemplate categoryTemplate)
        {

            _categoryRepository.RemoveTemplateCategory(categoryTemplate);

            return NoContent();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
    }
}
