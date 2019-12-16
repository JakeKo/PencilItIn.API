using System;

namespace PencilItIn.Models
{
    public class Booking
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Name { get; set; }

        public Booking(DateTime startTime, DateTime endTime, string name)
        {
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.Name = name;
        }
    }
}
