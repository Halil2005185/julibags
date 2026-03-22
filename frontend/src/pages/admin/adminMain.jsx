import SiberBar from "./SiberBar/siberBar"
import { Link } from "react-router-dom"

function AdminMain() {
    return (
        <section className="flex min-h-screen bg-[#f8fafc]">
            <SiberBar />
            <div className="flex-1 ml-[260px] w-[83%] ">
                <div className="px-8 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-75px)]">
                    <div className="text-center mb-10">
                        <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                            مرحبًا بك في لوحة التحكم 👋
                        </h1>
                        <p className="text-gray-400 text-base max-w-md mx-auto">
                            اختر من القائمة الجانبية لبدء إدارة المنتجات
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl">
                        <Link
                            to="/admin/addProduct"
                            className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">إضافة منتج</h3>
                            <p className="text-sm text-gray-400">أضف منتجات جديدة إلى المتجر</p>
                        </Link>

                        <Link
                            to="/admin/allProducts"
                            className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">تعديل وحذف المنتجات</h3>
                            <p className="text-sm text-gray-400">عدّل أو احذف المنتجات الموجودة</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminMain