using System;

namespace PencilItIn.Models
{
    public class Booking
    {
        public string Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Name { get; set; }
        public bool Cancelled { get; set; }
    }
}
