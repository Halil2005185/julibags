import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function ItemCard({ bag, index }) {
    const cardRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [swiperInstance, setSwiperInstance] = useState(null)
    const [lightbox, setLightbox] = useState(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), (index % 2) * 10)
                    observer.disconnect()
                }
            },
            { threshold: 0.10 }
        )
        if (cardRef.current) observer.observe(cardRef.current)
        return () => observer.disconnect()
    }, [index])

    function openWhatsApp(imageUrl) {
        const phone = "905342170870"
        const message = `Hello 👋 I want this product Image: ${imageUrl}`
        const Url = `https://wa.me/${phone}/?text=${encodeURIComponent(message)}`
        window.open(Url, "_blank", "noopener,noreferrer")
    }

    const images = bag?.images || []

    return (
        <>
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute -top-10 right-0 text-white text-3xl cursor-pointer hover:text-gray-300 transition-colors"
                        >
                            ✕
                        </button>
                        <img
                            src={lightbox}
                            alt="product"
                            className="w-full rounded-2xl object-contain max-h-[70vh]"
                        />
                        <button
                            onClick={() => openWhatsApp(lightbox)}
                            className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                            📩 إرسال لواتساب
                        </button>
                    </div>
                </div>
            )}

            <div
                ref={cardRef}
                className="bg-white rounded-3xl overflow-hidden shadow-lg w-full transition-all duration-700"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0px)" : "translateY(40px)",
                }}
            >
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    onSwiper={setSwiperInstance}
                    className="w-full aspect-square"
                >
                    {images.map((img, i) => {
                        const imageUrl = img.url
                        return (
                            <SwiperSlide key={i}>
                                <img
                                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    src={imageUrl}
                                    alt="ProductImage"
                                    onClick={() => setLightbox(imageUrl)}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                <div className="p-4" dir="rtl">
                    <p className="text-sm text-gray-400 mb-2">اضغط على الصورة لتكبيرها وإرسالها إلى واتساب</p>
                    <h3 className="text-xl font-black text-gray-800 mb-3">{bag.name}</h3>

                    {images.length > 1 && (
                        <div className="flex items-center justify-between mt-2">
                            <button
                                onClick={() => swiperInstance?.slidePrev()}
                                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-500 flex items-center justify-center transition-all duration-200 cursor-pointer"
                            >
                                →
                            </button>
                            <span className="text-xs text-gray-400">{images.length} صور</span>
                            <button
                                onClick={() => swiperInstance?.slideNext()}
                                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-500 flex items-center justify-center transition-all duration-200 cursor-pointer"
                            >
                                ←
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ItemCard
