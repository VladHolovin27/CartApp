import { useDispatch, useSelector } from "react-redux"
import { type Product } from "../../redux/productsSlice"
import type { AppDispatch } from "../../redux/store";
import { motion } from "framer-motion";
import { addToCart } from "../../redux/cartSlice";
import { useEffect } from "react";
import { getCart } from "../../redux/cartSelectors";

interface ProductsCard {
    product: Product
}

function ProductsCards({ product }: ProductsCard) {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector(getCart)
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]);

    const handleAdd = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    }

    return(
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="bg-white p-2 rounded shadow hover:shadow-md transition h-full"
        >
            <h1 className="text-center font-semibold text-black text-xl mt-3">{product.title}</h1>
            <img className="w-40 h-40 rounded mx-auto mt-10" src={product.image} alt={product.title} />
            <p className="text-center text-black font-medium text-lg mt-5">{product.price}$</p>
            <button onClick={() => handleAdd()} className="px-4 py-2 text-white mt-5 bg-black text-semibold hover:bg-red-500 hover:text-black hover:text-bold transition duration-300 rounded">Add to Cart</button>
        </motion.div>
    )
}

export default ProductsCards