using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.models
{
    public class UserProfile
    {
        public int id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string firebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string firstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string lastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string email { get; set; }

        public string address { get; set; }
        public DateTime createdTime { get; set; }
        public int age { get; set; }
        public int shoeSize { get; set; }
        public int favoriteColorId { get; set; }
        public int clothingSizeId { get; set; }
        public string fullName
        {
            get
            {
                return $"{firstName} {lastName}";
            }
        }

    }
}

