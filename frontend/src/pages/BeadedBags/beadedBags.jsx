import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"

function BeadedBags() {
    return <section>
        <Animation />
        <Categories />
        <CardList categorySlug="beaded-bags" />
        <h1>BeadedBags page</h1>
    </section>
}
export default BeadedBags