import React, {Component} from 'react';
import Navbar from './../Home/Navbar';
import './AboutUs.css';

class AboutUs extends Component {
	render(){
		return (
			<React.Fragment>
				<Navbar />
				<div>

					<div className="limiter">

					    <div className="container-login100 imgFormRegUs">

                            <div className="wrap-login200 p-l-50 p-r-50 p-t-50 p-b-30">

								<h1 className="login100-form-title">Esto es</h1>
								<img id='logounahlibrate-azul-about' className='center' src='/images/Logo-266fbd.png' height={55} alt="logo-unahlibrate"/>
								<div className="text-center w-full">

									<h3 className='p-b-30'>¡Bienvenid@ a este sitio!</h3> 
									<p>Esta es una plataforma hecha para la Universidad Nacional Autónoma de Honduras -y próximamente, más allá-.
									En esta plataforma, estudiantes, docentes y demás personas van a poder comprar o vender libros (estén usados o nuevos).</p>
									<p>Por el momento, un grupo de estudiantes estamos en el desarrollo de esta plataforma:</p>
									<ul id='lista' className='p-b-30'>
										<div className='centerList'>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Jordan Martínez</b>
											</p>
											
											<div className='clearFix'></div>
											
											<br/>
											<br/>

										</li>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Katherine Santos</b>
											</p>
											
											<div className='clearFix'></div>
											
											<br/>
											<br/>

										</li>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Lariza Sandoval</b>
											</p>

											<br/>
											<br/>

											<div className='clearFix'></div>

										</li>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Lisandro Suárez</b>
											</p>

											<br/>
											<br/>
											<div className='clearFix'></div>

										</li>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Lourdes Cárcamo</b>
											</p>
											<br/>
											<br/>
											<div className='clearFix'></div>

										</li>
										<li>

											<h4 className='idLista'>
												<i className="lnr lnr-user"></i>
											</h4>
											<p className='idLista letra'>
												<b>Udaldo Morales</b>
											</p>

											<br/>
											<br/>
											<div className='clearFix'></div>

										</li>
										</div>
									</ul>
									<p>Espera por el contenido que pronto tendremos para ti.</p>

								</div>

							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
			)
	}
}

export default AboutUs;