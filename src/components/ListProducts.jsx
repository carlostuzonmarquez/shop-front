import { useEffect } from "react";
import Config from "../Config";
import { Product } from "./Product";
import { useProducts } from "../hooks/useProducts";

export function ListProduct() {
    const { products, setProducts, getProducts } = useProducts()
    useEffect(() => {
        getProducts()
    }, [])
    const handleDelete = (productId) => {
        fetch(Config.BACKEND_URL + 'product/' + productId, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                setProducts(json)
            })
    }

    return (
        <>
            <ul>
                {products.map((product) => {
                    return <Product key={product.id} id={product.id} name={product.name} handleDelete={handleDelete}> </Product>
                })}
            </ul>
        </>
    )
}