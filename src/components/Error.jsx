import styled from "@emotion/styled"

const MensajeError = styled.div`
    background-color: #b7322c;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

export const Error = ( { mensaje } ) => {
    return (
        <MensajeError>{ mensaje }</MensajeError>
    )
}
