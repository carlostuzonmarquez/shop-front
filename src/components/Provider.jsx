import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "./Icons";

export default function Provider({
  id,
  name,
  enterprice,
  phone,
  email,
  address,
  handleDelete,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{enterprice}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>
        <a
          onClick={() => {
            handleDelete(id);
          }}
        >
          {<DeleteIcon />}
        </a>
        <Link to={`/provider/edit/${id}`}>
          <EditIcon />
        </Link>
      </td>
    </tr>
  );
}
