// SERVER URL
const IP_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + "authentication/noAuth/login",
  LOGOUT: IP_URL + "authentication/auth/logout",

  PRODUCT_CAT_GET: IP_URL + "category/noAuth/categories",
  PRODUCT_CAT_CREATE: IP_URL + "category/auth/",
  PRODUCT_CAT_UPDATE: IP_URL + "category/auth/",

  ITEM_DETAILS: IP_URL + "item/noAuth/details/",
  ITEM_GET_BY_CAT: IP_URL + "item/noAuth/by-category/",
  ITEM_ADD: IP_URL + "item/auth/create/",
  ITEM_UPDATE: IP_URL + "item/auth/update/",

  ORDERS: IP_URL + "order/auth/filter",
};
