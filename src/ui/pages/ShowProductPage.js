import React, { Component } from "react";
import '../css/addproductpage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class ShowProductPage extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            isValid: true,
            product: props.product
        }

    }

    async updateProduct(event) {

        event.preventDefault();

        const id = this.state.product.id;

        const name = document.getElementById('tf-name').value.toLowerCase();
        const stock = document.getElementById('tf-stock').value;
        const code = document.getElementById('tf-code').value || '';
        const sku = document.getElementById('tf-sku').value || '';

        const oldName = this.state.product.name;
        const oldStock = this.state.product.stock;
        const oldCode = this.state.product.code;
        const oldSku = this.state.product.sku;

        if (name == oldName && stock == oldStock && code == oldCode && sku == oldSku) {

            alert('Cambios Guardados.');
            window.api.send('closeShowProductPage')

        } else {

            let result = await window.api.invoke('updateProduct', {id, name, stock, code, sku});
            
            if (result) {
                window.api.send('closeShowProductWindow')
                window.api.send('reloadHomePage')
            }

        }

    }

    async deleteProduct(){

        let result = await window.api.invoke('deleteProduct', this.state.product.id);

        if (result) {
            window.api.send('closeShowProductWindow')
            window.api.send('reloadHomePage')
        }

    }

    onChange() {

        const name = document.getElementById('tf-name').value;
        const stock = document.getElementById('tf-stock').value;

        if (Boolean(name) && Boolean(stock)) {

            this.setState({
                isValid: true
            })

        } else {

            this.setState({
                isValid: false
            })

        }

    }

    render() {console.log(this.state.product)
        return (
            <div className="c-container">
                <div className="m-auto form-control">
                    <h2>EDITAR PRODUCTO</h2>
                    <form className="form" id="form" onSubmit={this.updateProduct}>
                        <div className="container p-1">
                            <TextField
                                autoFocus={true}
                                id="tf-name"
                                label="Nombre"
                                variant="outlined"
                                className="form-control"
                                onChange={this.onChange}
                                inputProps={{ maxLength: 40 }}
                                defaultValue={this.state.product.name} />
                        </div>
                        <div className="container p-1">
                            <TextField
                                id="tf-stock"
                                label="Stock"
                                variant="outlined"
                                className="form-control"
                                onChange={this.onChange}
                                inputProps={{ type: 'number' }}
                                defaultValue={this.state.product.stock} />
                        </div>
                        <div className="container p-1">
                            <TextField
                                id="tf-code"
                                label="Código de barras (Opcional)"
                                variant="outlined"
                                className="form-control"
                                defaultValue={this.state.product.code} />
                        </div>
                        <div className="container p-1">
                            <TextField
                                id="tf-sku"
                                label="SKU (Opcional)"
                                variant="outlined"
                                className="form-control"
                                defaultValue={this.state.product.sku} />
                        </div>
                        <div className="container p-1">
                            <Button
                                id="btn-delete"
                                variant="outlined"
                                className="form-control"
                                onClick={this.deleteProduct}
                                color="error">ELIMINAR</Button>
                        </div>
                        <div className="container p-1">
                            <Button
                                id="btn-save"
                                variant="contained"
                                type="submit"
                                className="form-control"
                                color="success"
                                disabled={!this.state.isValid}>GUARDAR</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}