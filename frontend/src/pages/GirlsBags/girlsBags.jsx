import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"

function GirlsBags() {
    return <section>
        <Animation />
        <Categories />
        <CardList categorySlug="girls-bags" />

        <h1>GirlsBags page</h1>
    </section>
}
export default GirlsBags