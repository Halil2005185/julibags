import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import "./footer.css";

function Footer() {
    const year = new Date();
    return (
        <footer className="footer-bg w-full text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-bold mb-2">JULI BAGS 👜✨</h2>
                        <p className="text-white/70 text-sm max-w-[250px]">
                            أجمل الحقائب لك — تسوقي أحدث موديلات الحقائب بأفضل الأسعار
                        </p>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="font-bold text-sm mb-3 text-white/90">
                            روابط سريعة
                        </h3>
                        <ul className="flex flex-col gap-1.5 text-sm text-white/60">
                            <li className="hover:text-white transition-colors cursor-pointer">
                                الرئيسية
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                المنتجات
                            </li>
                            <a href=""></a>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                تواصل معنا
                            </li>
                        </ul>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="font-bold text-sm mb-3 text-white/90">تابعونا</h3>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://wa.me/905342170870"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                                <FaWhatsapp className="text-lg" />
                            </a>
                            <a
                                href="https://www.instagram.com/juli.bags24?igsh=MmFhdXJqNzk1emRn"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@juli.bags?_r=1&_t=ZS-94zJ1SB1iEB"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                                <FaTiktok className="text-lg" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 text-center">
                    <p className="text-white/40 text-xs">
                        © {year.getUTCFullYear()} JULI BAGS — جميع الحقوق محفوظة
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
