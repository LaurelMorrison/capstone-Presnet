using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
    public class FriendController : ControllerBase
    {
        private readonly IFriendRepository _friendRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FriendController(IFriendRepository FriendRepository, IUserProfileRepository UserProfileRepository)
        {
            _friendRepository = FriendRepository;
            _userProfileRepository = UserProfileRepository;
        }


        [HttpGet("pending")]
        public IActionResult GetPending()
        {
            var user = GetCurrentUserProfile();

            var friends = _friendRepository.GetAllPending(user.id);
            if (friends == null)
            {
                return NotFound();
            }
            return Ok(friends);
        }


        [HttpGet("getbyid/{friendId}")]
        public IActionResult GetFriendById(int friendId)
        {
            var friend = _friendRepository.GetFriendById(friendId);
            if (friend == null)
            {
                return NotFound();
            }
            return Ok(friend);
        }

        [HttpPost("{friendId}")]
        public IActionResult addFriend(int friendId)
        {
            var currentUserProfile = GetCurrentUserProfile();
            Friend friend = new Friend();
            friend.userId = currentUserProfile.id;
            friend.friendId = friendId; 

            Friend returnedFriend = _friendRepository.AddFriend(friend);
            return Ok(returnedFriend.id);
        }

        // Accept Friend
        [HttpPut("accept/{id}")]
        public IActionResult AcceptFriendRequest(int id)
        {
            _friendRepository.acceptFriend(id);
            return NoContent();
        }

        // Reject Friend
        [HttpPut("reject/{id}")]
        public IActionResult RejectFriendRequest(int id)
        {
            _friendRepository.RejectFriend(id);
            return NoContent();
        }

        [HttpDelete("{friendId}")]
        public IActionResult Delete(int friendId)
        {
            var currentUser = GetCurrentUserProfile();


            _friendRepository.DeleteFriend(currentUser.id, friendId);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
