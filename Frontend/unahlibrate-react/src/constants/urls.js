const urlApi = ''; //En producción con Heroku, se tiene que hacer así.

// const urlApi = `http://localhost:3900`; //En desarrollo local, se usa este.

//Url estaticas
export const URL_POST_SAVE_USER = urlApi +"/api/save-user";
export const URL_POST_SEND_MAIL = urlApi +"/api/send-mail";
//export const URL_GET_SECTORS_SELECT = urlApi + "/api/data/sectors";
export const URL_POST_LOGIN = urlApi + "/api/login";
//export const URL_POST_RECOVER_PASS = "/api/forgotpassword";

export const URL_GET_USER_ACCESS = `${urlApi}/api/user-panel`;
export const URL_POST_USER_REFRESH = `${urlApi}/api/refreshtoken`;
export const URL_GET_GET_USER_BY_ID = `${urlApi}/api/user/`;
export const URL_GET_GET_USERNAME = `${urlApi}/api/user-by-name/`;
export const URL_GET_SEARCH_USERS = `${urlApi}/api/search-users/`; // para buscar usuarios


 


//URL para obtener una imagen de usuario
export const URL_GET_IMAGE_USER = `${urlApi}/api/get-image/`;

export const URL_PUT_USER_UPDATE = `${urlApi}/api/update-user/`;

export const URL_PUT_USER_CHANGE_PASSWORD = `${urlApi}/api/change-password/`;

export const URL_POST_USER_CHANGE_IMAGE_PROFILE = `${urlApi}/api/upload-image/`;
 
export const URL_PUT_USER_FORGOT_PASSWORD = `${urlApi}/api/forgot-password`;
export const URL_PUT_USER_RESTORE_PASSWORD = `${urlApi}/api/restore-password`;

//URL para libros

export const URL_POST_ADD_BOOK = `${urlApi}/api/save-book`;
export const URL_POST_SAVE_IMAGE_BOOOK = `${urlApi}/api/upload-book-image/`;
export const URL_GET_USER_BOOKS = `${urlApi}/api/books-user/`;
export const URL_GET_IMAGE_BOOK=`${urlApi}/api/get-book-image/`;
export const URL_PUT_UPDATE_BOOK=`${urlApi}/api/update-book/`;
export const URL_POST_DELETE_BOOK=`${urlApi}/api/delete-book/`;

export const URL_GET_BOOKS = `${urlApi}/api/books`;

//URL para obtener chats.

export const URL_GET_GET_CHATS_AND_MORE = `${urlApi}/api/get-chats-and-more/`;
export const URL_GET_GET_CHATS = `${urlApi}/api/get-chats/`;
export const URL_POST_UPLOAD_IMAGE = `${urlApi}/api/upload-image`;
export const URL_GET_IMAGE_CHAT = `${urlApi}/api/get-chatImage/`

//Obtener un libro individual por su ID:
export const URL_GET_BOOK_BY_ID = `${urlApi}/api/book/`;

//Buscar libros por una cadena (string) de búsqueda
export const URL_GET_SEARCH_BOOKS = `${urlApi}/api/search-books/`;

//URL para dejar en visto JAJA.
export const URL_POST_SEEN_MESSAGES = `${urlApi}/api/seen-messages`;

//URL's de Google:
export const URL_POST_USER_CHANGE_IMAGE_PROFILE_GOOGLE = `${urlApi}/api/upload-image-google/`;
export const URL_POST_SAVE_IMAGE_BOOOK_GOOGLE = `${urlApi}/api/upload-book-image-google/`;
export const URL_POST_UPLOAD_IMAGE_GOOGLE = `${urlApi}/api/upload-chat-image-google`;

//Probando el multer:
export const URL_POST_SAVE_IMAGE_BOOOK_MULTER = `${urlApi}/api/upload-image-book/`;
export const URL_POST_USER_CHANGE_IMAGE_PROFILE_MULTER = `${urlApi}/api/upload-image-user/`;
export const URL_POST_UPLOAD_IMAGE_MULTER = `${urlApi}/api/upload-image-chat/`;