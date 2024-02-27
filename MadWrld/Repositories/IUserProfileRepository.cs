using MadWrld.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MadWrld.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        Task<UserProfile> GetByFirebaseUserIdAsync(string firebaseUserId);
        List<UserProfile> GetUsers();
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
        List<UserType> GetUserTypes();
        void Remove(int id);
    }
}