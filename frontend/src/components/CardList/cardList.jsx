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

    if (loading) {
        return (
            <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 md:p-10 max-w-7xl mx-auto w-[90%] my-8 sm:w-full">

                {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg w-full animate-pulse">

                        <div className="w-full h-64 bg-gray-200"></div>

                        <div className="p-6">
                            <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>

                    </div>
                ))}
    
            </section>
        )
    }
    return (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 md:p-10 max-w-7xl mx-auto w-[90%] my-8 md:myw-0 sm:w-full">
            {bags?.map((bag, index) => (
                <ItemCard key={bag.id} bag={bag} index={index} />
            ))}
        </section>
    )
}

export default CardList