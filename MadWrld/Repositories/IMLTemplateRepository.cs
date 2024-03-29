﻿using MadWrld.Models;
using System.Collections.Generic;

namespace MadWrld.Repositories
{
    public interface IMLTemplateRepository
    {
        MLTemplate GetById(int id);
        List<MLTemplate> GetByUserId(int id);
        void Add(MLTemplate template);
        void Update(MLTemplate template);
        void Remove(int id);
    }
}
