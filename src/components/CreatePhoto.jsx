import { useState } from "react"
import Config from "../Config"

export function CreatePhoto() {
    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState(null)
    const handlePhotochange = (event) => {
        let file = event.target.files[0]
        setPhoto(file)
        // const previewUrl = URL.createObjectURL(file);
        // setPreview(previewUrl);
    }

    const handleSubmitValue = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('file', photo)
        const response = await fetch(Config.BACKEND_URL + 'photo/25', {
            method: 'POST',
            body: formData,
        })
        const result = await response.json();
        setPreview(result.photo)
        console.log(result.photo)
    }
    return (
        <>
            <img src={preview} alt="" />
            <form onSubmit={handleSubmitValue}>
                <label>Seleccionar Imagen:</label>
                <input type="file" accept="image/*" onChange={handlePhotochange} />

                <button type="supmit">subir Imagen</button>
            </form>
        </>
    )
}