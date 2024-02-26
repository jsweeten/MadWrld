using System;
using System.Collections.Generic;
using System.Linq;
using MadWrld.Models;
using MadWrld.Repositories;

namespace MadWrld.Tests.Mocks
{
    class InMemoryTemplateRepository(List<MLTemplate> startingData) : IMLTemplateRepository
    {
        private readonly List<MLTemplate> _data = startingData;

        public List<MLTemplate> InternalData
        {
            get
            {
                return _data;
            }
        }

        public void Add(MLTemplate template)
        {
            var lastTemplate = _data.Last();
            template.Id = lastTemplate.Id + 1;
            _data.Add(template);
        }

        public void Remove(int id)
        {
            var templateToDelete = _data.FirstOrDefault(t => t.Id == id);
            if (templateToDelete == null)
            {
                return;
            }
            
            _data.Remove(templateToDelete);
        }

        public MLTemplate GetById(int id)
        {
            return _data.FirstOrDefault(t => t.Id == id);
        }

        public void Update(MLTemplate template)
        {
            var currentTemplate = _data.FirstOrDefault(t => t.Id == template.Id);
            if (currentTemplate == null)
            {
                return;
            }

            currentTemplate.Title = template.Title;
            currentTemplate.UserId = template.UserId;
        }

        public List<MLTemplate> GetByUserId(int id)
        {
            throw new NotImplementedException();
        }
    }
}
