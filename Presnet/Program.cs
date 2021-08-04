using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotenv.net;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Presnet
{
    public class Program
    {
        static void Main(string[] args)
        {
            DotEnv.Load();
            var envVars = DotEnv.Read();

            //string accountSid = envVars["TWILIO_ACCOUNT_SID"];
            //string authToken = envVars["TWILIO_AUTH_TOKEN"];

            //TwilioClient.Init(accountSid, authToken);

            //var message = MessageResource.Create(
            //    body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
            //    from: new Twilio.Types.PhoneNumber("+"),
            //    to: new Twilio.Types.PhoneNumber("+")
            //);

            //Console.WriteLine(message.Sid);

            CreateHostBuilder(args).Build().Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
