using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace lesson_1.Models
{
    public class Car
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Count { get; set; } = 0;

        public int CategoryId { get; set; }

        public required virtual Category Category { get; set; } //(Navigation Property)

        public virtual List<Service> Services { get; set; } = []; //(Çoklu ilişki)

    }



}