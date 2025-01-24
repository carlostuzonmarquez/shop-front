import { useEffect, useState } from "react"
import Config from "../Config";
import { useUsers } from "../hooks/useUsers";

export function ListUsers() {
    const { users, setUsers, getUsers } = useUsers()

    const handleDelete = async (userId) => {
        await fetch(Config.BACKEND_URL + 'user/' + userId, {
            method: 'DELETE'
        })
        setUsers(users.filter((user) => user.id !== userId))
    }

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <ul>
                {users.map((user) => {
                    return <li key={user.id}>{user.username}
                        <button onClick={() => {
                            handleDelete(user.id)
                        }}>eliminar</button> </li>
                })}
            </ul>
        </>
    )
}