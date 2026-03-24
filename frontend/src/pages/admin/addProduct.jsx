import { useEffect, useState, useRef } from "react"
import SiberBar from "./SiberBar/siberBar"
import axios from "axios"

function AddProduct() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [previews, setPreviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const fileInputRef = useRef(null)

    useEffect(() => {
        async function GetCategories() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`)
                const data = res.data.data
                setCategories(data)
            } catch (err) {
                console.error("Failed to fetch categories:", err)
            }
        }
        GetCategories()
    }, [])

    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        const newImages = [...images, ...files].slice(0, 5)
        setImages(newImages)

        const newPreviews = newImages.map((file) => URL.createObjectURL(file))
        setPreviews(newPreviews)
    }

    function removeImage(index) {
        const newImages = images.filter((_, i) => i !== index)
        const newPreviews = previews.filter((_, i) => i !== index)
        setImages(newImages)
        setPreviews(newPreviews)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!name.trim() || !category) {
            setError("يرجى ملء جميع الحقول المطلوبة")
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            const productData = {
                name: name.trim(),
                category: category,
            }

            formData.append("data", JSON.stringify(productData))

            images.forEach((file) => {
                formData.append("files.images", file)
            })

            const token = localStorage.getItem("adminToken")
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            setSuccess("تم إضافة المنتج بنجاح! 🎉")
            setName("")
            setCategory("")
            setImages([])
            setPreviews([])
        } catch (err) {
            console.error(err)
            setError("حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex flex-col  min-h-screen bg-[#f8fafc]">

            <SiberBar />
            <div className="ms:flex-1 ms:ml-[260px]">
                <div className="px-6 md:px-10 py-8 ms:max-w-4xl mx-auto">

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                إضافة منتج جديد
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm mr-[52px]">
                            أضف منتجات جديدة إلى متجرك بسهولة
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 px-5 py-4 rounded-xl text-sm flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 animate-[fadeIn_0.3s_ease-out]">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-medium">{success}</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 px-5 py-4 rounded-xl text-sm flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 animate-[fadeIn_0.3s_ease-out]">
                            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                معلومات المنتج
                            </h2>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600" htmlFor="productName">
                                    اسم المنتج <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="productName"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="مثال: حقيبة يد جلدية فاخرة"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200 text-gray-700 placeholder-gray-300 text-[15px]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600" htmlFor="productCategory">
                                    الفئة <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="productCategory"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200 text-gray-700 text-[15px] appearance-none cursor-pointer"
                                    >
                                        <option value="">اختر الفئة</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.attributes?.name || cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                صور المنتج
                            </h2>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 group"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center mb-4 transition-colors duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-600 group-hover:text-emerald-600 mb-1 transition-colors">
                                    اضغط لرفع الصور
                                </p>
                                <p className="text-xs text-gray-400">
                                    PNG, JPG, WEBP — حتى 5 صور
                                </p>
                            </div>

                            {previews.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {previews.map((src, index) => (
                                        <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-100 shadow-sm">
                                            <img
                                                src={src}
                                                alt={`صورة ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeImage(index)
                                                }}
                                                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white text-gray-600 shadow-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/50 text-[10px] text-white font-medium backdrop-blur-sm">
                                                {index + 1}/{previews.length}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setName("")
                                    setCategory("")
                                    setImages([])
                                    setPreviews([])
                                    setError("")
                                    setSuccess("")
                                }}
                                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                            >
                                مسح الكل
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        جاري الإضافة...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        إضافة المنتج
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddProduct