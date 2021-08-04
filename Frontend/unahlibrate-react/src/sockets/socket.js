import io from 'socket.io-client';
//import {port} from '../../../../Backend/config/Global';
var port = process.env.PORT || 3900;
let socket = io(`http://localhost:${port}`);

export default socket;
