const {io} = require('./../app');
const chat = require('./../models/chat');

io.on('connection', connectedUser => {

    console.log('Llegué al socket este.');
	//Para que se mande un mensaje. "isImage es para saber si se manda imagen o no."
	
    connectedUser.on('conectado', (nombre) => {
        console.log('Conectaaaaado.');
        console.log('userName is: ' + nombre);
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
                                io.emit('chat', chats.messages);
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
                        io.emit('chat', chats.messages);
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
                io.emit('nochats', chats);
            } else {
                io.emit('chats', chats);
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
                   io.emit('nochat', 'None');
               } else {
                   io.emit('chat', chat.messages);
               }
           });

       });

});