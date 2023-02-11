using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MadWrld.Models;
using MadWrld.Utils;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace MadWrld.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.[Id] 'CategoryPK', c.[Name] 'Category Name',
                                               ct.CategoryId 'CTCategoryId', ct.TemplateId 'CTTemplateId',
                                               t.[Id] 'TemplatePK', t.[Title]
                                        FROM Category c
                                        LEFT JOIN CategoryTemplate ct ON c.[Id] = ct.CategoryId
                                        LEFT JOIN MLTemplate t ON ct.TemplateId = t.[Id]
                                        ORDER BY c.[Id]";

                    using (SqlDataReader reader= cmd.ExecuteReader())
                    {
                        var categories = new List<Category>();
                        while (reader.Read())
                        {
                            var categoryId = DbUtils.GetInt(reader, "CategoryPK");

                            var existingCategory = categories.FirstOrDefault(c => c.Id == categoryId);
                            if (existingCategory == null)
                            {
                                existingCategory = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryPK"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Templates = new List<MLTemplate>()
                                };
                                categories.Add(existingCategory);
                            }

                            if (DbUtils.IsNotDbNull(reader, "TemplatePK"))
                            {
                                existingCategory.Templates.Add(new MLTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "TemplatePK"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                });
                            }
                        }
                        return categories;
                    }
                }
            }
        }
        public List<Category> GetCategoryNames()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.[Id], c.[Name]
                                        FROM Category c";

                    using (SqlDataReader reader= cmd.ExecuteReader())
                    {
                        var categories = new List<Category>();
                        while (reader.Read())
                        {
                            var categoryId = DbUtils.GetInt(reader, "Id");

                            var existingCategory = categories.FirstOrDefault(c => c.Id == categoryId);
                            if (existingCategory == null)
                            {
                                existingCategory = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                };
                                categories.Add(existingCategory);
                            }
                        }
                        return categories;
                    }
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                           c.[Id] 'CategoryPK', c.[Name] 'CategoryName',
                           ct.CategoryId 'CTCategoryId', ct.TemplateId 'CTTemplateId',
                           t.[Id] 'TemplatePK', t.[Title], t.UserId,
                           up.[Id] 'UserPK', up.FirstName
                           FROM Category c
                           JOIN CategoryTemplate ct ON c.[Id] = ct.CategoryId
                           JOIN MLTemplate t ON ct.TemplateId = t.[Id]
                           LEFT JOIN UserProfile up ON t.UserId = up.[Id]
                           WHERE c.[Id] = @id";

                    DbUtils.AddParameter(cmd, "@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Category category = null;
                        while (reader.Read())
                        {
                            if (category == null)
                            {
                                category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryPK"),
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                    Templates = new List<MLTemplate>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "TemplatePK"))
                            {
                                category.Templates.Add(new MLTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "TemplatePK"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    UserId= DbUtils.GetInt(reader, "UserId"),
                                    User = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserPk"),
                                        FirstName = DbUtils.GetString(reader, "FirstName")
                                    }
                                });
                            }
                        }
                        return category;
                    }
                }
            }
        }
        public void AddCategoryTemplate(CategoryTemplate categoryTemplate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO CategoryTemplate (CategoryId, TemplateId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@CategoryId, @TemplateId)";
                    DbUtils.AddParameter(cmd, "@CategoryId", categoryTemplate.CategoryId);
                    DbUtils.AddParameter(cmd, "@TemplateId", categoryTemplate.TemplateId);

                    categoryTemplate.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        
        public List<CategoryTemplate> GetCategoryTemplates(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ct.[Id] 'CategoryTemplatePK', ct.TemplateId, ct.CategoryId,
                                        c.[Id] 'CategoryPK', c.[Name]
                                        FROM CategoryTemplate ct
                                        LEFT JOIN Category c ON ct.CategoryId = c.[Id]
                                        WHERE ct.TemplateId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var categoryTemplates = new List<CategoryTemplate>();
                        while (reader.Read())
                        {
                            var categoryTemplateId = DbUtils.GetInt(reader, "CategoryTemplatePK");

                            var existingCategoryTemplate = categoryTemplates.FirstOrDefault(ct => ct.Id == categoryTemplateId);
                            if (existingCategoryTemplate == null)
                            {
                                existingCategoryTemplate = new CategoryTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryTemplatePK"),
                                    TemplateId = DbUtils.GetInt(reader, "TemplateId"),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    CategoryName = new Category()
                                    {
                                        Name = DbUtils.GetString(reader, "Name")
                                    }
                                };
                                categoryTemplates.Add(existingCategoryTemplate);
                            }
                        }
                        return categoryTemplates;
                    }
                }
            }
        }

        public void RemoveTemplateCategory(CategoryTemplate ct)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM CategoryTemplate
                                        WHERE TemplateId = @tempId
                                        AND CategoryId = @catId";
                    DbUtils.AddParameter(cmd, "@tempId", ct.TemplateId);
                    DbUtils.AddParameter(cmd, "@catId", ct.CategoryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
