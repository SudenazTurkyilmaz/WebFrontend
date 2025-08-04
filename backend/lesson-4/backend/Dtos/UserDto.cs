using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace lesson_1.DTOs
{
    public class UserDto
    {
        [Required(ErrorMessage = "Kullanıcı adı alanı gereklidir")]
        public required string Username { get; set; }
        public required string Password { get; set; }

        [Required(ErrorMessage = "Şifre alanı gereklidir")]
        [Compare("Password", ErrorMessage = "Şifreler birbiri ile uyuşmamaktadır")]
        public required string ConfirmPassword { get; set; }
    }
}