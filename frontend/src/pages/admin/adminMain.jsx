import SiberBar, { SidebarToggle } from "./SiberBar/siberBar"
import { Link } from "react-router-dom"

function AdminMain() {
    return (
        <SiberBar>
            <section className="min-h-screen bg-[#f8fafc]">
                <div className="flex items-center justify-between px-6 sm:px-10 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <SidebarToggle />
                        <h2 className="text-sm font-bold text-gray-800 tracking-tight hidden sm:block">لوحة التحكم</h2>
                    </div>
                    <p className="text-[11px] text-gray-400 tracking-widest uppercase">JuliBags Admin</p>
                </div>

                <div className="px-6 sm:px-10 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-65px)] relative overflow-hidden">

                    <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
                    <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-indigo-200/15 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#c77dff]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

                    <div className="text-center mb-14 relative z-10">
                        <div className="mx-auto w-[88px] h-[88px] rounded-[26px] flex items-center justify-center mb-8 bg-gradient-to-br from-[#c77dff] to-[#7b2ff7] shadow-xl shadow-purple-300/40 rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-default group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
                            مرحبًا بك 👋
                        </h1>
                        <p className="text-base text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                            لوحة التحكم — اختر من القائمة للبدء
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
                        {[
                            { label: "إجمالي المنتجات", icon: "📦", border: "border-purple-100", bg: "bg-purple-50/50" },
                            { label: "فئات المنتجات", icon: "🏷️", border: "border-indigo-100", bg: "bg-indigo-50/50" },
                            { label: "آخر تحديث", icon: "🕐", border: "border-emerald-100", bg: "bg-emerald-50/50" },
                        ].map((stat, i) => (
                            <div key={i} className={`${stat.bg} backdrop-blur-sm rounded-2xl border ${stat.border} px-6 py-4 flex items-center gap-3 hover:scale-[1.03] transition-transform duration-300`}>
                                <span className="text-2xl">{stat.icon}</span>
                                <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl relative z-10">
                        <Link
                            to="/admin/addProduct"
                            className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-purple-100/40 hover:-translate-y-2 hover:border-purple-200/60 transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-200/50 group-hover:shadow-purple-300/60 group-hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-purple-700 transition-colors duration-300">إضافة منتج</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">أضف منتجات جديدة إلى المتجر بكل سهولة</p>
                            </div>

                            <div className="absolute bottom-5 left-5 text-gray-300 group-hover:text-purple-400 group-hover:-translate-x-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                        </Link>

                        <Link
                            to="/admin/allProducts"
                            className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-2 hover:border-indigo-200/60 transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/60 group-hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">تعديل وحذف المنتجات</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">عدّل أو احذف المنتجات الموجودة في المتجر</p>
                            </div>

                            <div className="absolute bottom-5 left-5 text-gray-300 group-hover:text-indigo-400 group-hover:-translate-x-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    <p className="mt-14 text-[11px] text-gray-300 select-none tracking-[0.2em] uppercase relative z-10">
                        JuliBags Admin Panel v1.0
                    </p>
                </div>
            </section>
        </SiberBar>
    )
}

export default AdminMain