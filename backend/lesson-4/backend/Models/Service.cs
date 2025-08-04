using System.Text.Json.Serialization;

namespace lesson_1.Models
{
    public class Service
    {
        public int Id { get; set; }
        public required string ServiceName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Car> Cars { get; set; } = [];

    }
}
