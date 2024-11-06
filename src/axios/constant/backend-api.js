// SERVER URL
const IP_URL = process.env.NEXT_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + "auth/login",
  LOGOUT: IP_URL + "auth/logout",
};
