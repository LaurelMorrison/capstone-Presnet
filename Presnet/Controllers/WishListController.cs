using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presnet.models;
using Presnet.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Presnet.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly IWishListRepository _wishListRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public WishListController(IWishListRepository WishListRepository, IUserProfileRepository UserProfileRepository)
        {
            _wishListRepository = WishListRepository;
            _userProfileRepository = UserProfileRepository;
        }


        [HttpGet("wishlist")]
        public IActionResult GetUsersWishList()
        {
            int currentUserProfileId = GetCurrentUserProfileId();
            var gifts = _wishListRepository.GetUserWishlist(currentUserProfileId);
            if (gifts == null)
            {
                return NotFound();
            }
            return Ok(gifts);
        }        

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var gift = _wishListRepository.GetGiftById(id);
            if (gift == null)
            {
                return NotFound();
            }
            return Ok(gift);
        }

        [HttpPost]
        public IActionResult AddGift(WishListItem gift)
        {
            var currentUserProfile = GetCurrentUserProfile();
            gift.userId = currentUserProfile.id;

            _wishListRepository.AddGift(gift);
            return CreatedAtAction(nameof(GetUsersWishList), new { id = gift.id }, gift);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, WishListItem gift)
        {
            if (id != gift.id)
            {
                return BadRequest();
            }
            _wishListRepository.UpdateGift(gift);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _wishListRepository.DeleteGift(id);
            return NoContent();
        }

        private int GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return userProfile.id;
        }

        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
