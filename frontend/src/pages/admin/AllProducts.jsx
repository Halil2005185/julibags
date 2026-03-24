import { useEffect, useState, useRef } from "react"
import SiberBar from "./SiberBar/siberBar"
import axios from "axios"

function AllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [editName, setEditName] = useState("")
    const [editImages, setEditImages] = useState([])
    const [editPreviews, setEditPreviews] = useState([])
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState({ show: false, message: "", type: "" })
    const editFileRef = useRef(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000)
            return () => clearTimeout(timer)
        }
    }, [toast.show])

    async function fetchProducts() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?populate=*`)
            setProducts(res.data.data)
        } catch (err) {
            console.error("Failed to fetch products:", err)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete() {
        if (!deleteId) return
        setDeleting(true)
        try {
            const token = localStorage.getItem("adminToken")
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${deleteId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setProducts(products.filter((p) => p.documentId !== deleteId))
            showToast("تم حذف المنتج بنجاح", "success")
        } catch (err) {
            console.error(err)
            showToast("حدث خطأ أثناء الحذف", "error")
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    function openEdit(product) {
        setEditProduct(product)
        setEditName(product.name || "")
        setEditImages([])
        const existingPreviews = (product.image || []).map(
            (img) => `${import.meta.env.VITE_API_URL}${img.url}`
        )
        setEditPreviews(existingPreviews)
    }

    function handleEditImageChange(e) {
        const files = Array.from(e.target.files)
        if (files.length === 0) return
        const newImages = [...editImages, ...files].slice(0, 5)
        setEditImages(newImages)
        const newPreviews = newImages.map((file) => URL.createObjectURL(file))
        setEditPreviews(newPreviews)
    }

    async function handleSaveEdit(e) {
        e.preventDefault()
        if (!editName.trim()) {
            showToast("يرجى إدخال اسم المنتج", "error")
            return
        }
        setSaving(true)
        try {
            const formData = new FormData()
            formData.append("data", JSON.stringify({ name: editName.trim() }))
            editImages.forEach((file) => {
                formData.append("files.image", file)
            })
            const token = localStorage.getItem("adminToken")
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${editProduct.documentId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            showToast("تم تحديث المنتج بنجاح", "success")
            setEditProduct(null)
            fetchProducts()
        } catch (err) {
            console.error(err)
            showToast("حدث خطأ أثناء التحديث", "error")
        } finally {
            setSaving(false)
        }
    }

    function showToast(message, type) {
        setToast({ show: true, message, type })
    }

    function getImageUrl(product) {
        if (product.image && product.image.length > 0) {
            return `${import.meta.env.VITE_API_URL}${product.image[0].url}`
        }
        return null
    }

    return (
        <section className="flex min-h-screen bg-[#f8fafc]">
            <SiberBar />
            <div className="ms:flex-1 ms:ml-[260px]">
                <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">

                    <div className="mb-8  flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                    جميع المنتجات
                                </h1>
                            </div>
                            <p className="text-gray-400 text-sm mr-[52px]">
                                عرض وتعديل وحذف المنتجات الموجودة
                            </p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-sm text-gray-400">المنتجات: </span>
                            <span className="text-lg font-bold text-gray-800">{products.length}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <svg className="animate-spin w-10 h-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <p className="text-gray-400 font-medium">جاري تحميل المنتجات...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-700 mb-1">لا توجد منتجات</h3>
                            <p className="text-sm text-gray-400">ابدأ بإضافة منتج جديد من القائمة الجانبية</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {products.map((product) => {
                                const imgUrl = getImageUrl(product)
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                            {imgUrl ? (
                                                <img
                                                    src={imgUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {product.image && product.image.length > 1 && (
                                                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[11px] text-white font-medium">
                                                    {product.image.length} صور
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-base font-bold text-gray-800 mb-3 truncate" dir="rtl">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEdit(product)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-sm hover:bg-indigo-100 transition-colors duration-200 cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(product.documentId)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => !deleting && setDeleteId(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-[fadeIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                            حذف المنتج
                        </h3>
                        <p className="text-sm text-gray-400 text-center mb-6">
                            هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-lg shadow-red-500/25 transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        جاري الحذف...
                                    </>
                                ) : (
                                    "نعم، احذف"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => !saving && setEditProduct(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                تعديل المنتج
                            </h3>
                            <button
                                onClick={() => setEditProduct(null)}
                                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600" htmlFor="editName">
                                    اسم المنتج <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="editName"
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200 text-gray-700 text-[15px]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600">
                                    صور المنتج
                                </label>

                                {editPreviews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        {editPreviews.map((src, index) => (
                                            <div key={index} className="relative rounded-xl overflow-hidden aspect-square border border-gray-100">
                                                <img src={src} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div
                                    onClick={() => editFileRef.current?.click()}
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 group"
                                >
                                    <input
                                        ref={editFileRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleEditImageChange}
                                        className="hidden"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto text-gray-400 group-hover:text-indigo-500 mb-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-xs text-gray-400 group-hover:text-indigo-500 font-medium transition-colors">
                                        رفع صور جديدة (سيتم استبدال الصور الحالية)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditProduct(null)}
                                    disabled={saving}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            جاري الحفظ...
                                        </>
                                    ) : (
                                        "حفظ التغييرات"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {toast.show && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[fadeIn_0.3s_ease-out] ${toast.type === "success"
                    ? "bg-emerald-500 text-white"
                    : "bg-red-500 text-white"
                    }`}>
                    {toast.type === "success" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    <span className="text-sm font-semibold">{toast.message}</span>
                </div>
            )}
        </section>
    )
}

export default AllProducts