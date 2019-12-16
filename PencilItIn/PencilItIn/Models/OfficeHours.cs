using System;
using System.Collections.Generic;

namespace PencilItIn.Models
{
    public class OfficeHours
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public Host Host { get; set; }
        public List<Booking> Bookings { get; set; }

        public OfficeHours(DateTime startTime, DateTime endTime, string location, Host host, List<Booking> bookings)
        {
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.Location = location;
            this.Host = host;
            this.Bookings = bookings;
        }
    }
}
