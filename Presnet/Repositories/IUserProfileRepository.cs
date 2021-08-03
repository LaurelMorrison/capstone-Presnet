using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllUsers();
        List<UserProfile> GetAllFriends(int id);
        List<UserProfile> GetAllNonFriend(int id);
        UserProfile GetUserById(int id);
        void Update(UserProfile userProfile);
        List<UserProfile> Search(string criterion, int id);
    }
}