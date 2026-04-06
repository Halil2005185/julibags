import { useEffect, useState } from "react";
import ItemCard from "../itemCcrd/itemCard";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

function CardList({ categorySlug }) {
    const [bags, setBags] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    useEffect(() => {
        setLoading(true)
        async function getProducts() {
            try {
                const res = categorySlug
                    ?
                    await axios.get(`${import.meta.env.VITE_API_URL}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}&pagination[page]=${currentPage}&pagination[pageSize]=12&sort=createdAt:desc`)
                    :
                    await axios.get(`${import.meta.env.VITE_API_URL}/api/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=12&sort=createdAt:desc`)

                setBags(res.data.data)

                if (res.data.meta?.pagination) {
                    setPageCount(res.data.meta.pagination.pageCount)
                }

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [categorySlug, currentPage])

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
        <>
            <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 md:p-10 max-w-7xl mx-auto w-[90%] my-8 sm:w-full">
                {bags?.map((bag, index) => (
                    <ItemCard key={bag.id} bag={bag} index={index} />
                ))}
            </section>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                pageCount={pageCount}
            />
        </>
    )
}

export default CardList