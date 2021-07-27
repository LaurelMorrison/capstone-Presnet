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
        public IActionResult GetPending(int id)
        {
            var friends = _friendRepository.GetAllPending(id);
            if (friends == null)
            {
                return NotFound();
            }
            return Ok(friends);
        }

        [HttpGet("requested")]
        public IActionResult GetRequested(int id)
        {
            var friends = _friendRepository.GetAllRequested(id);
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

        //[HttpPost]
        //public IActionResult addFriend(Friend friend)
        //{
        //    var currentUserProfile = GetCurrentUserProfile();
        //    friend.userId = currentUserProfile.id;
        //    friend.statusId = 3;

        //    _friendRepository.AddFriend(friend);
        //    return CreatedAtAction(nameof(GetAll), new { id = friend.id }, friend);
        //}

        // Accept Friend
        [HttpPut("accept/{id}")]
        public IActionResult AcceptFriendRequest(int id, Friend friend)
        {
            if (id != friend.id)
            {
                return BadRequest();
            }
            _friendRepository.acceptFriend(id);
            return NoContent();
        }

        // Accept Friend
        [HttpPut("reject/{id}")]
        public IActionResult RejectFriendRequest(int id, Friend friend)
        {
            if (id != friend.id)
            {
                return BadRequest();
            }
            _friendRepository.RejectFriend(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
