export function Product({ id, name, handleDelete }) {
    return (

        <li >{name}
            <button onClick={() => {
                handleDelete(id)
            }}>borrar</button>
            <button>editar</button>
        </li>

    )
}