import './App.css'
import CreateCategory from './components/CreateCategory'
import { EditCategory } from './components/editCategory'
import { ListCategories } from './components/ListCategories'

function App() {

  return (
    <>
      <CreateCategory />
      <ListCategories />
      <EditCategory />
    </>
  )
}

export default App
