import Footer from "./components/Footer/footer"
import Header from "./components/Header/header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/home"
import "./index.css"

function App() {
  return (
    <section className="min-h-screen flex flex-col gap-8">
      <Header />
      <div className="page-load ">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </section>
  )
}

export default App