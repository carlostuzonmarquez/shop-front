import './App.css'
import { Menu } from './menu/Menu'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListCategoriesPage from './pages/ListCategories';
import CreateCategoryPage from './pages/CreateCategory';
import ListProductPage from './pages/ListProduct';
import CreateProductPage from './pages/CreateProduct';
import ListUsersPage from './pages/ListUsers';
import CreateUserPage from './pages/CreateUser';
import { EditUser } from './components/EditUser';


function App() {

  return (
    <>
      <Router>
        <Menu />
        <main>
          <Routes>
            <Route path="/categories" element={< ListCategoriesPage />} />
            <Route path='/create/category' element={<CreateCategoryPage />} />
            <Route path='/products' element={<ListProductPage />} />
            <Route path='/create/product' element={<CreateProductPage />} />
            <Route path='/users' element={<ListUsersPage />} />
            <Route path='/create/users' element={<CreateUserPage />} />
            <Route path='/edit/user/:userId' element={<EditUser />} />






          </Routes>
        </main>
      </Router>

    </>
  )
}

export default App
