import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "./Icons";

export default function Category({ id, name, handleDelete }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>

      <td className="controls">
        <Link to={`/edit/category/${id}`}>
          <EditIcon />
        </Link>
        <a
          onClick={() => {
            handleDelete(id);
          }}
        >
          <DeleteIcon />
        </a>
      </td>
    </tr>
  );
}
