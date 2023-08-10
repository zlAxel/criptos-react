import styled from "@emotion/styled"

export const Cotizacion = ({ cotizacion }) => {

    // ? Obtenemos los objetos de cotizacion con destructuring
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion

    // ? Creamos el componente estilizado
    const Resultado = styled.ul`
        list-style: none;
        padding: 0;
        font-family: 'Lato', sans-serif;
        color: white;
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 50px;
        // * Asignamos estilos a los hijos <li>
        & li{
            font-size: 18px;
            font-family: 'Lato', sans-serif;
            span {
                font-weight: bold;
            }
        }
        // * Asignamos estilos a la imagen
        & li img{
            width: 100px;
        }
        // * Asignamos estilos al price
        & #price{
            font-size: 26px;
            margin-bottom: 15px;
        }
    `
    
    return (
        <Resultado>
            <li> 
                <img src={ `https://cryptocompare.com/${ IMAGEURL }` } alt="Imagen de la criptomoneda" /> 
            </li>
            <div>
                <li id="price">El precio es: <span>{ PRICE }</span></li>
                <li>Precio más alto del día: <span>{ HIGHDAY }</span></li>
                <li>Precio más bajo del día: <span>{ LOWDAY }</span></li>
                <li>Variación últimas 24 horas: <span>{ CHANGEPCT24HOUR }</span></li>
                <li>Última actualización: <span>{ LASTUPDATE }</span></li>
            </div>
        </Resultado>
    )
}
