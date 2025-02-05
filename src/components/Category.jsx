import { DeleteIcon, EditIcon } from "./Icons";

export function Category({ id, name, handleDelete }) {


    return (
        <tr>
            <td>{id}</td>
            <td >{name}</td>
            <td>
                <td className="controls">
                    {/* <button>edit</button> */}
                    <EditIcon />
                    {/* <button onClick={() => {
                    handleDelete(id)
                }}>borrar</button> */}
                    <DeleteIcon />
                </td>
            </td>
        </tr>

    )
}