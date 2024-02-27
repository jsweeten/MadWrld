using System;
using System.Collections.Generic;
using System.Linq;
using MadWrld.Models;
using MadWrld.Repositories;
using System.Threading.Tasks;

namespace MadWrld.Tests.Mocks
{
    class InMemoryUserProfileRepository(List<UserProfile> startingData) : IUserProfileRepository
    {
        private readonly List<UserProfile> _data = startingData;

        internal List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }

        public void Add(UserProfile user)
        {
            var lastUser = _data.Last();
            user.Id = lastUser.Id + 1;
            _data.Add(user);
        }
        public async Task<UserProfile> GetByFirebaseUserIdAsync(string firebaseUserId)
        {
            var user = await Task.Run(() => _data.FirstOrDefault(u => u.FirebaseUserId == firebaseUserId));
            return user;
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
