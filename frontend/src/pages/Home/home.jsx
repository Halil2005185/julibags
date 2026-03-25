import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"
import ScrollTop from "../../components/ScrollToTop/scrollTop"
import "./home.css"
function Home() {
    return <section className=" w-screen flex justify-center items-center flex-col  ">
        <Animation />
        <Categories />
        <CardList />
        <ScrollTop />
    </section>
}
export default Home