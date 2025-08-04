namespace lesson_1.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }
        public DateTime AddedDate { get; set; }

        // Navigation Properties (İlişkiler) nullable olarak tanımlandı
        public virtual User? User { get; set; }
        public virtual Car? Car { get; set; }
    }
}
