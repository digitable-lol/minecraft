using System;
using System.Runtime.Serialization;

namespace Minecraft_5._0.Data.Exception
{
    [Serializable]
    internal class MyCustomException : SystemException
    {
        public MyCustomException()
        {
        }

        public MyCustomException(string message) : base(message)
        {
        }

        public MyCustomException(string message, SystemException innerException) : base(message, innerException)
        {
        }

        protected MyCustomException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}