const user = require('../models/user');
const { connect } = require('../routes/user_routes');
const { io } = require('./../app');
const chat = require('./../models/chat');

//Arreglo de usuarios conectados al socket.io. Cada conexión se registrará con un objeto {id: socket.id, user: user._id}.
var usuarios = [];
var date = new Date();

io.on('connect', connectedUser => {

    console.log('Llegué al socket este con '+ connectedUser.id);
    usuarios.push({id: connectedUser.id});
    console.log(usuarios);
    //Para que se mande un mensaje. "isImage es para saber si se manda imagen o no."

    connectedUser.on('conectado', (userId) => {
        console.log('Usuarios antes de comprobar');
        console.log(usuarios);

            for (let i in usuarios){
                if (usuarios[i].id === connectedUser.id) {
                    usuarios[i].user = userId;
                    break;
                }
            }
        
        console.log('Usuarios conetados al socket:')
        console.log(usuarios);
        connectedUser.emit('users', usuarios);
    });

    connectedUser.on('disconnect', () => {
        console.log('Desconectado');
        var usuario = false;
        for (var i in usuarios){
            if (usuarios[i].id === connectedUser.id) {
              usuario = true;
              break;  
            } 
        };
        if (usuario){
            let eliminado = usuarios.splice(i, 1);    
        }
        
        console.log(usuarios);
    })

    connectedUser.on('message', (message, sender, receiver, isImage) => {

        //Aquí empieza el relajo
        let dateMessage = new Date();
        let hourMessage = dateMessage.getHours();

        var object = {
            date: dateMessage,
            hour: hourMessage,
            content: message,
            sender: sender,
            receiver: receiver
        }

        if (isImage) object.type = 'image';
        else object.type = 'string';

        //Primero, tengo que buscar si hay un chat de los dos usuarios:

        chat.findOneAndUpdate({ users: { "$all": [sender, receiver] } }, { updatedAt: dateMessage, "$push": { "messages": object }, notificationTo: receiver, $inc:{"alerts": 1}}, { new: true }, (err, foundChat) => {
            if (err) {
                console.log('Este es err');
                console.log(err);
                return {
                    status: 'error',
                    message: 'Error al encontrar chat'
                }
            } else if (!foundChat) {
                //Se crearía el chat entre los dos usuarios.
                var chatToSave = new chat();
                chatToSave.users = [sender, receiver];
                chatToSave.messages = [];

                chatToSave.save((err, savedChat) => {
                    if (err) {
                        return {
                            status: 'error',
                            message: 'Error al encontrar chat'
                        }
                    } else {
                        console.log(savedChat);
                        chat.findOneAndUpdate({ users: { "$all": [sender, receiver] } }, { updatedAt: dateMessage, "$push": { "messages": object }, notificationTo: receiver, $inc:{"alerts": 1} }, { new: true }, (err, updatedChat) => {
                            if (err) {
                                console.log('Este es err');
                                console.log(err);
                                return {
                                    status: 'error',
                                    message: 'Error al actualizar'
                                };
                            } else {

                                chat.findOne({ users: { "$all": [sender, receiver] }, deleted: false }).sort('-date').exec((err, chats) => {
                                    if (err) {
                                        return {
                                            status: 'error',
                                            message: 'Error al devolver los chats'
                                        }
                                    } else if (!chats) {
                                        return {
                                            status: 'error',
                                            message: 'No hay chats que devolver para ese usuario'
                                        }
                                    } else {
                                        connectedUser.emit('chat', sender, receiver, chats.messages, chats);
                                        for (i in usuarios) {
                                            if (((usuarios[i].user === sender) || (usuarios[i].user === receiver)) && (usuarios[i].id !== connectedUser.id)){
                                                console.log(`\nMando desde message 1`);
                                                connectedUser.to(usuarios[i].id).emit('chat', sender, receiver, chats.messages, chats);
                                                if (usuarios[i].user === receiver){
                                                    pedirChats(connectedUser, usuarios[i].user, usuarios[i].id)
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                        });
                    }
                })
            } else {

                chat.findOne({ users: { "$all": [sender, receiver] }, deleted: false }).sort('-date').exec((err, chats) => {
                    if (err) {
                        return {
                            status: 'error',
                            message: 'Error al devolver los chats'
                        }
                    } else if (!chats) {
                        return {
                            status: 'error',
                            message: 'No hay chats que devolver para ese usuario'
                        }
                    } else {
                        connectedUser.emit('chat', sender, receiver, chats.messages, chats);
                        for (i in usuarios) {
                            if (((usuarios[i].user === sender) || (usuarios[i].user === receiver)) && (usuarios[i].id !== connectedUser.id)){
                                console.log(`\nMando desde message 2: ${sender}, ${receiver}`);
                                connectedUser.to(usuarios[i].id).emit('chat', sender, receiver, chats.messages, chats);
                                if (usuarios[i].user === receiver){
                                    pedirChats(connectedUser, usuarios[i].user, usuarios[i].id)
                                }
                            }
                        }
                    }
                })

            }
        });
        //Aquí termina el relajo

    });

    //Estos son para obtener todos los chats.
    connectedUser.on('obtainchats', (userid) => {
        //Empieza el relajo
        //chat.find({ users: { "$all": [userid] }, deleted: false }).sort('-date').exec((err, chats) => {
        chat.find({ users: { "$all": [userid] }, deleted: false }).exec((err, chats) => {
            if (err) {
                return {
                    status: 'error',
                    message: 'Error al devolver los chats'
                };
            } else if (!chats || chats.length == 0) {
                /*return {
                    status: 'error',
                    message: 'No hay chats que devolver para ese usuario'
                };*/
                connectedUser.emit('nochats', chats);
            } else {

                chatsWithUsers = [];

                for (i in chats) {

                    let chatWithUser = {}
                    let otherUserId;

                    for (j in chats[i].users) {
                        if (chats[i].users[j] != userid) otherUserId = chats[i].users[j];
                    }
                    user.findById(otherUserId, (err, found) => {
                        if (found) {

                            chatWithUser = {
                                chat: chats[i],
                                otherUser: found
                            };
                            chatsWithUsers.push(chatWithUser);

                            console.log('chatsWithUsers');
                            console.log(chatsWithUsers.length);
                            console.log('Emitiendo');
                            connectedUser.emit('chats', chatsWithUsers);
                            for (i in usuarios) {
                                if ((usuarios[i].user === userid)) connectedUser.to(usuarios[i].id).emit('chats', chatsWithUsers);
                            }

                        }
                    });

                }
            }
        });
        //Termina el relajo
    });

    connectedUser.on('individualChat', (sender, receiver) => {

        chat.findOne({ users: { "$all": [sender, receiver] }, deleted: false }).exec((err, chat) => {
            if (err) {
                return {
                    state: 'error',
                    message: 'Error al encontrar chat'
                }
            } else if (!chat) {
                console.log(`\nMando desde individualChat: None`);
                connectedUser.emit('nochat', sender, receiver, 'None');
            } else {
                console.log(`\nMando desde individualChat: ${sender}, ${receiver}`);
                connectedUser.emit('chat', sender, receiver, chat.messages, chat);
            }
        });

    });

});

function pedirChats (userSocket, receiver, idOtherSocket) {

    console.log('Imprimiendo '+ receiver);
    chat.find({ users: { "$all": [receiver] }, deleted: false }).sort('-updatedAt').exec((err, chats) => {
        //console.log(chats.length);
        //console.log(err);
        user.populate(chats, { path: 'users' }, (errr, chatss) => {
            if (err || errr || !chats) {
                console.log(errr);
                return ({
                    status: 'error',
                    message: 'Something happened'
                });
            } else {
                //console.log(chatss);
                userSocket.to(idOtherSocket).emit('new', chatss);
            }
        });
    });

};