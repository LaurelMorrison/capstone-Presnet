using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presnet.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothingSizeController : ControllerBase
    {
        private readonly IClothingSizeRepository _clothingSizeRepository;
        public ClothingSizeController(IClothingSizeRepository ClothingSizeRepository)
        {
            _clothingSizeRepository = ClothingSizeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_clothingSizeRepository.GetAllSizes());
        }


        [HttpGet("{id}")]
        public IActionResult GetSizeById(int id)
        {
            var size = _clothingSizeRepository.GetSizeById(id);
            if (size == null)
            {
                return NotFound();
            }
            return Ok(size);
        }
    }
}
