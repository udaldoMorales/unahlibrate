import React, { useRef } from 'react';
import '../cards/Cards.css';
import CardItem from '../cards/CardItem';
import { URL_GET_IMAGE_BOOK } from '../../../constants/urls';

function Cards(props) {

	const formarGrupos = (libros) => {

		var numLibros = libros.length;
		var numGrupos = Math.ceil(numLibros / 4);
		var grupos = [];
		var contador = 0;
		for (var i = 0; i < numGrupos; i++) {
			grupos[i] = [];
			for (var j = 0; j < 4; j++) {
				if (libros[contador]) {
					//console.log(props.libros[contador]);
					grupos[i].push(libros[contador]);
				
					//console.log(grupos[i]);
					contador++;
				} else {
					grupos[i].push('Empty');
					contador++;
				}
			}
		}

		return grupos;

	};

	if (!props.libros) {
		return (
			<div className='cards'>
				<h1>Revisa los libros que tenemos para ti!</h1>
				<div className='cards__container'>
					<div className='cards__wrapper'>
						<ul className='cards__items'>
							<CardItem
								src='images/8.jpg'
								text='Expediciones matematicas es una amena seleccion de
							mas de quinientos problemas de diferentes epocas y civilizaciones...'
								label='Matematicas'
								path='/registro'
							/>
							<CardItem
								src='images/3.jpg'
								text='La literatura nos ayuda a vivir y nos permite responder mejor
							a nuestra vocacion de seres humanos. Estas dos ideas sencillas...'
								label='Literatura'
								path='/registro'
							/>
							<CardItem
								src='images/1.jpg'
								text='Quiénes son los millennials colombianos presenta los resultados de una 
							investigación que tuvo como objetivo conocer...'
								label='Cultural'
								path='/registro'
							/>
							<CardItem
								src='images/2.jpg'
								text='​Indaga en la relación entre emociones, 
							expresiones faciales y la cultura en ese tipo de encuentros...'
								label='Cultural'
								path='/registro'
							/>
						</ul>
						<ul className='cards__items'>
							<CardItem
								src='images/9.jpg'
								text='Para los que nacimos en la segunda mitad del siglo XX 
							y algunos en este siglo, el nombre Baldor es sinónimo de conocimiento, educación, calidad...'
								label='Matematicas'
								path='/registro'
							/>
							<CardItem
								src='images/4.jpg'
								text='El presente libro hace parte de una gran publicación sobre Minería y desarrollo 
							elaborada por un grupo interdisciplinario de más de noventa investigadores...'
								label='Historia'
								path='/registro'
							/>
							<CardItem
								src='images/6.jpg'
								text='La explotación indiscriminada de los recursos ambientales nos ha llevado 
							a pensar que somos externos al medio ambiente...'
								label='Ambiental'
								path='/registro'
							/>
							<CardItem
								src='images/7.jpg'
								text='Libro para la formacion integral de ambientes educativos sin importar
							el grado educativo llevado...'
								label='Cultural'
								path='/registro'
							/>

						</ul>
					</div>
				</div>
			</div>
		);
	} else {

		var gruposDeCuatro = formarGrupos(props.libros);
		//console.log("numero de libros",numLibros);
		//console.log("numero de grupos",numGrupos);
		console.log(gruposDeCuatro);

		


		return (
			<div className='cards'>
				<div className='cards__container'>
					<div className='cards__wrapper'>
							
							{
								gruposDeCuatro.map((grupo, index) => {
									return (
										<div className='cards__items'>

											{grupo.map((libro, index) => {
												return (
													<React.Fragment>
													{(libro !== 'Empty') ?
													<CardItem
														src={`${URL_GET_IMAGE_BOOK}${libro.image}`}
														text={libro.description}
														label={libro.title}
														path='/perfilusuario'
													/> :
													<li className='cards__item_empty'></li>
													}
													</React.Fragment> 
												);
											})}

										</div>
										);
								})
							}

					</div>
				</div>
			</div>
		)
	}
}

export default Cards;
