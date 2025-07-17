using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MyMongoApp.Enums;
using System;
using System.Collections.Generic;

namespace MyMongoApp.Models
{
    public class Quote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string BusinessId { get; set; }

        public DateTime Date { get; set; }

        public string FirstResponseTeam { get; set; }

        public List<ServiceLine> Services { get; set; }

        public double DiscountPercentage { get; set; }

        public int VatPercentage { get; set; }

        public double Subtotal { get; set; }

        public double VatAmount { get; set; }

        public double Total { get; set; }
    }

    public class ServiceLine
{
    public QuoteServiceType Service { get; set; }  // changed from string to enum

    public string Description { get; set; }

    public double Amount { get; set; }
}

}
