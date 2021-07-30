using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IFriendRepository
    {
        void AddFriend(Friend friend);        
        List<Friend> GetAllPending(int id);
        List<Friend> GetAllRequested(int id);
        Friend GetFriendById(int friendId);
        void acceptFriend(int id);
        void RejectFriend(int id);
        void DeleteFriend(Friend friend);
    }
}