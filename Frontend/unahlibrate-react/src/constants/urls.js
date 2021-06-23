const urlApi = 'http://localhost:3900';

//Url estaticas
export const URL_POST_SAVE_USER = urlApi +"/api/save-user";
export const URL_POST_SEND_MAIL = urlApi +"/api/send-mail";
export const URL_GET_SECTORS_SELECT = urlApi + "/api/data/sectors";
export const URL_POST_LOGIN = urlApi + "/api/auth/login";
export const URL_POST_RECOVER_PASS = "/api/auth/forgotpassword";






//URL dinamicas
export const URL_POST_RESET_PASSWORD = (token) =>
  `/api/auth/resetpassword/${token}`;
export const URL_GET_PRODUCT_BY_ID = (id) => `/api/data/products/${id}`;
export const URL_GET_REQUEST_DETAILS = (id) => `/api/request/${id}/details`;
export const URL_PRODUCT_ID = (id) => `/api/product/${id}`;
export const URL_GET_BILL_INFO = (id) => `/api/data/bill/${id}`;
