import { DeleteIcon, EditIcon } from "./Icons";

export function Product({ id, name, price, handleDelete }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td className="controls">
                <EditIcon />
                <DeleteIcon />
            </td>
            {/* <li >{name}
                <button onClick={() => {
                    handleDelete(id)
                }}>borrar</button>
                <button>editar</button>
            </li> */}
        </tr>


    )
}