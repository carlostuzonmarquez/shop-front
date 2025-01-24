import { useState } from "react"
import Config from "../Config"

export function CreateUser() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleUser = (event) => {
        setUser(event.target.value)
    }
    const handlePasword = (event) => {
        setPassword(event.target.value)
    }

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(Config.BACKEND_URL + 'user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: password }),
        })
        setUser('')
        setPassword('')
    }
    return (
        <form onSubmit={handleUserSubmit}>
            <input type="email" username='username' onBlur={handleUser} />
            <input type="password" onBlur={handlePasword} />
            <button type="submit">Crear Usuario</button>
        </form>
    )
}
