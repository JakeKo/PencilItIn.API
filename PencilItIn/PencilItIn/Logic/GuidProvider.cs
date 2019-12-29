using PencilItIn.Models;
using System;

namespace PencilItIn.Logic
{
    public class GuidProvider : IIdProvider
    {
        public string ProvideId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
