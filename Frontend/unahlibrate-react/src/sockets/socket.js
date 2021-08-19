import io from 'socket.io-client';
//import {port} from '../../../../Backend/config/Global';
//var port = process.env.PORT || 3900;
let socket = io(`${window.location.hostname}`); //Este se usa cuando se está en local.

//let socket = io(`http://localhost:3900`); //Este se usa en producción.

export default socket;
