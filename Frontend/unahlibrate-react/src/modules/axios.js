import axios from "axios";
import SessionStorageService from "../services/Storage";
import Swal from "sweetalert2";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json"
  },
  data: {}
});

axiosConfig.interceptors.request.use(
  config => {
    const token = SessionStorageService.getToken();
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      await Swal.fire(
        'Sesion expirada',
        'Tu sesion acaba de caducar, seras redirigido a la pagina de inicio',
        'info')
      SessionStorageService.removeToken();
      window.location.href = "/";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
