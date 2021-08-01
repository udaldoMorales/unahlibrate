import axios from "axios";
import {URL_GET_GET_CHATS_AND_MORE, URL_GET_GET_CHATS} from '../constants/urls';


export const chatsAndMore = async (userId) => {

    try {
        var chatsAndMore = await axios.get(`${URL_GET_GET_CHATS_AND_MORE}${userId}`);
        console.log(chatsAndMore);
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