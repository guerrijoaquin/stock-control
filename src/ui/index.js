import React from "react";
import ReactDOMClient from "react-dom/client"
import { parse } from "query-string";

import AddProductPage from "./pages/AddProductPage";
import HomePage from "./pages/HomePage";
import ShowProductPage from "./pages/ShowProductPage";
import InfoPage from "./pages/InfoPage";

const QueryParams = parse(window.location.search);
const page = QueryParams.page;

const Root = ReactDOMClient.createRoot(document.getElementById('root'));

switch (page) {

    case 'HomePage':  RenderHomePage(); break;

    case 'AddProductPage': RenderAddProductPage(); break;

    case 'ShowProductPage': RenderShowProductPage(); break;

    case 'InfoPage': RenderInfoPage(); break

}

async function RenderHomePage(){

    let products = await window.api.invoke('getProducts');

    Root.render(<HomePage products={products} />)

}

function RenderAddProductPage(){
    Root.render(<AddProductPage/>)
}

function RenderShowProductPage() {
    Root.render(<ShowProductPage product={{
        id: QueryParams.pId,
        name: QueryParams.pName,
        stock: QueryParams.pStock,
        code: QueryParams.pCode,
        sku: QueryParams.pSku
    }}/>)
}

function RenderInfoPage() {
    Root.render(<InfoPage />)
}