const user = require('../models/user');
const {io} = require('./../app');
const chat = require('./../models/chat');

//Arreglo de usuarios conectados al socket.io. Cada conexión se registrará con un objeto {id: socket.id, user: user._id}.
var usuarios = [];

io.on('connection', connectedUser => {

    console.log('Llegué al socket este.');
	//Para que se mande un mensaje. "isImage es para saber si se manda imagen o no."
	
    connectedUser.on('conectado', (userId) => {
        console.log('Conectaaaaado.');
        console.log('userId is: ' + userId);
        console.log(connectedUser.id);
        usuarios.push({id: connectedUser.id, user: userId});
    });

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

        chat.findOneAndUpdate({ users: { "$all": [sender, receiver] } }, { "$push": { "messages": object } }, {new:true}, (err, foundChat) => {
            if (err){
                return {
                    status: 'error',
                    message: 'Error al encontrar chat'
                }
            } else if (!foundChat){
                //Se crearía el chat entre los dos usuarios.
                var chatToSave = new chat();
                chatToSave.users = [sender, receiver];
                chatToSave.messages = [];

                chatToSave.save((err, savedChat) => {
                    if (err){
                        return {
                            status: 'error',
                            message: 'Error al encontrar chat'
                        }
                    } else {
                        console.log(savedChat);
                        chat.findOneAndUpdate({ users: { "$all": [sender, receiver] } }, { "$push": { "messages": object } }, { new: true }, (err, updatedChat) => {
                            if (err) {
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
                                connectedUser.emit('chat', sender, receiver, chats.messages);
                                for (i in usuarios){
                                    if ((usuarios[i].user === sender) || (usuarios[i].user === receiver)) connectedUser.to(usuarios[i].id).emit('chat', sender, receiver, chats.messages)
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
                        connectedUser.emit('chat', sender, receiver, chats.messages);
                        for (i in usuarios){
                            if ((usuarios[i].user === sender) || (usuarios[i].user === receiver)) connectedUser.to(usuarios[i].id).emit('chat', sender, receiver, chats.messages)
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
                
                for (i in chats){

                    let chatWithUser = {}
                    let otherUserId;

                    for (j in chats[i].users){
                        if (chats[i].users[j] != userid) otherUserId = chats[i].users[j];
                    }
                    user.findById(otherUserId, (err, found) => {
                        if (found){

                            chatWithUser = {
                                chat: chats[i],
                                otherUser: found
                            };
                            chatsWithUsers.push(chatWithUser);

                            console.log('chatsWithUsers');
                            console.log(chatsWithUsers.length);
                            console.log('Emitiendo');
                            connectedUser.emit('chats', chatsWithUsers);
                            for (i in usuarios){
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
                   connectedUser.emit('nochat', sender, receiver, 'None');
               } else {
                   connectedUser.emit('chat', sender, receiver, chat.messages);
               }
           });

       });

});