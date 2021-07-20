const urlApi = 'http://localhost:3900';

//Url estaticas
export const URL_POST_SAVE_USER = urlApi +"/api/save-user";
export const URL_POST_SEND_MAIL = urlApi +"/api/send-mail";
//export const URL_GET_SECTORS_SELECT = urlApi + "/api/data/sectors";
export const URL_POST_LOGIN = urlApi + "/api/login";
//export const URL_POST_RECOVER_PASS = "/api/forgotpassword";

export const URL_GET_USER_ACCESS = `${urlApi}/api/user-panel`;
export const URL_POST_USER_REFRESH = `${urlApi}/api/refreshtoken`;
export const URL_GET_GET_USERNAME = `${urlApi}/api/user-by-name/`;

export const URL_PUT_USER_UPDATE = `${urlApi}/api/update-user/`;

export const URL_PUT_USER_CHANGE_PASSWORD = `${urlApi}/api/change-password/`;

export const URL_POST_USER_CHANGE_IMAGE_PROFILE = `${urlApi}/api/upload-image/`;
 
export const URL_PUT_USER_FORGOT_PASSWORD = `${urlApi}/api/forgot-password/`;
export const URL_PUT_USER_RESTORE_PASSWORD = `${urlApi}/api/restore-password/`;

//URL para libros

export const URL_POST_ADD_BOOK = `${urlApi}/api/save-book`;
export const URL_POST_SAVE_IMAGE_BOOOK = `${urlApi}/api/upload-book-image/`;
export const URL_GET_USER_BOOKS = `${urlApi}/api/books-user/`;
export const URL_GET_IMAGE_BOOK=`${urlApi}/api/get-book-image/`;






//URL dinamicas
export const URL_POST_RESET_PASSWORD = (token) =>
  `/api/auth/resetpassword/${token}`;
export const URL_GET_PRODUCT_BY_ID = (id) => `/api/data/products/${id}`;
export const URL_GET_REQUEST_DETAILS = (id) => `/api/request/${id}/details`;
export const URL_PRODUCT_ID = (id) => `/api/product/${id}`;
export const URL_GET_BILL_INFO = (id) => `/api/data/bill/${id}`;
