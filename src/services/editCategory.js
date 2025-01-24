import Config from "../Config";


export async function editCategory(id, name) {

    await fetch(Config.BACKEND_URL + 'category/edit', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, name: name }),

    });

} 