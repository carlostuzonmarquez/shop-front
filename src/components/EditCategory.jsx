import { useState } from "react"
import { editCategory } from "../services/editCategory"

export function EditCategory() {
    const categoryId = 16
    const [categoryName, setCategoryName] = useState()

    //actualiza el estado cada vez que el usuario actualiza
    const handleInputChange = (event) => {
        setCategoryName(event.target.value)

    }
    const handleSubmitValue = async (event) => {
        event.preventDefault();

        if (categoryName === '') {
            setCategoryName(document.getElementById('catName').value)
        }

        editCategory(categoryId, categoryName)
        setCategoryName();
    };
    return (
        <form onSubmit={handleSubmitValue}>
            <input type="text" name="name" id="catName"
                onChange={handleInputChange} />
            <button type="submit">editar</button>
        </form>
    )
}