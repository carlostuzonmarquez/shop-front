import { useEffect, useState } from "react";
import Config from "../Config";
import { useCategories } from "../hooks/useCategories";

export function EditProduct() {
    const productId = 26
    const [product, setProduct] = useState({
        id: '',
        name: '',
        stock: 0,
        description: '',
        price: 0,
        ProductCategory: []
    })
    const { categories, setCategories, getCategories } = useCategories()
    //een el useEfect no puede estar el async se deve crear una funcion para recuperar el producto
    const getProduct = async () => {
        const response = await fetch(Config.BACKEND_URL + 'product/' + productId)
        const json = await response.json()
        const newProduct = {
            id: json.id || '',
            name: json.name || '',
            stock: json.stock || 0,
            description: json.description || '',
            price: json.price || 0,
            ProductCategory: json.ProductCategory || []
        }
        setProduct(newProduct)
    }
    useEffect(() => {
        getProduct()
        getCategories()
    }, [])
    const handleNameChange = (event) => {
        const newProduct = { ...product, name: event.target.value }
        setProduct(newProduct)
    }
    const handleStockChange = (event) => {
        const newProduct = { ...product, stock: event.target.value }
        setProduct(newProduct)
    }
    const handleDescriptionChange = (event) => {
        const newProduct = { ...product, description: event.target.value }
        setProduct(newProduct)

    }
    const handlePriceChange = (event) => {
        const newProduct = { ...product, price: event.target.value }
        setProduct(newProduct)

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(Config.BACKEND_URL + 'product/edit', {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({ id: product.id, name: product.name, stock: product.stock, description: product.description, price: product.price })
        })
        setProduct({
            id: '',
            name: '',
            stock: 0,
            description: '',
            price: 0,
            ProductCategory: []
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleNameChange} type="text" value={product.name} />
            <input onChange={handleStockChange} type="number" value={product.stock} />
            <input onChange={handleDescriptionChange} type="text" value={product.description} />
            <input onChange={handlePriceChange} type="number" value={product.price} />
            <ul>{categories.map((category) => {
                let checked = false
                product.ProductCategory.forEach((productCategory) => {
                    if (productCategory.categoryId === category.id) {
                        checked = true
                    }
                })
                return <li key={category.id}><input type="checkbox" value={category.id} defaultChecked={checked ? 'checked' : ''} />{category.name}</li>
            })}</ul>

            <button type="submit">edit</button>
        </form>
    )
}