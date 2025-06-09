import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { getError, getPage, getProducts, getStatus } from "../../redux/productsSelectors";
import { fetchProducts } from "../../redux/productsOperators";
import ProductsCards from "../ProductsCard/ProductsCard";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "../../redux/productsSlice";
import ProductsPagination from "../ProductsPagination/ProductsPagination";

export default function ProductsList() {
    const dispatch = useDispatch<AppDispatch>();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const products = useSelector(getProducts);
    const error = useSelector(getError);
    const status = useSelector(getStatus);
    const page = useSelector(getPage);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, page]);

    const handleShowModal = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <AnimatePresence>
                {products.map((product) => (
                    <motion.div
                        onClick={() => handleShowModal(product)}
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <ProductsCards product={product} />
                    </motion.div>
                ))}
            </AnimatePresence>

            <AnimatePresence>
                {showModal && selectedProduct && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded shadow h-120 w-70"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-center font-semibold text-black text-xl mt-3">
                                {selectedProduct.title}
                            </h3>
                            <img className="w-40 h-40 rounded mx-auto mt-10" src={selectedProduct.image} alt={selectedProduct.title} />
                            <p className="text-center text-black font-medium text-lg mt-5">
                                {selectedProduct.description}
                            </p>
                            <p className="text-center text-black font-medium text-lg mt-5">
                                Category: {selectedProduct.category}
                            </p>
                            <p className="text-center text-black font-medium text-lg mt-5">
                                Price: {selectedProduct.price}$
                            </p>
                            <button onClick={handleCloseModal} className="px-4 py-2 text-white mt-5 bg-black font-semibold hover:bg-red-500 hover:text-black transition rounded">
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        <ProductsPagination />
        </div>
    );
}