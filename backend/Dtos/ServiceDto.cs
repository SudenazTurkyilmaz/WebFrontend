using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace lesson_1.Dtos
{
    public class ServiceDto
    {
        [Required(ErrorMessage = "ServiceName Alani Gereklidir")]
        public required string ServiceName { get; set; }
    }


}