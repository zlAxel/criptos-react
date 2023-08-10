import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: block;
    font-weight: 700;
    font-size: 24px;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    display: block;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 20px;
`

export const useSelectMonedas = ( label, opciones ) => {

    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <>
            <Label htmlFor="">{ label }</Label>
            <Select value={ state } onChange={ e => setState( e.target.value ) }>
                <option value="">Seleccione la opción</option>
                { opciones.map( opcion => (
                    <option key={ opcion.id } value={ opcion.id }>
                        { opcion.nombre }
                    </option>
                ) ) }
            </Select>
        </>
    )

    return [ state, SelectMonedas ]
    
}
