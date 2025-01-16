import { useEffect, useState } from "react"
import Config from "../Config"
import { Category } from "./Category"
import { useCategories } from "../hooks/useCategories"

export function ListCategories() {
    const { getCategories, categories, setCategories } = useCategories()
    useEffect(() => {
        getCategories()
    }, [])
    const handleDelete = (categoryId) => {
        fetch(Config.BACKEND_URL + 'category/' + categoryId, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                setCategories(json)
            })
    }

    return (
        <>
            <ul>
                {categories.map((category) => {
                    return <Category key={category.id} id={category.id} name={category.name} handleDelete={handleDelete} />
                })}
            </ul>
        </>
    )
}