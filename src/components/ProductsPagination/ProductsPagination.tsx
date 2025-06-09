import { useDispatch, useSelector } from "react-redux"
import { getPage } from "../../redux/productsSelectors"
import { setPage } from "../../redux/productsSlice";
import type { AppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/productsOperators";

export default function ProductsPagination() {
    const page = useSelector(getPage);
    const dispatch = useDispatch<AppDispatch>();

    const handlePrevPage = () => {
        if(page > 1) {
            dispatch(setPage(page - 1))
            dispatch(fetchProducts())
        }
    }

    const handleNextPage = () => {
        dispatch(setPage(page + 1));
        dispatch(fetchProducts())
    }

    return(
        <div className="flex justify-center gap-4 mt-4">
            <button onClick={handlePrevPage} className="px-4 py-2 bg-red text-black text-semibold hover:bg-black hover:text-white hover:text-bold transition duration-300 rounded">Prev</button>
            <button onClick={handleNextPage} className="px-4 py-2 bg-black text-white text-semibold hover:bg-red hover:text-black hover:text-bold transition duration-300 rounded">Next</button>
        </div> 
    )
}