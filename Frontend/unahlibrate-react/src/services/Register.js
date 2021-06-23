import axios from "../modules/axios";
import { URL_POST_NORMAL_USER } from "../constants/urls";
import { UR_POST_ENTERPRISE_USER } from '../constants/urls';

export const registerNormalUser = async (
  email,
  password,
  phone,
  address,
  name,
  lastName,
  id,
  birthDate
) => {
  const payload = {
    email,
    password,
    phone,
    address,
    name,
    lastName,
    register_id: id,
    birth_date: birthDate,
  };
  try {
    const response = await axios.post(URL_POST_NORMAL_USER, payload);
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: 'Usuario no registrado',
        text: 'Ocurrió un error al intentar crear un usuario'
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



//empresa
export const registerCompanyUser = async (
  phone,
  address,
  company_name,
  contact_name,
  company_type,
  sector,
  email,
  password,
  rtn,
  contact_number,
  business_name
) => {
  const payload = {
    phone,
    address,
    company_name,
    contact_name,
    company_type,
    sector,
    email,
    password,
    rtn,
    contact_number,
    business_name
  }
  try {
    const response = await axios.post(UR_POST_ENTERPRISE_USER, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: 'Usuario no registrado',
        text: 'Ocurrió un error al intentar crear el usuario'
      }
    } else {
      errorObj = {
        title: 'Error',
        text: 'Ocurrió un error con el servidor, intente de nuevo'
      }
    }
    throw errorObj
  }
}
