import React, {useState, Component} from "react";
import '../css/addproductpage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class AddProductPage extends Component{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        
        this.state = {
            isValid: false
        };
    }

    async saveProduct(event){

        event.preventDefault();

        const name = document.getElementById('tf-name').value.toLowerCase();
        const stock = document.getElementById('tf-stock').value;
        const code = document.getElementById('tf-code').value || null;
        const sku = document.getElementById('tf-sku').value || null;
        
        let result = await window.api.invoke('saveProduct', {name, stock, code, sku});

        if (result) {
            window.api.send('reloadHomePage')
            window.api.send('closeAddProductWindow')
        }

    }

    onChange(){

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

    render () {
        return (
            <div className="c-container">
                <div className="m-auto form-control">
                    <h2>NUEVO PRODUCTO</h2>
                    <form className="form" id="form" onSubmit={this.saveProduct}>
                        <div className="container p-1">
                            <TextField 
                            autoFocus={true}
                                id="tf-name" 
                                label="Nombre" 
                                variant="outlined" 
                                className="form-control"
                                onChange={this.onChange}
                                inputProps={{ maxLength: 40 }} />
                        </div>
                        <div className="container p-1">
                            <TextField 
                                id="tf-stock" 
                                label="Stock" 
                                variant="outlined" 
                                className="form-control"
                                onChange={this.onChange}
                                inputProps={{ type: 'number' }} />
                        </div>
                        <div className="container p-1">
                            <TextField 
                                id="tf-code" 
                                label="Código de barras (Opcional)" 
                                variant="outlined" 
                                className="form-control" />
                        </div>
                        <div className="container p-1">
                            <TextField 
                                id="tf-sku" 
                                label="SKU (Opcional)" 
                                variant="outlined" 
                                className="form-control" />
                        </div>
                        <div className="container p-1">
                            <Button 
                                id="btn-save" 
                                variant="contained" 
                                type="submit"
                                className="form-control"
                                disabled={!this.state.isValid}>GUARDAR</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}