﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{  
   public class User : BaseEntity
    {
  
        public string FirstName { get; set; } = string.Empty;

       
        public string LastName { get; set; } = string.Empty;

     
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Salt { get; set; } = string.Empty;


        public string Role { get; set; } = "user";

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
