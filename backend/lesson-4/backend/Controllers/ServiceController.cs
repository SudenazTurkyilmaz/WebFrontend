using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using lesson_1.Dtos;
using lesson_1.Models;
using lesson_1.Services;
using Microsoft.AspNetCore.Authorization;

namespace lesson_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ServicesController : ControllerBase
    {
        private AppDbContext dbContext;

        public ServicesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/services
        [HttpGet]
        public IActionResult GetAllServices()
        {
            var services = dbContext.Services.ToList();
            return Ok(services); // Otomatik JSON serileştirmesi yapılır
        }

        // GET: api/services/{id}
        [HttpGet]
        [Route("{serviceId:int}")]
        public IActionResult GetServiceById(int serviceId)
        {
            var serviceObj = dbContext.Services.Find(serviceId);
            if (serviceObj == null)
                return NotFound();

            return Ok(serviceObj); // Otomatik JSON serileştirmesi yapılır
        }

        // POST: api/services
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateService(ServiceDto dto)
        {
            var serviceObj = new Service()
            {
                ServiceName = dto.ServiceName
            };

            dbContext.Services.Add(serviceObj);
            dbContext.SaveChanges();

            return Ok(serviceObj);
        }

        // PUT: api/services/{id}
        [HttpPut("{serviceId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateService(int serviceId, ServiceDto dto)
        {
            var serviceObj = dbContext.Services.Find(serviceId);
            if (serviceObj == null)
                return NotFound();

            serviceObj.ServiceName = dto.ServiceName;
            dbContext.SaveChanges();

            return Ok(serviceObj);
        }

        // DELETE: api/services/{id}
        [HttpDelete("{serviceId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteService(int serviceId)
        {
            var serviceObj = dbContext.Services.Find(serviceId);
            if (serviceObj == null)
                return NotFound();

            dbContext.Services.Remove(serviceObj);
            dbContext.SaveChanges();

            return Ok(serviceObj); // Silinen servisi döndürür
        }
    }
}
