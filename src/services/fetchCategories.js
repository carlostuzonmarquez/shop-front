import Config from "../Config"

export async function fetchCategories() {
    const response = await fetch(Config.BACKEND_URL + 'category/list');
    const json = await response.json()
    return json
}