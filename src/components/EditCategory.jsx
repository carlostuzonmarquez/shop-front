import { useState } from "react"
import Config from "../Config"
export function EditCategory() {
    const [categoryName, setCategoryName] = useState()
    const categoryId = 16
    //actualiza el estado cada vez que el usuario actualiza
    const handleInputChange = (event) => {
        setCategoryName(event.target.value)

    }
    const handleSubmitValue = async (event) => {
        event.preventDefault();

        if (categoryName === '') {
            setCategoryName(document.getElementById('catName').value)
        }

        const response = await fetch(Config.BACKEND_URL + 'category/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: categoryId, name: categoryName }),

        });
        // const result = await response.json();
        setCategoryName(); // Limpia el campo después del envío

    };
    return (
        <form onSubmit={handleSubmitValue}>
            <input type="hidden" value={categoryId} name="id" />
            <input type="text" name="name" id="catName"
                onChange={handleInputChange} />
            <button type="submit">editar</button>
        </form>
    )
}