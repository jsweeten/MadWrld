using MadWrld.Models;
using System.Collections.Generic;

namespace MadWrld.Repositories
{
    public interface IMadLibRepository
    {
        List<MadLib> GetAll();
        List<MadLib> GetByUserId(int id);
        MadLib GetById(int id);
        void Add(MadLib MadLib);
        void Remove(int id);
    }
}