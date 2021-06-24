import React, {Component} from 'react';
import axios from 'axios';
import {URL_GET_USER_ACCESS, URL_GET_GET_USERNAME} from './../constants/urls';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {esUsuario} from '../services/Auth';
import {Link} from 'react-router-dom';

//this.props.location.state.

class Home extends Component {

	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	}

	state = {
			aute: this.props.cookies.get("auth"),
			refresco: this.props.cookies.get("refreshToken"),
			userName: this.props.cookies.get("user"),
			userLogged: {}, 
			user: {},
			allowed: {
				status: false,
				message: ''
			}
		};

	peticionDatoUsuario = async () => {
		var userName = this.props.location.state.user;
		console.log('me ejecuté acá.')
		try {
			var rrr = await axios.get(`${URL_GET_GET_USERNAME}${userName}`);
			this.setState({
				user: rrr.data.user[0]
			});
			//console.log('Este es response: ');
			//console.log(rrr);
			//console.log('Este es el usuario de peticion: ');
			//console.log(this.state.user);
		} catch(err) {
			let {response} = err;
			console.log(response);
		}
	} 

		thiis = () => {
			//console.log("Auth: " + this.state.aute);
			//console.log("Refresh: " + this.state.refresco);

			esUsuario(this.state.aute, this.state.refresco)
			.then(response => {
				console.log('Respuesta de Usuario:')
				console.log(response);
				if(response.status === 'error'){
					//No devolver nada.
					this.setState({
						allowed: {
							status: false,
							message: 'not'	
						}
					});

					console.log(this.state.allowed.message);

				} else if (response.status === 'noToken'){
					this.setState({
						allowed: {
							status: false,
							message: 'sentOff'
						}
					})
					console.log(this.state.allowed.message);
				}
				else if (response.status === 'newToken'){
					
					this.setState({
						aute: this.props.cookies.set('auth', response.accessToken),
						refresco: this.props.cookies.set("refreshToken", response.refreshToken),
						userLogged: this.state.user,
						allowed: {
							status: true,
							message: 'remain'
						}
					})

					console.log(this.state.allowed.message);

				} else if (response.status === 'noTokenExp'){
					this.setState({
						allowed: {
							status: false,
							message: 'out'
						}
					});
				} else if (response.status === 'success'){
					console.log('Cambié todo.');
					this.setState({
						userLogged: response.loggedUser,
						allowed: {
							status: true,
							message: 'in'
						}
					})

					console.log(this.state.allowed.message);
					console.log(this.state.userLogged);
				}
			})
			.catch(err => console.log(err));
		}

		logout = () => {
			//e.preventDefault();
			this.props.cookies.remove("auth");
			this.props.cookies.remove('refreshToken');
			this.props.cookies.remove('user');
		}

		componentWillMount(){
			if(this.props.location.state){
				//console.log('I executed here!');
				this.peticionDatoUsuario()
				.then(resp => console.log(resp));
				console.log(this.props.location.state.user);
			}
			this.thiis();
		}

	render () {

	if (this.state.allowed.status == false){
		return (<div>
		<div className="limiter">
				<div className="container-login100 lim2 imgFormRegUs">
				<div className="wrap-login200 lim p-l-50 p-r-50 p-t-100 p-b-100">
					<h1 className="login100-form-title p-b-30">Esto es UNAHLibrate</h1>
					

			<div className='text-center w-full'>
				<h2>No tienes acceso a este recurso.</h2>
					{this.state.allowed.message === 'out' &&
					<p>Tu sesión acabó, no puedes estar aquí.</p>
					}
					{this.state.allowed.message === 'sentOff' &&
					<p>No se puede acceder aquí, necesitas <Link className="txt1 bo1 hov1" to="/">
								iniciar sesión
							</Link>.</p>
					}
			</div>

					
				</div>
				</div>
				</div>
		</div>)
	} else {
		return (<div>
		<div className="limiter">
				<div className="container-login100 lim2 bkgImgLogIn">
				<div className="wrap-login200 p-l-50 p-r-50 p-t-90 p-b-30">
					<h1 className="login100-form-title p-b-30">Esto es UNAHLibrate</h1>
					

					<div className="text-center w-full">
					<p className='p-b-30'>Espera el contenido que pronto tendremos para ti.</p>
					
				<h2>Bienvenid@, {this.state.userName}.</h2> 
				{this.state.allowed.message === 'remain' &&
					<p className='p-b-30'>
					Sigues en línea.
					</p>
				}
				{this.state.allowed.message === 'in' &&
					<p className='p-b-30'>
					Estás en línea.
					</p>
				}

					<div className="text-center w-full">
							<span className="txt1 mr-2">¿Quieres terminar aquí? </span>
							<button onClick={this.logout} className="txt1 bo1 hov1">
								<Link to='/'> 
								Cerrar sesión
								</Link>
							</button>
						 </div>

						</div>

				</div>
				</div>
				</div>
		</div>)
	}
}

}

export default withCookies(Home);