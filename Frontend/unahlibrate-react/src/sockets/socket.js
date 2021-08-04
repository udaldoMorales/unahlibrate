import io from 'socket.io-client';

let socket = io("http://localhost:3900");

export default socket;