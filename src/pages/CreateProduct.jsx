import { useEffect, useState } from "react"
import Config from "../Config"
import { useCategories } from "../hooks/useCategories"

export default function CreateProductPage() {
    const [product, setProduct] = useState({
        name: '',
        stock: '',
        description: '',
        price: ''
    })

    const { getCategories, categories, setCategories } = useCategories()
    useEffect(() => {
        getCategories()
    }, [])
    const handleName = (event) => {
        const newProduct = { ...product, name: event.target.value }
        setProduct(newProduct)
    }
    const handleStock = (event) => {
        const newProduct = { ...product, stock: event.target.value }
        setProduct(newProduct)
    }
    const handleDescription = (event) => {
        const newProduct = { ...product, description: event.target.value }
        setProduct(newProduct)
    }
    const handlePrice = (event) => {
        const newProduct = { ...product, price: event.target.value }
        setProduct(newProduct)
    }
    const handleSubmitValue = async (event) => {
        event.preventDefault();

        let chkCategories = document.getElementsByName('categories')
        let selectedCategories = []
        chkCategories.forEach((category) => {
            if (category.checked) {
                selectedCategories.push(category.value)
            }
        })

        const response = await fetch(Config.BACKEND_URL + 'product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: product.name,
                stock: product.stock,
                description: product.description,
                price: product.price,
                categories: selectedCategories
            })
        })
        const result = await response.json()
        console.log('respuesta del servidor', result)

        setProduct({
            id: '',
            name: '',
            stock: '',
            description: '',
            price: ''
        })
    }
    return (
        <form onSubmit={handleSubmitValue}>
            <input type="text" name="name" onBlur={handleName} />
            <input type="number" name="stock" onBlur={handleStock} />
            <textarea name="description" onBlur={handleDescription}></textarea>
            <input type="number" onBlur={handlePrice} />
            <button type="submit">enviar</button>
            <ul>{categories.map((category) => {
                return <li key={category.id}><input type="checkbox" name="categories" value={category.id} />{category.name}</li>
            })}</ul>
        </form>
    )
}