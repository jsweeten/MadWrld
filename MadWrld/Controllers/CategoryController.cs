using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MadWrld.Models;
using MadWrld.Repositories;

namespace MadWrld.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(
        ICategoryRepository categoryRepository,
        IMLTemplateRepository mlTemplateRepository) : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IMLTemplateRepository _mlTemplateRepository = mlTemplateRepository;

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
