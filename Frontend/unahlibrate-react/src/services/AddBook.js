import axios from "axios";
import { URL_POST_ADD_BOOK, URL_POST_SAVE_IMAGE_BOOOK } from "../constants/urls";

export const addBook = async (

    title,
    autor,
    edition,
    genre,
    condition,
    description,
    price, 
    user

) => {
    const book = {
        title,
        autor,
        edition,
        genre,
        condition,
        description,
        price,
        user
        //image
    };
    try {
        const response = await axios.post(URL_POST_ADD_BOOK, book);

        if (response.status === 200) {
            //Si guarda el libro guardar imagen
            /*
            axios.post(URL_POST_SAVE_IMAGE_BOOOK , dataUser)
            .then(res => {
              return res.data;
            }).catch(err => {
                return {
                  status:"error",
                  err
                }
            });*/
            
            return response.data;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        let errorObj;
        const { response } = error;
        if (response.status === 400) {
            errorObj = {
                title: 'Libro no guardado',
                text: 'Ocurrió un error al intentar guardar el libro'
            }
        } else {
            errorObj = {
                title: 'Error',
                text: 'Ocurrió un error con el servidor, intente de nuevo'
            }
        }
        throw errorObj
    }
};
