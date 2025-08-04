using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace lesson_1.Dtos
{
    public class CarDto
    {
        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Name { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Count 0dan buyuk olmalidir")]
        public int Count { get; set; }


        [Required]
        public required int CategoryId { get; set; }
    }



}