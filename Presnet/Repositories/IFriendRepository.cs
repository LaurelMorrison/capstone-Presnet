using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IFriendRepository
    {
        void AddFriend(Friend friend);
        void AddFriendStatus(FriendStatus friendStatus);
        List<Friend> GetAllFriends();
        List<Friend> GetAllPending(int id);
        List<Friend> GetAllRequested(int id);
        Friend GetFriendById(int id);
        void acceptFriend(int id);
        void RejectFriend(int id);
    }
}