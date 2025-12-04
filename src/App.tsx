import { Routes,Route } from "react-router-dom"
import Navbar from '../src/Components/Navbar/Navbar'
import Home from "./Pages/Home/Home"
import Experience from "./Pages/Experience/Experience"
import Services from "./Pages/Services/Services"
import Footer from "./Pages/Footer/Footer"


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/services" element={<Services />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
