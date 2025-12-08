import { Routes,Route } from "react-router-dom"
import Navbar from '../src/Components/Navbar/Navbar'
import Home from "./Pages/Home/Home"
import Experience from "./Pages/Experience/Experience"
import Rent_car from "./Pages/Rent Car/Rent_car"
import Rent_property from "./Rent Property/Rent_property"
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
      <Route path="/rent-car" element={<Rent_car />} />
      <Route path="/rent-property" element={<Rent_property />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
