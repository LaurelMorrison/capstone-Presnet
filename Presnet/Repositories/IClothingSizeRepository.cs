using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IClothingSizeRepository
    {
        List<ClothingSize> GetAllSizes();
        ClothingSize GetSizeById(int id);
    }
}