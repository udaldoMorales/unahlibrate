//Url estaticas
export const UR_POST_ENTERPRISE_USER = "/api/user/registerenterpriseuser";
export const URL_POST_NORMAL_USER = "/api/user/registerindividualclient";
export const URL_GET_SECTORS_SELECT = "/api/data/sectors";
export const URL_POST_LOGIN = "/api/auth/login";
export const URL_POST_RECOVER_PASS = "/api/auth/forgotpassword";
export const URL_GET_SAR = "/api/data/sartype";
export const URL_GET_SUPPLIES = "/api/data/supplies";
export const URL_GET_PROVIDERS = "/api/data/providers";
export const URL_GET_PRODUCTS = "/api/data/products";
export const URL_GET_INVENTORY = "/api/data/inventory";
export const URL_POST_ORDER = "/api/order/provider/order";
export const URL_GET_EMPLOYEES = "/api/data/employees";
export const URL_POST_REG_EMPLOYEE = "/api/employees";
export const URL_GET_JOB_TITLE = "/api/data/jobtitles";
export const URL_GET_DEPARTMENT = "/api/data/departments";
export const URL_GET_REFERRALS = "/api/data/refferals";
export const URL_GET_REQUEST_HISTORY = "/api/data/requesthistory";
export const URL_POST_CREATE_REQUEST = "/api/request";
export const URL_POST_PAYPAL_PAYMENT = "/api/payment/pay";
export const URL_GET_DELIVERY_TYPES = "/api/data/delivery";
export const URL_GET_PAYMENT_TYPES = "/api/data/payment-method";
export const URL_GET_ENTERPRISE_DATA = "/api/data/dataenterprise";
export const URL_UPDATE_ENTERPRISE_PROFILE = "/api/user/updateuser";
export const URL_GET_INDIVIDUAL_DATA = "/api/data/individualuser";
export const URL_UPDATE_INDIVIDUAL_PROFILE = "/api/user/updateuser";
export const URL_GET_REQUEST_DATA = "/api/request/requests-data";
export const URL_POST_NEW_PRODUCT = "/api/product";
export const URL_GET_COMPANY_TYPES = "/api/data/companytypes";
export const URL_POST_NEW_PROVIDER = "/api/provider"
export const URL_GET_ALL_PRODUCTS_ADMIN = "/api/product/products-admin";
export const URL_GET_CATEGORIES = "/api/data/categories";
export const URL_GET_ORDERS_TODAY = "/api/request/qt";
export const URL_PUT_PRODUCTS = "/api/product";;
export const URL_POST_SEND_BILL = "/api/bills/";

//URL dinamicas
export const URL_POST_RESET_PASSWORD = (token) =>
  `/api/auth/resetpassword/${token}`;
export const URL_GET_PRODUCT_BY_ID = (id) => `/api/data/products/${id}`;
export const URL_GET_REQUEST_DETAILS = (id) => `/api/request/${id}/details`;
export const URL_PRODUCT_ID = (id) => `/api/product/${id}`;
export const URL_GET_BILL_INFO = (id) => `/api/data/bill/${id}`;
