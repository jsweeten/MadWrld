using MadWrld.Models;
using System.Collections.Generic;

namespace MadWrld.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        List<Category> GetCategoryNames();
        Category GetById(int id);
        void AddCategoryTemplate(CategoryTemplate categoryTemplate);
        List<CategoryTemplate> GetCategoryTemplates();
    }
}
