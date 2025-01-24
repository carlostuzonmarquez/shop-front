import Config from "../Config"

export async function listUser() {
    const response = await fetch(Config.BACKEND_URL + 'user/list')
    const json = await response.json()
    return json
}