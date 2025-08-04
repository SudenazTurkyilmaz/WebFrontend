namespace lesson_1.Dtos
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }
        public string CarName { get; set; } = string.Empty;
        public DateTime AddedDate { get; set; }
    }
}
