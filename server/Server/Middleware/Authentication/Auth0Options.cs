namespace Server.Middleware.Authentication
{
    public class Auth0Options
    {
        public bool Enabled { get; set; }
        public string Authority { get; set; }
        public string Audience { get; set; }
        public string Claim { get; set; }
    }
}
