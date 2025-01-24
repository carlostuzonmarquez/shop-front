import { useState } from "react"
import { listUser } from "../services/listUser"

export function useUsers() {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        setUsers(await listUser())
    }
    return { users, setUsers, getUsers }
}