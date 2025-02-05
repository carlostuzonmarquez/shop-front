import Config from "../Config";

export async function editUser(id, name, password) {
    const response = await fetch(Config.BACKEND_URL + 'user/edit', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, username: name, password: password })

    })
    const json = await response.json()
    return json
}