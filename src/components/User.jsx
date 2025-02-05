import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "./Icons";

export function User({ id, name, handleDelete }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>

            <td className="controls">
                <Link to={`/edit/user/${id}`}>
                    <EditIcon />
                </Link>
                <a onClick={() => { handleDelete(id) }}>
                    <DeleteIcon />
                </a>
            </td>
        </tr>

    )
}