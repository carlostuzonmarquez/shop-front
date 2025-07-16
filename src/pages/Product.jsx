import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../components/Icons";
import Config from "../Config";

export default function Product({ product, handleDelete }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.stock}</td>
      <td>{product.price}</td>
      <td> <ul>
    {product.ProductCategory.map((categoriP, index) => (
      <li key={`${product.id}-${categoriP.categoryId}-${index}`}>
        {categoriP.category?.name || "Sin categoría"}
      </li>
    ))}
  </ul></td>
      <td>
        {product.Photos && product.Photos.length > 0 && (
          <img
            src={Config.PHOTOS_URL + product.Photos[0].path}
            style={{ width: "100px" }}
            alt={product.name}
          />
        )}
      </td>

      <td className="controls">
        <Link to={`/edit/product/${product.id}`}>
          <EditIcon />
        </Link>
        <a
          onClick={() => {
            handleDelete(product.id);
          }}
        >
          <DeleteIcon />
        </a>
      </td>
    </tr>
  );
}
