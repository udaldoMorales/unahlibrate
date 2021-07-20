import axios from "axios";
import { URL_GET_USER_BOOKS } from '../constants/urls';

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
        const {response}= response.error;
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