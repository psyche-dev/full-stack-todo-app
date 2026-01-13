using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManager.Models
{
    public class TaskItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("isDone")]
        public bool IsDone { get; set; }

        [JsonPropertyName("userId")]
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }

        [JsonPropertyName("user")]
        public User? User { get; set; }
    }
}