using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using lesson_1.Dtos;
using lesson_1.Models;
using lesson_1.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lesson_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private AppDbContext dbContext;
        public CategoriesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllCategories()
        {
            var categories = dbContext.Categories.ToList();
            return Ok(categories);
        }


        [HttpGet]
        [Route("{CategoryId:int}")]
        public IActionResult getCategoryById(int CategoryId)
        {
            var CategoryObj = dbContext.Categories.Find(CategoryId);
            // var CategoryObj = dbContext.Categories.FirstOrDefault(p => p.Id == CategoryId);
            if (CategoryObj is null)
                return NotFound();
            return Ok(CategoryObj);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult createCategory(CategoryDto dto)
        {
            var CategoryObj = new Category()
            {
                Name = dto.Name,
            };

            dbContext.Categories.Add(CategoryObj);

            dbContext.SaveChanges();

            return Ok(CategoryObj);
        }


        [HttpPut]
        [Route("{CategoryId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateCategory(int CategoryId, CategoryDto dto)
        {
            var CategoryObj = dbContext.Categories.Find(CategoryId);
            if (CategoryObj is null)
                return NotFound();

            CategoryObj.Name = dto.Name;

            dbContext.SaveChanges();

            return Ok(CategoryObj);
        }


        [HttpDelete]
        [Route("{CategoryId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateCategory(int CategoryId)
        {
            var CategoryObj = dbContext.Categories.Find(CategoryId);
            if (CategoryObj is null)
                return NotFound();

            dbContext.Categories.Remove(CategoryObj);

            dbContext.SaveChanges();

            return Ok(CategoryObj);
        }

    }
}