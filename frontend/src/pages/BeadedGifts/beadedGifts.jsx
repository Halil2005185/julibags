import Animation from "../../components/Animations/animation"
import CardList from "../../components/CardList/cardList"
import Categories from "../../components/Categories/categories"

function BeadedGifts() {
    return <section>
        <Animation />
        <Categories  />
        <CardList categorySlug="beaded-gifts"/>
        <h1>BeadedGifts page</h1>
    </section>
}
export default BeadedGifts