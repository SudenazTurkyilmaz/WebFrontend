using Microsoft.AspNetCore.Mvc;
using lesson_1.Models;
using lesson_1.Dtos;
using lesson_1.Services; // DbContext'in bulunduğu namespace'i import ettik
using Microsoft.EntityFrameworkCore;

namespace lesson_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context; // Burada AppDbContext kullanılıyor

        public FavoritesController(AppDbContext context) // Constructor'da da AppDbContext kullanıyoruz
        {
            _context = context;
        }

        // Favorileri listele
        [HttpGet("{userId}")]
        public IActionResult GetFavorites(int userId)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var favorites = _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Car)  // Araba bilgilerini de dahil et
                .Select(f => new FavoriteDto
                {
                    Id = f.Id,
                    UserId = f.UserId,
                    CarId = f.CarId,
                    CarName = f.Car.Name, // Araç ismini döndür
                    AddedDate = f.AddedDate
                })
                .ToList();
#pragma warning restore CS8602 // null kontrolü yapmayı göz ardı etmeyi sağlar

            return Ok(favorites);
        }

        [HttpPost]
        public IActionResult AddFavorite([FromBody] AddFavoriteDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Model geçerliliğini kontrol et

            // Kullanıcının bu aracı zaten favoriye ekleyip eklemediğini kontrol et
            if (_context.Favorites.Any(f => f.UserId == dto.UserId && f.CarId == dto.CarId))
            {
                return BadRequest("This car is already in the user's favorites.");
            }

            // Kullanıcıyı ve aracı bulurken null kontrolü yap
            var user = _context.Users.FirstOrDefault(u => u.Id == dto.UserId);
            var car = _context.Cars.FirstOrDefault(c => c.Id == dto.CarId);

            if (user == null || car == null)
            {
                return NotFound("User or Car not found.");
            }

            // Favori nesnesini oluştururken User ve Car ilişkilerini başlatıyoruz
            var favorite = new Favorite
            {
                UserId = dto.UserId,
                CarId = dto.CarId,
                AddedDate = DateTime.UtcNow,
                User = user,
                Car = car
            };

            _context.Favorites.Add(favorite);
            _context.SaveChanges();

            // 201 Created yanıtı döndür
            return CreatedAtAction(nameof(GetFavorites), new { userId = dto.UserId }, favorite);
        }



        // Favori sil
        [HttpDelete("{id}")]
        public IActionResult RemoveFavorite(int id)
        {
            var favorite = _context.Favorites.Find(id);
            if (favorite == null)
            {
                return NotFound($"Favorite with ID {id} not found.");
            }

            _context.Favorites.Remove(favorite);
            _context.SaveChanges();

            return Ok($"Favorite with ID {id} has been successfully removed.");
        }
    }
}
