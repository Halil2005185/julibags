import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Pagination({ currentPage, setCurrentPage, pageCount }) {
    return (
        <div className="flex justify-center items-center mt-10 py-4">
            <MdKeyboardArrowRight
                className="text-[25px] cursor-pointer"
                onClick={() => currentPage > pageCount && setCurrentPage(currentPage - 1)}
            />
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === page
                        ? "bg-gray-500 text-white"
                        : "bg-white"
                        }`}
                >
                    {page}
                </button>
            ))}
            <MdKeyboardArrowLeft
                className="text-[25px] cursor-pointer"
                onClick={() => currentPage < 1 && setCurrentPage(currentPage + 1)}
            />
        </div>
    );
}
export default Pagination;