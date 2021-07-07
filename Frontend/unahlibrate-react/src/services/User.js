import axios from "../modules/axios";
import { URL_POST_SAVE_USER, URL_PUT_USER_UPDATE} from "../constants/urls";

export const actualizarUsuario = async (
    id,
    user,
    name,
    lastname, 
    email,
    phone,
    ubication
) => {
    var data = {
        user: user,
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        ubication: ubication
    };
    try {

        console.log('Mando');
        var update = await axios.put(`${URL_PUT_USER_UPDATE}${id}`, data, {headers: {'Content-Type': 'application/json'}});
        if (update.status === 200){
            return update.data;
        } else {
            console.log(update);
            throw new Error(update);
        }

    } catch (err) {
        let errorObj;
        const {response} = err;

        errorObj = {
            title: 'Usuario no actualizado',
            text: response.data.message
          }
        console.log(response);
        throw errorObj;

    }
}