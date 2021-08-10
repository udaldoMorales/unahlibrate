import axios from "axios";
import { URL_POST_SAVE_USER, URL_PUT_USER_UPDATE, URL_PUT_USER_CHANGE_PASSWORD,URL_POST_USER_CHANGE_IMAGE_PROFILE, URL_POST_USER_CHANGE_IMAGE_PROFILE_MULTER, URL_PUT_USER_FORGOT_PASSWORD, URL_PUT_USER_RESTORE_PASSWORD, URL_GET_GET_USERNAME} from "../constants/urls";

export const updateUser = async (
    id,
    user,
    name,
    lastname, 
    email,
    phone,
    imageProfile,
    ubication
) => {
    const data = {
        user: user,
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        imageProfile: imageProfile,
        ubication: ubication
    };
    try {

        //console.log('Mando');
        const update = await axios.put(`${URL_PUT_USER_UPDATE}${id}`, data);
        //console.log('¿Ejecuté?');
        if (update.status === 200){
            return update.data;
        } else {
            console.log(update);
            //throw new Error(update);
            return update.data;
        }

    } catch (err) {
        let errorObj;
        const {response} = err;

        errorObj = {
            title: 'Usuario no actualizado',
            text: response.data.message
          }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }
}


export const updateImageProfile = async (idUser,imageProfile) =>{
    
    axios.post(URL_POST_USER_CHANGE_IMAGE_PROFILE + idUser,imageProfile) //Para no usar Google Drive en la subida de las fotos, pueden usar este.
    //axios.post(URL_POST_USER_CHANGE_IMAGE_PROFILE_MULTER + idUser,imageProfile) //Con el Heroku y el Google Drive, se usa este.
    .then(res=>{
        if(res.data.user){
            
        }
    });
}

export const changePassword = async (id, pass, newPass) => {

    var data = {
        oldPass: pass,
        newPass: newPass
    };
    try {
        const changedPass = await axios.put(`${URL_PUT_USER_CHANGE_PASSWORD}${id}`, data);

        if (changedPass.status === 200){
            return changedPass.data;
        } else {
            console.log(changedPass);
            return changedPass.data;
            //throw new Error(update);
        }
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

export const forgotPassword = async (user) => {
    var data = {
        user
    };

    try {

        const forgottenPass = await axios.put(URL_PUT_USER_FORGOT_PASSWORD, data);

        if (forgottenPass.status === 200){
            return forgottenPass.data;
        } else {
            console.log(forgottenPass);
            return forgottenPass.data;
            //throw new Error(update);
        }

    } catch (error) {
        
        let errorObj;
        const {response} = error;
        errorObj = {
            title: 'Correo no enviado',
            text: response.data.message
          }
        console.log(response);
        //throw errorObj;
        return errorObj;
    
    }

}

export const restorePassword = async(token, newPass) => {

    var data = {
        newPass: newPass
    }

    try {

        const restoredPass = await axios.put(URL_PUT_USER_RESTORE_PASSWORD, data, {headers: {'reset':token}});
        if (restoredPass.status === 200){
            return restoredPass.data;
        } else {
            console.log(restoredPass);
            return restoredPass.data;
            //throw new Error(update);
        }

    } catch (error) {
        
        let errorObj;
        const {response} = error;
        console.log(error);
        errorObj = {
            title: 'Contraseña no cambiada',
            text: response.data.message
          }
        console.log(response);
        //throw errorObj;
        return errorObj;
    
    }

};

export const getUserByUsername = async (userName) => {

    try {
        var user = await axios.get(`${URL_GET_GET_USERNAME}${userName}`);
        if (user.status !== 200) console.log(user.data);
        return user.data;
    } catch (error) {
        let errorObj;
        const { response } = error;
        errorObj = {
            title: 'No se obtuvo un usuario',
            text: response.data.message
        }
        console.log(response);
        //throw errorObj;
        return errorObj;
    }

};