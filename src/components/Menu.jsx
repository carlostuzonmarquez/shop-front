import { Link } from "react-router-dom";
export default function Menu() {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/categories">Categorias</Link>
          <Link to="/products">products</Link>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </aside>
  );
}
