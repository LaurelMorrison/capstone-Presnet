using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllUsers();
        public List<UserProfile> GetAllNonFriend();
        UserProfile GetUserById(int id);
    }
}