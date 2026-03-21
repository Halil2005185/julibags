import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"
import "./home.css"
function Home() {
    return <section className="w-screen flex justify-center items-center flex-col  ">
        <Animation />
        <Categories />
        <CardList/>
    </section>
}
export default Home