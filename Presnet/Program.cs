using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Presnet
{
    public class Program
    {
        static void Main(string[] args)
        {

            CreateHostBuilder(args).Build().Run();

            //// Find your Account SID and Auth Token at twilio.com/console
            //// and set the environment variables. See http://twil.io/secure
            //string accountSid = Environment.GetEnvironmentVariable("AC65d431a916889892439cad0ac7fa11d7");
            //string authToken = Environment.GetEnvironmentVariable("2804d5191475585dae4738ba7ae357cc");

            //TwilioClient.Init(accountSid, authToken);

            //var message = MessageResource.Create(
            //    body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
            //    from: new Twilio.Types.PhoneNumber("+12673100869"),
            //    to: new Twilio.Types.PhoneNumber("+18045485318")
            //);

            //Console.WriteLine(message.Sid);

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
