import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"

function CrochetBags() {
    return <section>
        <Animation />
        <Categories />
        <CardList categorySlug="crochet-bags" />
        <h1>CrochetBags page</h1>
    </section>
}
export default CrochetBags