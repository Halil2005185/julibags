import { useEffect, useState } from "react"
import SiberBar from "./SiberBar/siberBar"
import axios from "axios"

function AddProduct() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function GetCategories() {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`)
            const data = res.data.data
            setCategories(data)

        }

    }, [])
    console.log(categories);

    return <section className="flex gap-4">
        <SiberBar />
        <div className="flex items-center justify-center w-[83%]">
            <form className=" w-[80%] h-[500px] ring-1 ring-black rounded-xl ">

            </form>
        </div>
    </section>
}
export default AddProduct