import React, {Component} from 'react';
import axios from 'axios';
import {URL_GET_USER_ACCESS} from './../constants/urls';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {esUsuario} from '../services/Auth';

//this.props.location.state.

class Home extends Component {

	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	}

	state = {
    	aute: this.props.cookies.get("auth") || "",
    	refresco: this.props.cookies.get("refreshToken"),
    	userLogged: {}
  	};

  	thiis = () => {
  		esUsuario(this.state.userLogged, this.state.aute, this.state.refresco)
  		.then(response => {
  			console.log('Es usuario');
  			console.log(response);
  			if(response.status === 'error'){
  				//No devolver nada.
  			}
  			else if (response.status === 'newToken'){
  				
  				this.setState({
  					aute: this.props.cookies.set('auth', response.accessToken),
  					refresco: this.props.cookies.set("refreshToken", response.refreshToken),
  					userLogged: response.user
  				})

  			} else if (response.status === 'noTokenExp'){
  				//Se acabó la sesión
  			} else if (response.status === 'success'){
  				console.log('Cambié todo.');
  				this.setState({
  					userLogged: response.loggedUser
  				})
  				console.log(this.state.userLogged);
  			}
  		})
  		.catch(err => console.log(err));
  	}

  	componentWillMount(){
  		this.thiis();
  	}

	render () {
		return (
			<p>Hola, {this.props.location.state.user}.</p>
			)
	}
}

export default withCookies(Home);