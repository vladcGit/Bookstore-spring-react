export const oktaConfig = {
  clientId: "0oaa46cscgH2NJFgF5d7",
  issuer: "https://dev-94832124.okta.com/oauth2/default",
  redirectUri: "http://localhost:5173/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
