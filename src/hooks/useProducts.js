import { useState } from "react"
import { fetchProducts } from "../services/fetchProducts"

export function useProducts() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setProducts(await fetchProducts())
    }

    return { products, setProducts, getProducts }
}