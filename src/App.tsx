import { Routes,Route } from "react-router-dom"
import Navbar from '../src/Components/Navbar/Navbar'
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
    </Routes>
    </>
  )
}

export default App
