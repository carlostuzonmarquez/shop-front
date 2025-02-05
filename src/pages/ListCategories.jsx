import { useEffect } from "react"
import { Category } from "../components/Category"
import Config from "../Config"
import { useCategories } from "../hooks/useCategories"
import { Link } from "react-router-dom"

export default function ListCategoriesPage() {
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
            <Link to="/create/category" className="button">
                Create Category
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>controls</th>

                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => {
                        return <Category key={category.id} id={category.id} name={category.name} handleDelete={handleDelete} />
                    })}
                </tbody>
            </table>


        </>
    )
}