using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PencilItIn.Logic;
using PencilItIn.Models;
using System;

namespace PencilItIn
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.Configuration = configuration;
            this.Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IEventLog>(this.Environment.IsDevelopment() ? this.InitializeDevEventLog() : new EventLog());
            services.AddSingleton<IStateAssembler, StateAssembler>();
            services.AddSingleton<IIdProvider, GuidProvider>();
            services.AddControllers();
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (this.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (this.Environment.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private EventLog InitializeDevEventLog()
        {
            var eventLog = new EventLog();

            var idProvider = new GuidProvider();
            var officeHoursId = idProvider.ProvideId();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload
            {
                StartTime = new DateTime(2020, 01, 01, 10, 30, 00),
                EndTime = new DateTime(2020, 01, 01, 14, 30, 00),
                HostName = "Severus Snape",
                Location = "Hogwart's School of Witchcraft and Wizardry",
                Title = "DAGA Office Hours",
                Id = officeHoursId
            });

            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload
            {
                OfficeHoursId = officeHoursId,
                Name = "Hermoine Granger",
                StartTime = new DateTime(2020, 01, 01, 11, 00, 00),
                EndTime = new DateTime(2020, 01, 01, 11, 30, 00),
                Id = idProvider.ProvideId()
            });

            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload
            {
                OfficeHoursId = officeHoursId,
                Name = "Ronald Weasley",
                StartTime = new DateTime(2020, 01, 01, 11, 30, 00),
                EndTime = new DateTime(2020, 01, 01, 12, 30, 00),
                Id = idProvider.ProvideId()
            });

            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload
            {
                OfficeHoursId = officeHoursId,
                Name = "Harry Potter",
                StartTime = new DateTime(2020, 01, 01, 13, 00, 00),
                EndTime = new DateTime(2020, 01, 01, 13, 30, 00),
                Id = idProvider.ProvideId()
            });

            officeHoursId = idProvider.ProvideId();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload
            {
                StartTime = new DateTime(2020, 01, 01, 12, 00, 00),
                EndTime = new DateTime(2020, 01, 01, 14, 00, 00),
                HostName = "Albus Dumbledore",
                Location = "Hogwart's School of Witchcraft and Wizardry",
                Title = "Headmaster Office Hours",
                Id = officeHoursId
            });

            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload
            {
                OfficeHoursId = officeHoursId,
                Name = "Hermoine Granger",
                StartTime = new DateTime(2020, 01, 01, 12, 00, 00),
                EndTime = new DateTime(2020, 01, 01, 12, 30, 00),
                Id = idProvider.ProvideId()
            });

            return eventLog;
        }
    }
}
