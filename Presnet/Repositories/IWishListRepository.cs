using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IWishListRepository
    {
        void AddGift(WishListItem gift);
        void DeleteGift(int id);
        WishListItem GetGiftById(int id);
        List<WishListItem> GetUserWishlist(int userId);
        void UpdateGift(WishListItem gift);
    }
}