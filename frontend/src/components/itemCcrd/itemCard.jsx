function ItemCard({ bag }) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg w-72">

            {/* Image Area */}
            <div
                className="h-56 flex items-center justify-center relative"
                style={{ backgroundColor: `${bag.color}22` }}
            >
                {/* Decorative circles */}
                <div
                    className="absolute w-32 h-32 rounded-full top-0 right-0"
                    style={{ backgroundColor: `${bag.color}33` }}
                />
                <div
                    className="absolute w-24 h-24 rounded-full bottom-0 left-4"
                    style={{ backgroundColor: `${bag.color}33` }}
                />

                {/* Tag */}
                <div
                    className="absolute top-4 left-4 text-white text-xs font-bold px-4 py-2 rounded-full"
                    style={{ backgroundColor: bag.color }}
                >
                    {bag.tag}
                </div>

                {/* Emoji */}
                <div className="text-8xl z-10">{bag.emoji}</div>
            </div>

            {/* Content */}
            <div className="p-6" dir="rtl">
                <h3 className="text-xl font-black text-gray-800 mb-2">{bag.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{bag.desc}</p>

                <div className="flex justify-between items-center">
                    <button
                        className="text-white text-sm font-bold px-5 py-2 rounded-full"
                        style={{ backgroundColor: bag.color }}
                    >
                        التفاصيل ←
                    </button>
                    <span className="text-xl font-black" style={{ color: bag.color }}>
                        {bag.price}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ItemCard