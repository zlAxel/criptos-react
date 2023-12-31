import styled from "@emotion/styled";
import ImagenCripto from './assets/img/imagen-criptos.png'

import { useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { Cotizacion } from "./components/Cotizacion";
import { Spinner } from "./components/Spinner";

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	width: 90%;
	@media ( min-width: 992px ){
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`
const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0 auto;
	display: block;
`
const Heading = styled.h1`
	font-family: 'Lato', sans-serif;
	color: white;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;

	&::after{
		content: '';
		width: 120px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
		margin: 10px auto 0 auto;
	}
`

function App() {

	// ? Se crean los state 
	const [ datos, setDatos ] = useState({})
	const [ cotizacion, setCotizacion ] = useState({})
	const [ cargando, setCargando ] = useState(false)
	
	useEffect(() => {
		if( Object.keys(datos).length > 0 ){
			// ? Obtenemos objetos de datos con destructuring
			const { moneda, cripto } = datos
			// ? Consultar la API
			const cotizarCriptoAPI = async () => {
				setCargando( true ) // * Activamos el spinner
				// ? Consultar la API para obtener la cotización
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cripto }&tsyms=${ moneda }`
				const respuesta = await fetch(url)
				const resultado = await respuesta.json()
				setCotizacion( resultado.DISPLAY[cripto][moneda] )
				setCargando( false ) // * Desactivamos el spinner
			}
			cotizarCriptoAPI()
		}
	}, [ datos ])
	

	return (
		<Contenedor>
			<Imagen src={ ImagenCripto } alt="Banner de criptos" />
			<div>
				<Heading>Cotiza Criptomonedas al Instante</Heading>

				<Formulario setDatos={ setDatos } setCotizacion={ setCotizacion } />

				{ cargando ? 
					<Spinner /> 
				: 
					cotizacion.PRICE && <Cotizacion cotizacion={ cotizacion } /> 
				}
			</div>
		</Contenedor>
	)
}

export default App
