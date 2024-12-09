// SERVER URL
const IP_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + "authentication/noAuth/login",
  LOGOUT: IP_URL + "authentication/auth/logout",

  ADMIN_ALL: IP_URL + "user/auth/all",
  ADMIN_CREATE: IP_URL + "user/auth/create",
  ADMIN_DELETE: IP_URL + "user/auth/delete/",

  PRODUCT_CAT_GET: IP_URL + "category/noAuth/categories",
  PRODUCT_CAT_CREATE: IP_URL + "category/auth/",
  PRODUCT_CAT_UPDATE: IP_URL + "category/auth/",

  ITEM_DETAILS: IP_URL + "item/noAuth/details/",
  ITEM_GET_BY_CAT: IP_URL + "item/noAuth/by-category/",
  ITEM_ADD: IP_URL + "item/auth/create/",
  ITEM_UPDATE: IP_URL + "item/auth/update/",

  ORDERS: IP_URL + "order/auth/filter",
  ORDER: IP_URL + "order/auth/details/",

  ORDER_RECENT_TRANSACTIONS: IP_URL + "order/auth/transactions",
  ORDER_RECENT_ORDERS: IP_URL + "order/auth/recent-orders",
};
