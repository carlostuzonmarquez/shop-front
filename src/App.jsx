import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListCategoriesPage from "./pages/ListCategories";
import CreateCategoryPage from "./pages/CreateCategory";
import ListProductPage from "./pages/ListProduct";
import CreateProductPage from "./pages/CreateProduct";
import ListUsersPage from "./pages/ListUsers";
import CreateUserPage from "./pages/CreateUser";
import EditUserPage from "./pages/EditUser";
import EditCategoryPage from "./pages/EditCategory";
import EditProductPage from "./pages/EditProduct";
import Home from "./pages/Home";
import Details from "./pages/Details";
import CartProvider from "./context/CartContext";
import ProductsProvider from "./context/ProductsContext";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/categories" element={<ListCategoriesPage />} />
            <Route path="/create/category" element={<CreateCategoryPage />} />
            <Route
              path="/edit/category/:categoryId"
              element={<EditCategoryPage />}
            />

            <Route path="/products" element={<ListProductPage />} />
            <Route path="/create/product" element={<CreateProductPage />} />
            <Route
              path="/edit/product/:productId"
              element={<EditProductPage />}
            />

            <Route path="/users" element={<ListUsersPage />} />
            <Route path="/create/users" element={<CreateUserPage />} />
            <Route path="/edit/user/:userId" element={<EditUserPage />} />

            

            <Route path="/details/:id" element={<Details />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
