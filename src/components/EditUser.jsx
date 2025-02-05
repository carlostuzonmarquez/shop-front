import { useEffect, useState } from "react"
import { editUser } from "../services/editUser"
import { useNavigate, useParams } from "react-router-dom"
import Config from "../Config"

export function EditUser() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState([])

    const handleName = (event) => {
        setUserName(event.target.value)
    }

    const handlePassword = (event) => {
        setUserPassword(event.target.value)
    }

    const handleSubmitUSer = async (event) => {
        event.preventDefault();
        const json = await editUser(userId, userName, userPassword)
        if (json.message === 'ok') navigate('/users')
        setError(json.errorResponse.message)
    }

    const fetchUser = async () => {
        const response = await fetch(Config.BACKEND_URL + 'user/' + userId)
        const json = await response.json()
        setUserName(json.username)
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <form onSubmit={handleSubmitUSer} >
            <input type="email" value={userName} onBlur={handleName} onChange={handleName} />
            <input type="password" onBlur={handlePassword} />

            <button type="submit">Editar</button>
            <p>{error.map((e, index) => {
                return <label key={index}>{e}</label>
            })}</p>
        </form>
    )
}