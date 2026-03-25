import { Link, useLocation } from "react-router-dom"
import { useState, createContext, useContext } from "react"

const SidebarContext = createContext()

export function useSidebar() {
    return useContext(SidebarContext)
}

export function SidebarToggle() {
    const { setOpen } = useSidebar()
    return (
        <button
            onClick={() => setOpen(true)}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:border-[#c77dff]/40 transition-all duration-200 text-[#c77dff]"
            aria-label="Open sidebar"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    )
}

function SiberBar({ children }) {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    const linkBase = "flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 relative"
    const linkActive = "bg-gradient-to-br from-[#ff6b6b] to-[#c77dff] text-white shadow-lg shadow-[#ff6b6b]/30"
    const linkInactive = "text-gray-500 hover:bg-gray-100/80 hover:text-gray-800"

    function navLink(to, label, icon, exact = false) {
        const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)
        return (
            <Link
                onClick={() => setOpen(false)}
                to={to}
                className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
            >
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
                    {icon}
                </div>
                {label}
            </Link>
        )
    }

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                style={{ zIndex: 45 }}
                onClick={() => setOpen(false)}
            />

            <section
                className={`fixed top-0 right-0 w-[260px] h-screen flex flex-col z-50 bg-white border-l border-gray-100 shadow-[-4px_0_24px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-5 pt-6 pb-5 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#c77dff] to-[#7b2ff7] flex items-center justify-center shadow-lg shadow-[#c77dff]/25 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-[1.05rem] font-extrabold text-gray-900 tracking-tight leading-tight">JuliBags</h2>
                                <p className="text-[0.65rem] text-[#c77dff] font-semibold tracking-widest uppercase">Admin Panel</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 shrink-0"
                            aria-label="Close sidebar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <nav className=" flex-1 flex flex-col gap-1 px-3 py-3 overflow-y-auto">
                    <p className="text-[0.65rem] font-bold text-gray-300 tracking-[0.12em] uppercase px-3 pt-2 pb-1">القائمة الرئيسية</p>

                    {navLink("/admin/adminMain", "الرئيسية",
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>,
                        true
                    )}

                    <p className="text-[0.65rem] font-bold text-gray-300 tracking-[0.12em] uppercase px-3 pt-4 pb-1">إدارة المنتجات</p>

                    {navLink("/admin/addProduct", "إضافة منتج",
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>,
                        true
                    )}

                    {navLink("/admin/allProducts", "جميع المنتجات",
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>,
                        true
                    )}
                </nav>

                <div className="px-5 py-4 border-t border-gray-100 mt-auto">
                    <p className="text-[0.65rem] text-gray-300 text-center tracking-wide">© 2026 JuliBags</p>
                </div>
            </section>

            {children}
        </SidebarContext.Provider>
    )
}

export default SiberBar