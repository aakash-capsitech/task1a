using MongoDB.Driver;
using MyMongoApp.Models;

namespace MyMongoApp.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("MyMongoAppDb");
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    }
}
