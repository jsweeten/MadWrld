using MadWrld.Models;
using MadWrld.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MadWrld.Tests.Mocks
{
    class InMemoryMadLibRepository : IMadLibRepository
    {
        private readonly List<MadLib> _data;

        public List<MadLib> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryMadLibRepository(List<MadLib> startingData)
        {
            _data = startingData;
        }
        public List<MadLib> GetAll()
        {
            return _data;
        }
        public List<MadLib> GetByUserId(int id)
        {
            throw new NotImplementedException();
        }
        public MadLib GetById(int id)
        {
            throw new NotImplementedException();
        }
        public void Add(MadLib MadLib)
        {
            throw new NotImplementedException();
        }
        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}
