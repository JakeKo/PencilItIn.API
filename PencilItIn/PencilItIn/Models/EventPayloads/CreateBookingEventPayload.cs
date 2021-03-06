﻿using System;

namespace PencilItIn.Models
{
    public class CreateBookingEventPayload : IEventPayload
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string OfficeHoursId { get; set; }
    }
}
