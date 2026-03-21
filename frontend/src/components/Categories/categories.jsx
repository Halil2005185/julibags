import { Link } from "react-router-dom"

function Categories() {
    const categories = [
        { id: 7, label: "الصفحة الرئيسية", path: "/" },
        { id: 1, label: "شنطة إسم", path: "/category/name-bags" },
        { id: 2, label: "شنطة فريم", path: "/category/frame-bags" },
        { id: 3, label: "شنطة بنات", path: "/category/girls-bags" },
        { id: 4, label: "شنط كروشيه", path: "/category/crochet-bags" },
        { id: 5, label: "شنطة خرز", path: "/category/beaded-bags" },
        { id: 6, label: "هدايا متنوعة من الخرز", path: "/category/beaded-gifts" },
    ]

    return (
        <div className="flex gap-8 items-center justify-center w-[80%] mx-auto flex-wrap">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={category.path}
                    className="ring-1 ring-black bg-[#eee] text-nowrap transition-all duration-150 font-medium rounded-lg shadow-md hover:scale-105 px-4 py-2"
                >
                    {category.label}
                </Link>
            ))}
        </div>
    )
}

export default Categories