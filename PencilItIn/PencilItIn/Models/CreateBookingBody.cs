using System;

namespace PencilItIn.Models
{
    public class CreateBookingBody
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
