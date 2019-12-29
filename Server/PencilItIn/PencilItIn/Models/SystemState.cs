using System.Collections.Generic;

namespace PencilItIn.Models
{
    public class SystemState
    {
        public int EventCount { get; set; }
        public List<OfficeHours> OfficeHours { get; set; }
    }
}
