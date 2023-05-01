﻿using System;
using System.Collections.Generic;
using System.Linq;
using MadWrld.Models;
using MadWrld.Repositories;

namespace MadWrld.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }
        public void Add(UserProfile user)
        {
            var lastUser = _data.Last();
            user.Id = lastUser.Id + 1;
            _data.Add(user);
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            throw new NotImplementedException();
        }
        public List<UserProfile> GetUsers()
        {
            return _data;
        }
        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(t => t.Id == id);
        }

        public void Update(UserProfile user)
        {
            var currentUser = _data.FirstOrDefault(t => t.Id == user.Id);
            if (currentUser == null)
            {
                return;
            }

            currentUser.FirstName = user.FirstName;
            currentUser.LastName = user.LastName;
        }
        public List<UserType> GetUserTypes()
        {
            throw new NotImplementedException();
        }
        public void Remove(int id)
        {
            var userToDelete = _data.FirstOrDefault(t => t.Id == id);
            if (userToDelete == null)
            {
                return;
            }

            _data.Remove(userToDelete);
        }
    }
}