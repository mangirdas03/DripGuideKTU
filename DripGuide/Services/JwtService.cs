using DripGuide.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DripGuide.Helpers
{
    public class JwtService
    {
        private readonly DripContext _context;

        public JwtService(DripContext context)
        {
            _context = context;
        }

        private string secureKey = "dripdripdripdripdrip";
        public string Generate(int id, bool role)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
            var claims = new[] {
                    new Claim("Id", id.ToString()),
                    new Claim("Role", role ? "admin" : "user"),
            };

            var payload = new JwtPayload("dripguide", null, claims, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);
            tokenhandler.ValidateToken(jwt, new TokenValidationParameters 
            { 
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                
            }, out SecurityToken validatedToken);
            return (JwtSecurityToken)validatedToken;
        }

        public AuthObject ParseUser(string? jwt, bool requireAdmin)
        {
            try
            {
                if (jwt == null)
                    return new AuthObject { Error = "Authentication token not found, please login first!" };

                var token = Verify(jwt);

                var tokenIdClaim = token.Claims.FirstOrDefault(c => c.Type == "Id");
                var tokenRoleClaim = token.Claims.FirstOrDefault(c => c.Type == "Role");

                if (tokenIdClaim == null || tokenRoleClaim == null)
                    return new AuthObject { Error = "Invalid authentication token!" };

                var tokenId = int.Parse(tokenIdClaim.Value);
                var tokenRole = tokenRoleClaim.Value;

                if (!_context.Users.Any(x => x.Id == tokenId))
                    return new AuthObject { Error = "User does not exist!" };

                if(requireAdmin && tokenRole != "admin")
                {
                    return new AuthObject { Error = "You do not have permissions to access this!" };
                }

                return new AuthObject { UserId = tokenId, Role = tokenRole };
            }
            catch
            {
                return new AuthObject { Error = "Authentication error has occured!" };
            }
        }
    }
}
