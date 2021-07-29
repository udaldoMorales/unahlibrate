import io from 'socket.io-client';

let socket = io("http://localhost:3901");

export default socket;