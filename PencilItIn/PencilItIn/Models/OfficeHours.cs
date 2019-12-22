using System;
using System.Collections.Generic;

namespace PencilItIn.Models
{
    public class OfficeHours
    {
        public string Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string HostName { get; set; }
        public string Title { get; set; }
        public bool Cancelled { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
