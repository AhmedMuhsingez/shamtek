import { useState, useEffect } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import type { Product } from "../../types/types";

function GlobalProductDetailsModal() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

	// Detect current language from URL
	const getCurrentLanguage = (): "ar" | "en" | "tr" => {
		// const path = window.location.pathname;
		// if (path.includes("/en/")) return "en";
		// if (path.includes("/tr/")) return "tr";
		return "ar"; // default
	};

	const openModal = async (productId: string) => {
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
			console.error("Error fetching data:", error);
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
		<ProductDetailsModal
			product={currentProduct}
			isOpen={isModalOpen}
			onClose={closeModal}
			language={getCurrentLanguage()}
		/>
	);
}

export default GlobalProductDetailsModal;