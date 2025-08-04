using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace lesson_1.Models
{
    public class Category
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        [JsonIgnore]
        public virtual List<Car> Cars { get; set; } = [];
    }
}