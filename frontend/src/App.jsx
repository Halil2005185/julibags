import Footer from "./components/Footer/footer"
import Header from "./components/Header/header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/home"
import "./index.css"
import NameBags from "./pages/NameBags/nameBags"
import FrameBags from "./pages/FrameBags/frameBags"
import GirlsBags from "./pages/GirlsBags/girlsBags"
import CrochetBags from "./pages/CrochetBags/crochetBags"
import BeadedBags from "./pages/BeadedBags/beadedBags"
import BeadedGifts from "./pages/BeadedGifts/beadedGifts"
import AdminLogin from "./pages/admin/adminLogin"
function App() {
  return (
    <section className="min-h-screen flex flex-col gap-8">
      <Header />
      <div className="page-load ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/name-bags" element={<NameBags />} />
          <Route path="/category/frame-bags" element={<FrameBags/>} />
          <Route path="/category/girls-bags" element={<GirlsBags />} />
          <Route path="/category/crochet-bags" element={<CrochetBags/>} />
          <Route path="/category/beaded-bags" element={<BeadedBags />} />
          <Route path="/category/beaded-gifts" element={<BeadedGifts />} />
          <Route path="/admin/adminLogin101" element={<AdminLogin />} />


        </Routes>
      </div>
      <Footer />
    </section>
  )
}

export default App