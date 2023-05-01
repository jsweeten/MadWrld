using MadWrld.Models;
using MadWrld.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MadWrld.Tests.Mocks
{
    class InMemoryAnswerTemplateRepository : IMLAnswerTemplateRepository
    {
        private readonly List<MLAnswerTemplate> _data;

        public List<MLAnswerTemplate> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryAnswerTemplateRepository(List<MLAnswerTemplate> startingData)
        {
            _data = startingData;
        }

        public void Add(MLAnswerTemplate sentence)
        {
            var lastAnswerTemplate = _data.Last();
            sentence.Id = lastAnswerTemplate.Id + 1;
            _data.Add(sentence);
        }

        public void Update(MLAnswerTemplate sentence)
        {
            var currentAnswerTemplate = _data.FirstOrDefault(t => t.Id == sentence.Id);
            if (currentAnswerTemplate == null)
            {
                return;
            }

            currentAnswerTemplate.PartOfSpeech = sentence.PartOfSpeech;
            currentAnswerTemplate.Content = sentence.Content;
            currentAnswerTemplate.Id = sentence.Id;
        }
    }
}
