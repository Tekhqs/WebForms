using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StaticSite.Startup))]
namespace StaticSite
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
