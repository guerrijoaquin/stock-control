import React, { Component } from 'react';

export default class InfoPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <p>Stock Control es una sencilla herramienta para el control de existencias.<br />Al utilizar esta aplicación usted acepta las condiciones de uso que aquí se presentan.<br /> Adquiriendo el producto usted está autorizado para su uso con fines personales o comerciales. Queda terminantemente prohibida la redistribución del software, así como las alteraciones al mismo.<br />No solicitamos ni almacenamos datos del cliente.<br /> Todos los datos que usted guarde en esta aplicación serán almacenados en su dispositivo. No nos hacemos cargo por la pérdida de los mismos.<br /><br />Si usted tiene alguna consulta puede comunicarse con nosotros mediante correo electrónico: byjoacodevelopments@gmail.com</p>
            </div>
        )
    }

}