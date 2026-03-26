import { Link } from "react-router-dom"

function NotFound() {
    return (
        <section className="min-h-screen bg-[#f8fafc] flex items-center justify-center relative overflow-hidden px-6">

            {/* Background decorative blobs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/25 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#c77dff]/8 to-transparent rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-200/15 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="text-center relative z-10 max-w-lg">
                <div className="mx-auto w-28 h-28 rounded-[30px] flex items-center justify-center mb-8 bg-gradient-to-br from-[#c77dff] to-[#7b2ff7] shadow-2xl shadow-purple-300/50 rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-700 cursor-default group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter bg-gradient-to-br from-[#c77dff] via-purple-500 to-[#7b2ff7] bg-clip-text text-transparent select-none mb-0 animate-pulse" style={{ animationDuration: "3s" }}>
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2 mb-3">
                    الصفحة غير موجودة
                </h2>
                <p className="text-base text-gray-400 font-light leading-relaxed max-w-sm mx-auto mb-10">
                    عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c77dff] to-[#7b2ff7] text-white font-semibold text-sm shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="relative z-10">الصفحة الرئيسية</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-semibold text-sm shadow-sm hover:shadow-lg hover:shadow-purple-100/30 hover:-translate-y-1 hover:border-purple-200 hover:text-purple-600 transition-all duration-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>العودة للخلف</span>
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center gap-2">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 opacity-40 animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.5s" }}
                        />
                    ))}
                </div>

                <p className="mt-8 text-[11px] text-gray-300 select-none tracking-[0.2em] uppercase">
                    JuliBags
                </p>
            </div>
        </section>
    )
}

export default NotFound