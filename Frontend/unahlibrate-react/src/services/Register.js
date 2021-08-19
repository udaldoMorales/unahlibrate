import axios from "axios";
import { URL_POST_SAVE_USER , URL_POST_SEND_MAIL} from "../constants/urls";

export const registerNormalUser = async (

  user,
  name,
  lastname,
  email,
  password
) => {
  const payload = {
    user,
    name,
    lastname,
    email,
    password
  };

  try { 
 
    const response = await axios.post(URL_POST_SAVE_USER, payload);
    console.log(response);

    if (response.status === 200) {
      //Enviar correo de verficacion 
      var dataUser = response.data;
      axios.post(URL_POST_SEND_MAIL , dataUser)
            .then(res => {
              return res.data;
            }).catch(err => {
                return {
                  status:"error",
                  err
                } 
            });
    } //else {
      //throw new Error(response);
    //}
  } catch (error) {
    let errorObj;
    
    
    const { response } = error;
    //if (response.status === 400) {
      errorObj = {
        title: 'Error',
        text: response.data.message
      }
    //} 
    //else {
      //errorObj = {
        //title: 'Error',
        //text: 'Ocurrió un error con el servidor, intente de nuevo'
      //}
    //}

    throw errorObj
  }
};
