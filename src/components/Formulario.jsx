import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { monedas } from "../data/monedas";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { Error } from "./Error";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    max-width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
    font-family: 'Lato', sans-serif;
    transition: background-color .3s ease;
    margin-top: 20px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({ setDatos, setCotizacion }) => {

    // ! --------------------------------------------------
    // ! Creamos los states

    const [ criptos, setCriptos ] = useState([])
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige la Moneda', monedas)
    const [ cripto, SelectCriptomoneda ] = useSelectMonedas('Elige la Criptomoneda', criptos)

    const [error, setError] = useState('')

    // ! --------------------------------------------------
    // ! Consumimos la api de criptomonedas con useEffect
    
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            
            const arrayCriptos = resultado.Data.map( cripto => {
                return {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
            })
            setCriptos( arrayCriptos );

        }
        consultarAPI()
    }, [])
    
    // ! --------------------------------------------------
    // ! Creamos el evento para el submit

    const handleSubmit = e => {
        e.preventDefault()

        // ? Validamos que los campos no estén vacíos
        if( [ moneda, cripto ].includes('') ){
            setError('Todos los campos son obligatorios')
            setCotizacion({}) // * Reiniciamos la cotización
            return
        }

        setError('')
        // ? Pasamos los datos al componente principal
        setDatos({
            moneda, 
            cripto
        })
    }
    
    // ! --------------------------------------------------
    // ! Retornamos el formulario

    return (
        <>
            { error && <Error mensaje={ error } /> }
            <form onSubmit={ handleSubmit }>
                <SelectMonedas />
                <SelectCriptomoneda />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}