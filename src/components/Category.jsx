export function Category({ id, name, handleDelete }) {


    return (
        <>
            <li >{name}</li>
            <button >editar</button>
            <button onClick={() => {
                handleDelete(id)
            }}>borrar</button>
        </>

    )
}