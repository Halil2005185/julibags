import ItemCard from "../itemCcrd/itemCard";

function CardList() {
    const bags = [
        { id: 1, name: "Sunset Tote", price: "450 TL", color: "#FF6B6B", tag: "NEW", emoji: "👜", desc: "حقيبة يد عصرية للاستخدام اليومي" },
        { id: 2, name: "Ocean Shoulder", price: "380 TL", color: "#4ECDC4", tag: "BESTSELLER", emoji: "👝", desc: "حقيبة كتف أنيقة بألوان البحر" },
        { id: 3, name: "Golden Hour", price: "620 TL", color: "#FFD93D", tag: "LUXURY", emoji: "💛", desc: "حقيبة فاخرة للمناسبات الخاصة" },
        { id: 4, name: "Lavender Dream", price: "290 TL", color: "#C77DFF", tag: "SALE", emoji: "💜", desc: "حقيبة صغيرة بلون الخزامى الرائع" },
        { id: 5, name: "Rose Mini", price: "320 TL", color: "#FF9A9E", tag: "NEW", emoji: "🌸", desc: "حقيبة ميني رومانسية وعصرية" },
        { id: 6, name: "Forest Backpack", price: "510 TL", color: "#52B788", tag: "ECO", emoji: "🌿", desc: "حقيبة ظهر من مواد صديقة للبيئة" },
        { id: 7, name: "Midnight Clutch", price: "270 TL", color: "#3A86FF", tag: "NEW", emoji: "👛", desc: "حقيبة سهرة أنيقة باللون الأزرق الداكن" },
        { id: 8, name: "Coral Beach", price: "340 TL", color: "#FF7F51", tag: "BESTSELLER", emoji: "🐚", desc: "حقيبة شاطئية مريحة وعملية" },
        { id: 9, name: "Pearl White", price: "580 TL", color: "#B8B8FF", tag: "LUXURY", emoji: "🤍", desc: "حقيبة فاخرة بيضاء ناصعة" },
        { id: 10, name: "Cherry Pop", price: "260 TL", color: "#E63946", tag: "SALE", emoji: "🍒", desc: "حقيبة صغيرة بلون الكرز الجذاب" },
        { id: 11, name: "Mint Fresh", price: "310 TL", color: "#80ED99", tag: "NEW", emoji: "🌱", desc: "حقيبة نعناعية منعشة وعصرية" },
        { id: 12, name: "Desert Sand", price: "430 TL", color: "#E9C46A", tag: "ECO", emoji: "🏜️", desc: "حقيبة بألوان الصحراء الدافئة" },
        { id: 13, name: "Neon Vibes", price: "395 TL", color: "#F72585", tag: "NEW", emoji: "⚡", desc: "حقيبة نيون جريئة ومميزة" },
        { id: 14, name: "Sky Blue Tote", price: "360 TL", color: "#48CAE4", tag: "BESTSELLER", emoji: "☁️", desc: "حقيبة توت خفيفة بلون السماء" },
        { id: 15, name: "Royal Velvet", price: "750 TL", color: "#7209B7", tag: "LUXURY", emoji: "👑", desc: "حقيبة مخمل ملكية للإطلالات الراقية" },
        { id: 16, name: "Sunny Yellow", price: "280 TL", color: "#FFBE0B", tag: "SALE", emoji: "☀️", desc: "حقيبة صفراء مشرقة لإطلالة مبهجة" },
        { id: 17, name: "Olive Garden", price: "420 TL", color: "#6A994E", tag: "ECO", emoji: "🫒", desc: "حقيبة بلون الزيتون الطبيعي" },
        { id: 18, name: "Bubblegum", price: "300 TL", color: "#FF70A6", tag: "NEW", emoji: "🍬", desc: "حقيبة وردية شقية ومرحة" },
    ];

    return (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 p-10 max-w-7xl mx-auto">
            {bags.map((bag) => (
                <ItemCard key={bag.id} bag={bag} />
            ))}
        </section>
    )
}
export default CardList