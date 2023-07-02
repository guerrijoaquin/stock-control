import React, { Component } from 'react';
import '../css/homepage.css';
import SearchIcon from '@mui/icons-material/Search';

export default class HomePage extends Component {

    constructor(props){
        super(props);
        this.newProduct = this.newProduct.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.openProduct = this.openProduct.bind(this);
        
        this.state = {
            query: '',
            products: props.products,
            filteredProducts: props.products
        };
    }

    newProduct(){
        window.api.send('AddProductWindow')
    }

    async searchProducts(event){
        
        event.preventDefault()

        const query = document.getElementById('search-input').value.trim();

        if (query == '') {

            this.setState(prevState => {
                return {
                    ...prevState,
                    query: query,
                    filteredProducts: prevState.products
                }
            })

        } else {

            let result = await window.api.invoke('searchProducts', query);

            this.setState(prevState => {
                return {
                    ...prevState,
                    query: query,
                    filteredProducts: result
                }
            })

        }   

    }

    openProduct(event) {

        const id = event.target.getAttribute('data-id');
        const name = event.target.getAttribute('data-name');
        const stock = event.target.getAttribute('data-stock');
        const code = event.target.getAttribute('data-code');
        const sku = event.target.getAttribute('data-sku');

        window.api.send('ShowProductWindow', {id, name, stock, code, sku})

    }

    render(){
        return (
            <div className='c-container'>
                <div className='c-navbar navbar'>
                    <button className='btn btn-primary' onClick={this.newProduct}>NUEVO PRODUCTO</button>
                    <form id='search-form' className='form' onSubmit={e => e.preventDefault()}>
                        <div className="input-group">
                            <div className="form-outline">
                                <input type="search" onChange={this.searchProducts} id="search-input" className="form-control" placeholder='Nombre o SKU' defaultValue={this.state.query}/>
                            </div>
                            <button id='search-button' className="btn btn-primary">
                                <SearchIcon/> 
                            </button>
                        </div>
                    </form>
                </div>
                <div className='products'>
                    {this.state.filteredProducts.length != 0 ?
                        (this.state.filteredProducts.map(element => (
                            <div key={element.id}>
                                <button className='btn btn-default product p-2' 
                                        data-id={element.id} 
                                        data-name={element.name}
                                        data-stock={element.stock} 
                                        data-code={element.code} 
                                        data-sku={element.sku} 
                                        onClick={this.openProduct}>
                                    <p>{element.name}</p>
                                    <p>{element.stock}</p>
                                </button>
                                <hr />
                            </div>
                        )))
                        : (
                            <p className='m-3'>Aún no tienes productos.</p>
                        )
                    }

                </div>
            </div>
        )
    }

}