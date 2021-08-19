import React from 'react';
import '../catalogo/catalogo.css';
import CardItem from '../catalogo/card-item';
import { URL_GET_IMAGE_BOOK } from '../../../constants/urls';

function Cards_catalogo(props) {
  
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
  }
  

  if (!props.libros) {
    return (
        <div className='cards'>
            <div className='cards__container'>
              <div className='cards__wrapper'>
                <ul className='cards__items'>
                <CardItem
                    src='images/8.jpg'
                    text='Nombre del libro'
                    label='Matematicas'
                    path='/registro'
                  />
                 <CardItem
                    src='images/3.jpg'
                    text='Nombre del libro'
                    label='Literatura'
                    path='/registro'
                  />
                  <CardItem
                    src='images/1.jpg'
                    text='Nombre del libro'
                    label='Cultural'
                    path='/registro'
                  />
                  <CardItem
                    src='images/2.jpg'
                    text='Nombre del libro'
                    label='Cultural'
                    path='/registro'
                  />
                </ul>
                <ul className='cards__items'>
                  <CardItem
                    src='images/9.jpg'
                    text='Nombre del libro'
                    label='Matematicas'
                    path='/registro'
                  />
                  <CardItem
                    src='images/4.jpg'
                    text='Nombre del libro'
                    label='Historia'
                    path='/registro'
                  />
                  <CardItem
                    src='images/6.jpg'
                    text='Nombre del libro'
                    label='Ambiental'
                    path='/registro'
                  />
                  <CardItem
                    src='images/7.jpg'
                    text='Nombre del libro'
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
                          {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                          {/*(libro !== 'Empty') ?
                          <CardItem
                            src={`${URL_GET_IMAGE_BOOK}${libro.image}`}
                            text={libro.title}
                            label={`${libro.price} Lps`}
                            path={`/detalleLibro/${libro._id}`}
                            key={libro}
                          /> :
                          <li className='cards__item_empty'></li>
                          */}
                          {/*Con el Heroku y el Google Drive, se usa este.*/}
                          {(libro !== 'Empty') ?
                          <CardItem
                            src={`${libro.image}`}
                            text={libro.title}
                            label={`${libro.price} Lps`}
                            path={`/detalleLibro/${libro._id}`}
                          /> :
                          <div className='cards__item_empty'></div>
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

export default Cards_catalogo;
