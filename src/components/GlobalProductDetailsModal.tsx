import { useState, useEffect } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import type { Product } from "../../types/types";
import { getProductById, localizeProduct, type Lang } from "../data/dummy-data";
import { addRecentlyViewed } from "../utils/storage";

function GlobalProductDetailsModal() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

	// Detect current language from the URL prefix (/ar, /en, ...).
	const getCurrentLanguage = (): Lang => {
		if (typeof window === "undefined") return "ar";
		const match = window.location.pathname.match(/^\/(ar|en|tr)/);
		return (match?.[1] as Lang) || "ar";
	};

	const openModal = (productId: string) => {
		const product = getProductById(productId);
		if (!product) {
			console.error(`Product not found: ${productId}`);
			return;
		}
		addRecentlyViewed(product.id);
		setCurrentProduct(localizeProduct(product, getCurrentLanguage()));
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentProduct(null);
	};

	useEffect(() => {
		const handleButtonClick = (e: Event) => {
			const target = e.target as HTMLElement;
			// Heart button lives inside the card — let the favorites handler own it.
			if (target.closest(".favorite-btn")) return;
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