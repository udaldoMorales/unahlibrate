import axios from "axios";
import {URL_GET_GET_CHATS_AND_MORE, URL_GET_GET_CHATS,URL_GET_SEARCH_USERS,URL_POST_UPLOAD_IMAGE, URL_POST_SEEN_MESSAGES} from '../constants/urls';


export const chatsAndMore = async (userId) => {

    try {
        var chatsAndMore = await axios.get(`${URL_GET_GET_CHATS_AND_MORE}${userId}`);
        //console.log(chatsAndMore);
        if (chatsAndMore.status !== 200) console.log(chatsAndMore.data);
        return chatsAndMore.data;
    } catch (error){
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron chats.',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }

};

/*
export const chatsAndMore = (userId) => {

    axios.get(`${URL_GET_GET_CHATS_AND_MORE}${userId}`)
    .then( (res) => {
        if(res.status !== 200) console.log(res.data);

        return res.data;
    })
    .catch((error) => {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron chats.',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj; 
    });

};
*/

export const getChats = async (userId) => {
    try {
        let chats = axios.get(`${URL_GET_GET_CHATS}${userId}`);
        if (chats.status !== 200) console.log(chats.data);
        return chats.data;
    } catch (error){
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron chats.',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;        
    }
}

//Metodo para buscar usuarios

export const buscarUsuarios = async (buscar) => {
    try {
        var usuarios = await axios.get(`${URL_GET_SEARCH_USERS}${buscar}`);
        if (usuarios.status !== 200) console.log(usuarios.data);
        return usuarios.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se encontró el libro',
            text: response.data
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }
}

//Metodo para guardar imagenes en el servidor

export const uploadImage = async (data) => {

    try {
        var image = await axios.post(`${URL_POST_UPLOAD_IMAGE}`,data); //Para no usar Google Drive en la subida de las fotos, pueden usar este.
        //var image = await axios.post(`${URL_POST_UPLOAD_IMAGE_MULTER}`,data); //Con el Heroku y el Google Drive, se usa este.
        //console.log(image);
        if (image.status !== 200) console.log(image.data);
        return image.data;
    } catch (error){
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron chats.',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }

};

export const seenMessages = async (sender, receiver) => {

    try {

        var seen = await axios.post(`${URL_POST_SEEN_MESSAGES}`, {sender, receiver});
        if (seen.status !== 200) console.log(seen.data);
        return (seen.data);

    } catch (error) {

        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se actualizó chat.',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;

    };

}