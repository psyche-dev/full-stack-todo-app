using System.Text.Json.Serialization;

namespace TaskManager.Models
{
    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("passwordHash")]
        public string PasswordHash { get; set; } = string.Empty;

        [JsonPropertyName("tasks")]
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}