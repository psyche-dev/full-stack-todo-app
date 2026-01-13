using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManager.Models
{
    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("email")]
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("passwordHash")]
        [Required(ErrorMessage = "Password is required")]
        public string PasswordHash { get; set; } = string.Empty;

        [JsonPropertyName("tasks")]
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

        // Method to set hashed password
        public void SetPassword(string password)
        {
            var hasher = new Microsoft.AspNetCore.Identity.PasswordHasher<User>();
            PasswordHash = hasher.HashPassword(this, password);
        }

        // Method to verify password
        public bool VerifyPassword(string password)
        {
            var hasher = new Microsoft.AspNetCore.Identity.PasswordHasher<User>();
            return hasher.VerifyHashedPassword(this, PasswordHash, password) != Microsoft.AspNetCore.Identity.PasswordVerificationResult.Failed;
        }
    }
}