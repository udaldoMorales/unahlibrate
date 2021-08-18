//import React,{useState} from 'react';
import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";

//Para mostrar bien la fecha de los mensajes JAJA.
import Moment from 'react-moment';
import 'moment/locale/es';

//Ruta para traer imágenes de usuario
import { URL_GET_IMAGE_USER, URL_GET_IMAGE_CHAT } from '../../../constants/urls';

//Importaciones para el chat
import socket from './../../../sockets/socket';

//Importación para otros chats.
import { chatsAndMore, buscarUsuarios, uploadImage, seenMessages } from "./../../../services/Chats";

//Importaciones del proyecto
import { peticionDatoUsuario, peticionDatoUsuario_Id, peticionUsuarioLoggeado } from '../../../services/Auth';
import { Redirect, useLocation } from 'react-router-dom';

//Cookies del proyecto
import Cookies from 'universal-cookie';

//Importacion para funcionamiento automatico de los scrolls
import ReactScrollableFeed from 'react-scrollable-feed';

const cookies = new Cookies();

const PanelChat = () => {

    //Definición de location, para cuando se manda desde el componente de "detLibro".
    const location = new useLocation();

    var usuario1;
    var usuario2;

    if (location.state) usuario1 = location.state.user1; else usuario1 = '';
    if (location.state) usuario2 = location.state.user2; else usuario2 = '';
    //Cosas del proyecto:
    //State que recibe el allow de peticionUsuarioLoggeado:
    const [allowed, setAllow] = useState({});

    //State que confirma una sesión iniciada:
    const [isSigned, setIsSigned] = useState(null);

    const [user, setUser] = useState({});

    const [user2, setUser2] = useState({});
    //Cosas del proyecto
    const [selectFile, setSelectFile] = useState(null);
    //Cosas para el chat entre dos
    const [mensajes, setMensajes] = useState(null);

    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    const [mensajeAEnviar, setMensajeAEnviar] = useState('');
    //Cosas para el chat entre dos

    //Cosas para los diferentes chats
    const [chatsConUsuario, setChats] = useState(null);

    const [chatsConUsuarioPet, setChatsPet] = useState(null);

    //Variable para guardar lo que venga de la búsqueda.
    const [busqueda, setBusqueda] = useState("");

    //Variable para guardar los usuarios de la búsqueda.
    const [usuariosBuscados, setUsuariosBuscados] = useState(null);

    //Variable de apoyo:
    const [selectedChat, setSelectedChat] = useState(null);

    const pedirLogg = async () => {

        try {

            //console.log(1);
            var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
            setAllow(response);
            setIsSigned(response.status);
            //console.log("Me ejecuté.")

        } catch (err) {
            console.log(err);
        }
    }

    //Recibe la información del usuario logeado
    const pedirDatos = async () => {

        try {
            //console.log(2);
            var rr = await peticionDatoUsuario(cookies.get('user'));
            //Para obtener la información del usuario 2 del chat.
            if (usuario2 !== '' && !user2._id) {
                var rr2 = await peticionDatoUsuario_Id(usuario2);
            }

            setUser(rr.user);
            //Mandar la info del usuario 2.
            if (rr2) {
                setUser2(rr2.user);
            }


        } catch (err) {
            console.log(err);
        }

    }

    const recibirMensajes = () => {

        var date = Date();

        socket.on('chat', (sender, receiver, messages, chat) => {

            console.log(date);
            console.log('\n--Chat--');
            console.log(`Sender: \t${sender}`);
            console.log(`Receiver: \t${receiver}`);
            console.log(`User: \t\t${user._id}`);
            console.log(`User2: \t\t${user2._id}`);
            console.log('\n');

            var aparicionUser1 = 0, aparicionUser2 = 0;

            if(user._id === sender) aparicionUser1 += 1;
            if(user._id === receiver) aparicionUser1 += 1;
            if(user2._id === sender) aparicionUser2 += 1;
            if(user2._id === receiver) aparicionUser2 += 1;

            console.log('AparicionUser1: ' + aparicionUser1);
            console.log('aparicionUser2: ' + aparicionUser2);
           
            if( (aparicionUser1 === 1 && aparicionUser2 === 1) ) {
                setMensajes(messages);
                if (user._id === receiver) verMensajes(sender, receiver);
            }else {
                console.log('AQUÍ TIENE QUE DAR ESE IF.');
                setMensajes(null);
                //socket.emit('individualChat', user._id, user2._id);
            }


        });

        socket.on('nochat', (sender, receiver, message, chat) => {

            console.log('\n--NoChat--');
            console.log(`Sender: ${sender}`);
            console.log(`Receiver: ${receiver}`);
            console.log(`User: ${user._id}`);
            console.log(`User2: ${user2._id}`);
            console.log('\n');

            console.log()
            if (

                ((sender === user._id) && (receiver === user2._id))
                ||
                ((sender === user2._id) && (receiver === user._id))
                
                ) {
                //console.log(`El sender es ${sender} y el receiver es ${receiver}`);
                setMensajes(message);

                //if (user._id === receiver) verMensajes(sender, receiver);
            }
        })

        socket.on('new', (chats) => {
            setChatsPet(chats);
        });

        setMensajeEnviado(false);

    };

    const pedirChats = (userId) => {
        //console.log('Pido chats con ' + userId);
        chatsAndMore(userId)
            .then((res) => {
                //console.log('Llego');
                if (res.status === 'success') {
                    setChatsPet(res.chats);
                }
            }
            )
            .catch((err) => console.log(err));
    }

    const verMensajes = (emisor, receptor) => {
        //setChatsPet(null);
        seenMessages(emisor, receptor)
        .then((res) => {
            if (res.status === 'success'){
                //setChatsPet(res.chats);
                console.log('Visto');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const cambiarBusqueda = (e) => {
        setBusqueda(e.target.value);
        if (busqueda === '') {
            setUsuariosBuscados(null);
        }
    };

    const busquedaUsuarios = () => {
        if (busqueda.trim() !== '') {
            buscarUsuarios(busqueda)
                .then((res) => {
                    if (res.status === 'success') {
                        //Asignar busqueda a variable de estado;
                        setUsuariosBuscados(res.users);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setUsuariosBuscados(null);
        }
        console.log(usuariosBuscados);
    }

    useEffect(() => {

        pedirDatos();
        pedirLogg();


        socket.on('users', (users) => {
            console.log(users)
        });

    }, [isSigned]);

    useEffect(() => {

        if (user && (user._id !== undefined) && user2) {

            console.log('Lo tomo de user');
            socket.emit('conectado', user._id);
            //socket.emit('obtainchats', user._id);
            pedirChats(user._id);
            console.log('Enviando chats desde user con ' + user._id);
            socket.emit('individualChat', user._id, user2._id);
        } else if (usuario2 !== '') {
            console.log('Lo tomo de prop.location.state');
            //socket.emit('conectado', user._id);
            //socket.emit('obtainchats', usuario1);
            pedirChats(user._id);
            socket.emit('individualChat', user._id, usuario2);
        }
        
        socket.on('users', (users) => {
            console.log(users)
        });

    }, [user]);

    useEffect(() => {

        if (user && (user._id !== undefined) && user2) {

            console.log('Lo tomo de user');
            //socket.emit('conectado', user._id);
            //socket.emit('obtainchats', user._id);
            pedirChats(user._id);
            //console.log('Enviando chats desde user con ' + user._id);
            socket.emit('individualChat', user._id, user2._id);
        } else if (usuario2 !== '') {
            console.log('Lo tomo de prop.location.state');
            //socket.emit('conectado', usuario1);
            //socket.emit('obtainchats', usuario1);
            pedirChats(user._id);
            socket.emit('individualChat', user._id, usuario2);
        }


    }, [user2, mensajeEnviado]);    

    useEffect(() => {

        recibirMensajes();


    }, [mensajes, user2, mensajeEnviado]);

    const enviarMensaje = function (e) {
        e.preventDefault();
        var nombreImagen = "";
        if (selectFile !== null) {
            const formData = new FormData();

            formData.append(
                'file0',
                selectFile,
                selectFile.name
            );

            uploadImage(formData)
                .then(res => {
                    if (res.status === 'success') {
                        nombreImagen = res.image;
                        console.log("Este es el res", res);
                        console.log("este es el nombre imagen", nombreImagen);
                        if (user2) {
                            socket.emit('message', nombreImagen, user._id, user2._id, true);
                        }
                        else {
                            socket.emit('message', nombreImagen, user._id, usuario2, true);
                        }
                        if (user && (user._id !== undefined)) {
                            //socket.emit('obtainchats', user._id);
                            pedirChats(user._id);
                            console.log('Pedí 3');
                        } else {
                            //socket.emit('obtainchats', usuario1);
                            pedirChats(usuario1);
                            console.log('Pedí 4');
                        }

                        let div = document.getElementById("imagenLibro");
                        div.innerHTML = "";
                        setSelectFile(null);
                        setMensajeEnviado(true);
                        setMensajeAEnviar('');

                    }
                }).catch((err) => { console.log(err) });

        }
        if (mensajeAEnviar !== '') {
            console.log(mensajeAEnviar)
            if (user2) {
                console.log('Envío una vez.');
                socket.emit('message', mensajeAEnviar, user._id, user2._id, false);
            }/*
            else {
                socket.emit('message', mensajeAEnviar, user._id, usuario2, false);
            }*/

            if (user && (user._id !== undefined)) {
                //socket.emit('obtainchats', user._id);
                pedirChats(user._id);
                console.log('Pedí');
            } else {
                //socket.emit('obtainchats', usuario1);
                pedirChats(usuario1);
                console.log('Pedí 2');
            }

            setMensajeEnviado(true);
            setMensajeAEnviar('');
        }
    }

    const cargarImagen = (e) => {

        let fileReader = new FileReader();
        setSelectFile(e.target.files[0]);
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onload = () => {
            let div = document.getElementById("imagenLibro");

            let image = document.createElement('img');
            image.src = fileReader.result;
            image.alt = "Imagen del libro";
<<<<<<< HEAD
            image.style = "width: 80px; height: 80px; object-fit:cover;"
=======
            //image.style = "width: 235px; height: 238px; object-fit:cover;"
            image.className="imagenEnviar"
>>>>>>> b443b2f425418b299b4efc45c544afb9f43db286
            div.innerHTML = '';
            div.append(image);

        }
    }

    if (isSigned === false) {
        return (
            <Redirect to='/' />
        );
    } else if (isSigned === true) {
        return (
            <React.Fragment>
                <Navbar />

                <section className="body-chat">
                    <div className="seccion-titulo">
                        <h3 className="titulo2">
                            <i className="fas fa-comments icono-msj"></i>
                            Sistema de mensajería
                        </h3>
                    </div>
                    <div className="seccion-usuarios">
                        <div className="seccion-buscar">
                            <div className="input-buscar">
                                <input type="search" value={busqueda} onChange={cambiarBusqueda} placeholder="Buscar usuario" />
                                <i onClick={busquedaUsuarios} className="fas fa-search"></i>
                            </div>
                        </div>
                        <div className="scroll-lista-usuario">
                            <div className="seccion-lista-usuarios">
                                {(chatsConUsuarioPet !== null && chatsConUsuarioPet !== [] && busqueda === '') &&
                                    chatsConUsuarioPet.map((chat, i) => {
                                        return (
                                            chat.users.map((otherUser, j) => {
                                                if (otherUser._id !== (user._id || usuario1)) {

                                                    return (
                                                        <div key={i} className="usuario" onClick={() => { setUser2(otherUser) }}>
                                                            <div className="avatar">
                                                                {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                                {otherUser.imageProfile !== '' &&
                                                                    <img src={`${URL_GET_IMAGE_USER}${otherUser.imageProfile}`} alt="" />
                                                                }
                                                                
                                                                {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                                {/*otherUser.imageProfile !== '' &&
                                                                    <img src={`${otherUser.imageProfile}`} alt="" />
                                                                */}                                                                
                                                                {(otherUser.imageProfile === '' || otherUser.imageProfile === undefined) &&
                                                                    <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                                                }
                                                                {/*<span className="estado-usuario enlinea"></span>*/}
                                                            </div>
                                                            <div className="cuerpo">
                                                                <span>{otherUser.user}</span>
                                                            </div>
                                                            {(chat.notificationTo === (user._id || usuario1)) &&
                                                            <span className="notificacion">!</span>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            })
                                        )
                                    })
                                }
                                {(chatsConUsuarioPet === []) &&
                                    <div className='usuario'>
                                        No hay chats.
                                    </div>
                                }
                                {(chatsConUsuarioPet === null) &&
                                    <div className='usuario'>
                                        Cargando...
                                    </div>
                                }
                                {(usuariosBuscados !== null && busqueda !== '') &&
                                    <div>Búsquedas con '{busqueda}'</div>
                                }
                                {(usuariosBuscados !== null && busqueda !== '') &&

                                    usuariosBuscados.map((userO, i) => {
                                        if (userO._id !== (user._id || usuario1)) {

                                            return (
                                                <div key={i} className="usuario" onClick={() => { setUser2(userO) }}>
                                                    <div className="avatar">
                                                        {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                        {userO.imageProfile !== '' &&
                                                            <img src={`${URL_GET_IMAGE_USER}${userO.imageProfile}`} alt="" />
                                                        }
                                                        {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                        {/*userO.imageProfile !== '' &&
                                                            <img src={`${userO.imageProfile}`} alt="" />
                                                        */}
                                                        {(userO.imageProfile === '' || userO.imageProfile === undefined) &&
                                                            <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                                        }
                                                        {/*<span className="estado-usuario enlinea"></span>*/}
                                                    </div>
                                                    <div className="cuerpo">
                                                        <span>{userO.user}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="seccion-chat">
                        <div className="usuario-seleccionado">
                            {((user2 || usuario2) && mensajes !== null) &&
                                <div className="avatar">
                                    {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                    {user2.imageProfile !== '' &&
                                        <img src={`${URL_GET_IMAGE_USER}${user2.imageProfile}`} alt="" />
                                    }
                                    {/*Con el Heroku y el Google Drive, se usa este.*/}
                                    {/*user2.imageProfile !== '' &&
                                        <img src={`${user2.imageProfile}`} alt="" />
                                    */}
                                    {(user2.imageProfile === '' || user2.imageProfile === undefined) &&
                                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                    }
                                </div>
                            }
                            <div className="cuerpo">

                                {user2.user !== '' &&
                                    <span>{user2.name} {user2.lastname}</span>
                                }
                                {user2.user !== '' &&
                                    <span>{user2.user}</span>
                                }
                                {(user2.user === '' || user.user === undefined) &&
                                    <span>Cargando...</span>
                                }
                                {/*<span>Activo - Escribiendo...</span>*/}
                            </div>

                        </div>
                        
                        <div className="panel-chat">
                        <ReactScrollableFeed>
                            {!usuario2 && mensajes === null &&
                                <span>Selecciona o busca un usuario para chatear.</span>
                            }
                            {(mensajes instanceof Array) &&
                                mensajes.map((mensaje, i) => {
                                    if (mensaje.sender === user._id) {
                                        return (
                                            <div key={i} className="mensaje left">
                                                <div className="cuerpo">

                                                    <div className="texto">
                                                        {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                        {mensaje.type === "image" &&

                                                            <img src={`${URL_GET_IMAGE_CHAT}${mensaje.content}`} alt="imagen enviada en chat" style={{maxHeight:"200px", maxWidth:"200px"}} />

                                                        }
                                                        {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                        {/*mensaje.type === "image" &&

                                                            <img src={`${mensaje.content}`} alt="imagen enviada en chat" style={{maxHeight:"200px", maxWidth:"200px"}} />

                                                        */}
                                                        {mensaje.type === "string" &&
                                                            mensaje.content
                                                        }
                                                        <span className="tiempo">
                                                            <i className="far fa-clock"></i>
                                                            <Moment locale='es' fromNow>{mensaje.date}</Moment>
                                                        </span>
                                                    </div>

                                                </div>
                                                <div className="avatar">
                                                    {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                    {user.imageProfile !== '' &&
                                                        <img src={`${URL_GET_IMAGE_USER}${user.imageProfile}`} alt="" />
                                                    }
                                                    {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                    {/*user.imageProfile !== '' &&
                                                        <img src={`${user.imageProfile}`} alt="" />
                                                    */}
                                                    {(user.imageProfile === '' || user.imageProfile === undefined) &&
                                                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={i} className="mensaje">
                                                <div className="avatar">
                                                    {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                    {user2.imageProfile !== '' &&
                                                        <img src={`${URL_GET_IMAGE_USER}${user2.imageProfile}`} alt="" />
                                                    }
                                                    {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                    {/*user2.imageProfile !== '' &&
                                                        <img src={`${user2.imageProfile}`} alt="" />
                                                    */}
                                                    {(user2.imageProfile === '' || user.imageProfile === undefined) &&
                                                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                                    }
                                                </div>
                                                <div className="cuerpo">

                                                    <div className="texto">
                                                        {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                                                        {mensaje.type === "image" &&

                                                            <img src={`${URL_GET_IMAGE_CHAT}${mensaje.content}`} alt="imagen enviada en chat" style={{maxHeight:"200px", maxWidth:"200px"}} />

                                                        }
                                                        {/*Con el Heroku y el Google Drive, se usa este.*/}
                                                        {/*mensaje.type === "image" &&

                                                            <img src={`${mensaje.content}`} alt="imagen enviada en chat" style={{maxHeight:"200px", maxWidth:"200px"}} />

                                                        */}
                                                        {mensaje.type === "string" &&
                                                            mensaje.content
                                                        }
                                                        <span className="tiempo">
                                                            <i className="far fa-clock"></i>
                                                            <Moment locale='es' fromNow>{mensaje.date}</Moment>
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {(mensajes === 'None') && <div>Sin mensajes, aún.</div>}
                            </ReactScrollableFeed>
                        </div>
                       
                        <div className="panel-escritura">
                            {/*<form className="textarea">*/}
                            <form onSubmit={enviarMensaje} enctype='multipart/form-data' className="textarea">
                                <div className="opcines">

                                    <button type="button">
                                        <i className="far fa-image"></i>
                                        <label for="img"></label>
                                        <input type="file" id="img"
                                            name="file0"
                                            onChange={cargarImagen}
                                            accept="image/*"
                                        />
                                    </button>
                                </div>
                                <textarea value={mensajeAEnviar} onChange={e => setMensajeAEnviar(e.target.value)} placeholder="Escribir mensaje"></textarea>
                                <div id="imagenLibro"></div>
                                <button type="submit" className="enviar">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Navbar />
            </React.Fragment>
        );
    }

};

export default PanelChat;

//Código del componente que hizo Katherine. Ps: Por si algo pasa JAJA.
/*
return (
    <React.Fragment>
        <Navbar />

        <section className="body-chat">
            <div className="seccion-titulo">
                <h3 className="titulo2">
                    <i className="fas fa-comments icono-msj"></i>
                    Sistema de mensajería
                </h3>
            </div>
            <div className="seccion-usuarios">
                <div className="seccion-buscar">
                    <div className="input-buscar">
                        <input type="search" placeholder="Buscar usuario" />
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="seccion-lista-usuarios">
                    <div className="usuario">
                        <div className="avatar">
                            <img src={img1} alt="" />
                            <span className="estado-usuario enlinea"></span>
                        </div>
                        <div className="cuerpo">
                            <span> Nombre apellido</span>
                            <span>detalles de mensaje</span>
                        </div>
                        <span className="notificacion">
                            3
                        </span>
                    </div>
                    <div className="usuario">
                        <div className="avatar">
                            <img src={img3} alt="" />
                            <span className="estado-usuario ocupado"></span>
                        </div>
                        <div className="cuerpo">
                            <span> Nombre apellido</span>
                            <span>detalles de mensaje</span>
                        </div>
                        <span className="notificacion">
                            1
                        </span>
                    </div>
                    <div className="usuario">
                        <div className="avatar">
                            <img src={img2} alt="" />
                            <span className="estado-usuario desconectado"></span>
                        </div>
                        <div className="cuerpo">
                            <span> Nombre apellido</span>
                            <span>detalles de mensaje</span>
                        </div>
                        <span className="notificacion">
                            1
                        </span>
                    </div>
                </div>
            </div>

            <div className="seccion-chat">
                <div className="usuario-seleccionado">
                    <div className="avatar">
                        <img src={img3} alt="" />
                    </div>
                    <div className="cuerpo">
                        <span>Nombre de usuario</span>
                        <span>Activo - Escribiendo...</span>
                    </div>

                </div>
                <div className="panel-chat">
                    <div className="mensaje">
                        <div className="avatar">
                            <img src={img3} alt="" />
                        </div>
                        <div className="cuerpo">

                            <div className="texto">
                                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                                <span className="tiempo">
                                    <i className="far fa-clock"></i>
                                    Hace 5 min
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="mensaje left">
                        <div className="cuerpo">

                            <div className="texto">
                                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                                <span className="tiempo">
                                    <i className="far fa-clock"></i>
                                    Hace 6 min
                                </span>
                            </div>

                        </div>
                        <div className="avatar">
                            <img src={img4} alt="" />
                        </div>
                    </div>
                    <div className="mensaje">
                        <div className="avatar">
                            <img src={img3} alt="" />
                        </div>
                        <div className="cuerpo">

                            <div className="texto">
                                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                                <span className="tiempo">
                                    <i className="far fa-clock"></i>
                                    Hace 3 min
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="mensaje left">
                        <div className="cuerpo">

                            <div className="texto">
                                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                                <span className="tiempo">
                                    <i className="far fa-clock"></i>
                                    Hace 2 min
                                </span>
                            </div>

                        </div>
                        <div className="avatar">
                            <img src={img4} alt="" />
                        </div>
                    </div>

                </div>
                <div className="panel-escritura">
                    <form className="textarea">
                        <div className="opcines">
                            <button type="button">
                                <i className="fas fa-file"></i>
                                <label for="file"></label>
                                <input type="file" id="file" />
                            </button>
                            <button type="button">
                                <i className="far fa-image"></i>
                                <label for="img"></label>
                                <input type="file" id="img" />
                            </button>
                        </div>
                        <textarea placeholder="Escribir mensaje"></textarea>
                        <button type="button" className="enviar">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </React.Fragment>
)
*/