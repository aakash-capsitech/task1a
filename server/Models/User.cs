using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MyMongoApp.Enums;

namespace MyMongoApp.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("role")]
        public string Role { get; set; } = string.Empty;

        // [BsonElement("configRoles")]
        // public List<string> ConfigRoles { get; set; } = new();

        [BsonElement("configRoles")]
        [BsonRepresentation(BsonType.String)]
        public List<UserConfigRole> ConfigRoles { get; set; } = new();
    }
}
