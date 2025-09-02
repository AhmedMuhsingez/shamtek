import { useState, useEffect } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import type { Product } from "../../types/types";

function GlobalProductDetailsModal() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const openModal = async (productId: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${import.meta.env.PUBLIC_API_URL}/single-item/${productId}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const product: Product = await response.json();
			setCurrentProduct(product);
			setIsModalOpen(true);
		} catch (error) {
			console.error("خطأ في جلب بيانات المنتج:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentProduct(null);
	};

	useEffect(() => {
		const handleButtonClick = (e: Event) => {
			const target = e.target as HTMLElement;
			const productButton = target.closest("[data-product-id]") as HTMLElement;

			if (
				productButton &&
				(target.classList.contains("product-details-btn") ||
					productButton.classList.contains("product-card-clickable"))
			) {
				const productId = productButton.getAttribute("data-product-id");
				if (productId) {
					e.preventDefault();
					openModal(productId);
				}
			}
		};

		document.addEventListener("click", handleButtonClick);

		return () => {
			document.removeEventListener("click", handleButtonClick);
		};
	}, []);

	return (
		<>
			{/* {isLoading && (
				// <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
				// 	<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
				// 		<div className="flex items-center space-x-3 rtl:space-x-reverse">
				// 			<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
				// 			<span className="text-gray-700 dark:text-gray-300">
				// 				جاري تحميل تفاصيل المنتج...
				// 			</span>
				// 		</div>
				// 	</div>
				// </div>
			)} */}

			<ProductDetailsModal
				product={currentProduct}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</>
	);
}

export default GlobalProductDetailsModal;