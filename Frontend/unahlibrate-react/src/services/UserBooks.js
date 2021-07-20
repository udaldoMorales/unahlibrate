import axios from "axios";
import { URL_GET_USER_BOOKS, URL_GET_BOOKS } from '../constants/urls';

export const allBooks = async () => {

    try {
        var books = await axios.get(URL_GET_BOOKS);
        if(books.status !== 200) console.log(books.data);
        return books.data;
    } catch (error) {
        let errorObj;
        const {response} = error;
        errorObj = {
            title: 'Contraseña no cambiada',
            text: response.data.message
          }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }

}

export const userBooks = async (
    id_user
) => {
    try{
     const response = await axios.get(URL_GET_USER_BOOKS + id_user)
        if(response.status===200){
            return response.data;
        }else{
            throw new Error(response);
        }
    }catch(error){
        let errorObj;
        const {response}= error;
        if(response.status===404){
            errorObj ={
                title:"No se encontraron los libros",
                text:"No hay libros para este usuario o no se encontraron"
            }
        }else{
            errorObj={
                title:"Error en servidor",
                text:"Ocurrio un error en el servidor"
            }
        }

        throw errorObj
    }
};