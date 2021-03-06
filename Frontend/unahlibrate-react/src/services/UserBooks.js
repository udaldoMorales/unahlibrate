import axios from "axios";
import { URL_GET_USER_BOOKS, URL_GET_BOOKS, URL_GET_BOOK_BY_ID, URL_GET_SEARCH_BOOKS, URL_POST_DELETE_BOOK, URL_PUT_UPDATE_BOOK } from '../constants/urls';

export const allBooks = async () => {

    try {
        var books = await axios.get(URL_GET_BOOKS);
        if (books.status !== 200) console.log(books.data);
        return books.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron libros',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }

}

export const getLastBooks = async (lastNumber) => {

    try {
        var books = await axios.get(`${URL_GET_BOOKS}/${lastNumber}`);
        if (books.status !== 200) console.log(books.data);
        return books.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se devolvieron libros',
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
    try {
        const response = await axios.get(URL_GET_USER_BOOKS + id_user)
        if (response.status !== 200) console.log(response.data);
        return response.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        if (response.status === 404) {
            errorObj = {
                title: "No se encontraron los libros",
                text: "No hay libros para este usuario o no se encontraron"
            }
        } else {
            errorObj = {
                title: "Error en servidor",
                text: "Ocurrio un error en el servidor"
            }
        }

        return errorObj;
    }
};

export const individualBook = async (bookId) => {
    try {
        var foundedBook = await axios.get(`${URL_GET_BOOK_BY_ID}${bookId}`);
        if (foundedBook.status !== 200) console.log(foundedBook.data);
        return foundedBook.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se encontr?? el libro',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }
}

export const searchBooks = async (searchString) => {
    try {
        const foundedBooks = await axios.get(`${URL_GET_SEARCH_BOOKS}${searchString}`);
        if (foundedBooks.status !== 200) console.log(foundedBooks.data);
        return foundedBooks.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        if (response.status === 404) {
            errorObj = {
                title: "No se encontraron los libros",
                text: "No hay libros con esa b??squeda, o no se encontraron."
            }
        } else {
            errorObj = {
                title: "Error en servidor",
                text: "Ocurri?? un error en el servidor."
            }
        }

        return errorObj;
    }
};

export const updateBook = async (
    bookId,
    title,
    autor,
    edition,
    genre,
    condition,
    description,
    price,

) => {
    const book = {
        title,
        autor,
        edition,
        genre,
        condition,
        description,
        price,
        //image
    };
    try {
        var updatedBook = await axios.put(`${URL_PUT_UPDATE_BOOK}${bookId}`, book);
        if (updatedBook.status !== 200) console.log(updatedBook.data);
        return updatedBook.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se actuzalizo el libro',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }
}

export const deleteBook = async (bookId) => {
    try {
        var deletedBook = await axios.post(`${URL_POST_DELETE_BOOK}${bookId}`);
        if (deletedBook.status !== 200) console.log(deletedBook.data);
        return deletedBook.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se encontr?? el libro',
            text: response.data
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }
}


