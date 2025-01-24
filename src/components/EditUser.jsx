import { useState } from "react"
import { editUser } from "../services/editUser"

export function EditUser() {
    const userId = 13
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const handleName = (event) => {
        setUserName(event.target.value)
    }
    const handlePassword = (event) => {
        setUserPassword(event.target.value)
    }
    const handleSubmitUSer = async (event) => {
        event.preventDefault();
        editUser(userId, userName, userPassword)
        setUserName('')
        setUserPassword('')
    }
    return (
        <form onSubmit={handleSubmitUSer} >
            <input type="email" name='name' onBlur={handleName} />
            <input type="password" name='pasword' onBlur={handlePassword} />

            <button type="submit">Editar</button>
        </form>
    )
}