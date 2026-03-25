import { useEffect, useState } from "react";
import ItemCard from "../itemCcrd/itemCard";
import axios from "axios";

function CardList({ categorySlug }) {
    const [bags, setBags] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getProducts() {
            try {
                const res = categorySlug
                    ?
                    await axios.get(`${import.meta.env.VITE_API_URL}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}`)
                    :
                    await axios.get(`${import.meta.env.VITE_API_URL}/api/products?populate=*`)

                setBags(res.data.data)
                console.log(res.data.data);

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [categorySlug])

    if (loading) return <p className="text-center text-gray-400 text-xl py-20">جاري التحميل... ⏳</p>

    return (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 md:p-10 max-w-7xl mx-auto w-[90%] my-8 md:myw-0 sm:w-full">
            {bags?.map((bag, index) => (
                <ItemCard key={bag.id} bag={bag} index={index} />
            ))}
        </section>
    )
}

export default CardList