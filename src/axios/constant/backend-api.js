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
  ORDER_STAT_COUNT: IP_URL + "order/auth/stat-count",

  ORDER_RECENT_TRANSACTIONS: IP_URL + "order/auth/transactions",
  ORDER_RECENT_ORDERS: IP_URL + "order/auth/recent-orders",
  ORDER_RECENT_PICK_RQSTS: IP_URL + "order/auth/recent-pickup-rqsts",
  ORDER_UPDATE_STATUS: IP_URL + "order/auth/update-status",
  ORDER_CREATE_DELIVERY: IP_URL + "order/auth/create-delivery-orders",
  ORDER_PICK_UP_REQUEST: IP_URL + "order/auth/request-pickup",
  ORDER_CANCEL: IP_URL + "order/auth/cancel-order/",
  ORDER_UPDATE_PAYMENT_STATUS: IP_URL + "order/auth/update-payment-status",
};
