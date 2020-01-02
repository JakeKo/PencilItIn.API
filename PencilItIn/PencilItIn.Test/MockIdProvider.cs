using PencilItIn.Models;

namespace PencilItIn.Test
{
    public class MockIdProvider : IIdProvider
    {
        private int index;

        public MockIdProvider()
        {
            this.index = 0;
        }

        public string ProvideId()
        {
            return this.index++.ToString();
        }
    }
}
