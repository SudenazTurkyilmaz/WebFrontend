using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lesson_1.Dtos;
using lesson_1.Models;
using lesson_1.Services;
using Microsoft.AspNetCore.Authorization;

namespace lesson_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CarController : ControllerBase
    {
        private AppDbContext _dbContext;

        public CarController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Tüm arabaları listele
        [HttpGet]
        public IActionResult GetAllCars()
        {
            var cars = _dbContext.Cars.Include(p => p.Category)
                          .Include(p => p.Services)  // CarServices ilişkisini dahil et
                        .ToList();


            return Ok(cars);
        }

        // Belirli bir arabayı ID'ye göre al
        [HttpGet]
        [Route("{CarId:int}")]
        public IActionResult GetCarById(int CarId)
        {
            var carObj = _dbContext.Cars.Include(p => p.Category)
                 .FirstOrDefault(p => p.Id == CarId);

            if (carObj == null)
                return NotFound();

            return Ok(carObj);
        }

        // Yeni bir araba oluştur
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateCar(CarDto dto)
        {

            var categoryObj = _dbContext.Categories.Find(dto.CategoryId);
            if (categoryObj == null)
                return NotFound();

            var carObj = new Car()
            {
                Name = dto.Name,
                Count = dto.Count,
                Category = categoryObj,
            };

            _dbContext.Cars.Add(carObj);
            _dbContext.SaveChanges();

            return Ok(carObj);
        }

        // Bir arabayı güncelle
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("{CarId:int}")]
        public IActionResult UpdateCar(int CarId, CarDto dto)
        {

            var categoryObj = _dbContext.Categories.Find(dto.CategoryId);
            if (categoryObj == null)
                return NotFound();

            var carObj = _dbContext.Cars.Find(CarId);

            if (carObj == null)
                return NotFound();

            carObj.Name = dto.Name;
            carObj.Count = dto.Count;
            carObj.Category = categoryObj;

            _dbContext.SaveChanges();

            return Ok(carObj);
        }

        // Bir arabayı sil
        [HttpDelete]
        [Route("{CarId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateCar(int CarId)
        {
            var carObj = _dbContext.Cars.Find(CarId);

            if (carObj == null)
                return NotFound();

            _dbContext.Cars.Remove(carObj);
            _dbContext.SaveChanges();

            return Ok(carObj);
        }

        [HttpPost]
        [Route("{CarId:int}/Services")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddService(int CarId, CarServiceDto dto)
        {
            var carObj = _dbContext.Cars.Include(p => p.Services).FirstOrDefault(p => p.Id == CarId);
            var serviceObj = _dbContext.Services.Find(dto.ServiceId);
            if (carObj is null || serviceObj is null)
                return NotFound();

            carObj.Services.Add(serviceObj);

            _dbContext.SaveChanges();
            return Ok(carObj);
        }

        [HttpDelete]
        [Route("{CarId:int}/Services")]
        [Authorize(Roles = "Admin")]
        public IActionResult RemoveService(int CarId, CarServiceDto dto)
        {
            var carObj = _dbContext.Cars.Include(p => p.Services).FirstOrDefault(p => p.Id == CarId);
            var serviceObj = _dbContext.Services.Find(dto.ServiceId);

            if (carObj == null || serviceObj == null)
                return NotFound();

            carObj.Services.Remove(serviceObj);
            _dbContext.SaveChanges();

            return Ok(serviceObj);
        }

    }
}
