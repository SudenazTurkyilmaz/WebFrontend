using System.ComponentModel.DataAnnotations;

namespace lesson_1.Dtos
{
    public class CarServiceDto
    {
        [Required(ErrorMessage = "Tag Alani Gereklidir")]

        public int ServiceId { get; set; }
    }

}
