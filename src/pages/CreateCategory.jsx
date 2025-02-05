import { useState } from "react"
import Config from "../Config"

export default function CreateCategoryPage() {
    const [categoryName, setCategoryName] = useState()
    //actualiza el estado cada vez que el usuario actualiza
    const handleInputChange = (event) => {
        setCategoryName(event.target.value)
        console.log(event.target.value)

    }
    const handleSubmitValue = async (event) => {
        event.preventDefault();

        if (categoryName === '') {
            setCategoryName(document.getElementById('catName').value)
        }

        const response = await fetch(Config.BACKEND_URL + 'category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),

        });
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        setCategoryName(); // Limpia el campo después del envío

    };
    return (
        <form onSubmit={handleSubmitValue}>
            <input type="text" name="name" id="catName" onChange={handleInputChange} />
            <button type="submit">enviar</button>
        </form>
    )

}