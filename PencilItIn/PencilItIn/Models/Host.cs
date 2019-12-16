#nullable enable
namespace PencilItIn.Models
{
    public class Host
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string? OfficeLocation { get; set; }

        public Host(string name, string title, string? officeLocation)
        {
            this.Name = name;
            this.Title = title;
            this.OfficeLocation = officeLocation;
        }
    }
}
