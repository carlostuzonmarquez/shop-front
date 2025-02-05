import { useEffect, useState } from "react"
import Config from "../Config";
import { useUsers } from "../hooks/useUsers";
import { User } from "../components/user";
import { Link } from "react-router-dom";

export default function ListUsersPage() {
    const { users, setUsers, getUsers } = useUsers()

    const handleDelete = async (userId) => {
        await fetch(Config.BACKEND_URL + 'user/' + userId, {
            method: 'DELETE'
        })
        setUsers(users.filter((user) => user.id !== userId))
    }

    useEffect(() => {
        getUsers()
    }, [users])
    return (
        <>
            <Link to="/create/users" className="button">Create Users</Link>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>controls</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return <User key={user.id} id={user.id} name={user.username} handleDelete={handleDelete} />
                    })}
                </tbody>
            </table>

        </>
    )
}