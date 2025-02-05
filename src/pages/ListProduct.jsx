import { useEffect } from "react"
import { Product } from "../components/Product"
import { useProducts } from "../hooks/useProducts"
import { Link } from "react-router-dom"
export default function ListProductPage() {
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
            <Link to='/create/product' className="button">Create Products</Link>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>stock</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <Product key={product.id} id={product.id} name={product.name} price={product.price} handleDelete={handleDelete}> </Product>
                    })}
                </tbody>
            </table>

        </>
    )
}
