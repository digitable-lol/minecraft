using System.Collections.Generic;

namespace Minecraft.Data.Wrappers
{
    public class Response<T>
    {
        public Response(T Data)
        {
            Succeeded = true;
            Message = string.Empty;
            Errors = null;
        }
        public T Data { get; set; }
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }
        public string Message { get; set; }
    }
}
