using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IFriendRepository
    {
        void acceptFriend(int id);
        void CreateComment(Friend friend);
        List<Friend> GetAllFriends();
        List<Friend> GetAllPending(int id);
        List<Friend> GetAllRequested(int id);
        Friend GetFriendById(int id);
        void RejectFriend(int id);
        void requestFriend(int id);
    }
}