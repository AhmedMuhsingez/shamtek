import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import type { Product } from "../../types/types";
import { cn } from "../utils/utils";
import { generateWhatsAppMessage, isWhatsAppAvailable } from "../utils/whatsapp";
import MarkdownViewer from "./MarkdownViewer";

interface ProductModalProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
	language?: "ar" | "en" | "tr";
	translations?: {
		brand?: string;
		category?: string;
		stock?: string;
		codeName?: string;
		description?: string;
		inStock?: string;
		outOfStock?: string;
		comingSoon?: string;
		close?: string;
		whatsappInquiry?: string;
	};
}

function ProductDetailsModal({ product, isOpen, onClose, language = "ar" }: ProductModalProps) {
	const [displayProduct, setDisplayProduct] = useState<Product | null>(product);
	useEffect(() => {
		if (isOpen && product) {
			setDisplayProduct(product);
		}
	}, [isOpen, product]);
	useEffect(() => {
		if (!isOpen) {
			const timer = setTimeout(() => setDisplayProduct(null), 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	if (!isOpen && !displayProduct) return null;

	const stockState = displayProduct?.stock_state?.toLowerCase();
	const isInStock = stockState === "in_stock";
	const isOutOfStock = stockState === "out_of_stock";

	const getStockLabel = () => {
		if (isInStock) return "متوفر";
		if (isOutOfStock) return "غير متوفر";
		return "قادم قريباً";
	};

	const getStockColor = () => {
		if (isInStock)
			return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
		if (isOutOfStock) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
		return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
	};

	const productImage = Array.isArray(displayProduct?.image)
		? displayProduct.image[0]
		: displayProduct?.image;

	// WhatsApp functionality
	const handleWhatsAppClick = () => {
		if (!displayProduct) return;

		try {
			const whatsappUrl = generateWhatsAppMessage(displayProduct, language);
			window.open(whatsappUrl, "_blank", "noopener,noreferrer");
		} catch (error) {
			console.error("Error opening WhatsApp:", error);
		}
	};

	const whatsappAvailable = isWhatsAppAvailable();

	const getWhatsAppButtonText = () => {
		switch (language) {
			case "en":
				return "Inquire via WhatsApp";
			case "tr":
				return "WhatsApp ile Sorgula";
			default:
				return "استفسار عبر واتساب";
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				{/* Backdrop */}
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
				</TransitionChild>

				{/* Modal Container */}
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl transition-all">
								<div className="absolute right-4 top-4 z-10">
									<button
										type="button"
										className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105"
										onClick={onClose}
									>
										<span className="icon-[ic--baseline-close] text-2xl"></span>
									</button>
								</div>

								{/* Product Image */}
								<div className="relative overflow-hidden rounded-t-2xl">
									<img
										src={productImage as string}
										alt={displayProduct?.name || "Product"}
										className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
								</div>

								<div className="p-6 sm:p-8">
									<DialogTitle
										as="h3"
										className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center leading-tight"
									>
										{displayProduct?.name || ""}
									</DialogTitle>

									{displayProduct?.description && (
										<div className="mb-6">
											{/* <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
												{displayProduct.description}
											</p> */}
											<MarkdownViewer
												content={displayProduct.description}
											/>
										</div>
									)}

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
										{/* Brand */}
										<div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-2 md:p-4 border border-gray-200 dark:border-gray-700/50 items-center">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
													{"العلامة التجارية"}
												</span>
												<span className="text-base font-semibold text-primary dark:text-accent bg-primary/10 dark:bg-accent/10 px-3 py-1 rounded-full">
													{displayProduct?.brand?.name}
												</span>
											</div>
										</div>

										{/* Category */}
										<div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-2 md:p-4 border border-gray-200 dark:border-gray-700/50 items-center">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
													{"القسم"}
												</span>
												<span className="text-base font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
													{displayProduct?.category?.name || "N/A"}
												</span>
											</div>
										</div>

										{/* Stock Status */}
										<div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-2 md:p-4 border border-gray-200 dark:border-gray-700/50 items-center content-center">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
													{"الحالة"}
												</span>
												<span
													className={cn(
														"text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide",
														getStockColor()
													)}
												>
													{getStockLabel()}
												</span>
											</div>
										</div>

										{/* Code Name */}
										{displayProduct?.code_name && (
											<div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-2 md:p-4 border border-gray-200 dark:border-gray-700/50 items-center">
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
														{"رقم المنتج"}
													</span>
													<span className="text-base font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 font-mono">
														{displayProduct.code_name}
													</span>
												</div>
											</div>
										)}
									</div>

									{/* WhatsApp Button */}
									{whatsappAvailable && (
										<div className="mt-4 md:mt-6">
											<button
												onClick={handleWhatsAppClick}
												className="hover:cursor-pointer w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-3 md:py-3 md:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
												aria-label={getWhatsAppButtonText()}
											>
												<span className="icon-[ic--twotone-whatsapp] text-xl group-hover:scale-110 transition-transform duration-300"></span>
												<span className="text-md">
													{getWhatsAppButtonText()}
												</span>
												<span className="icon-[material-symbols--arrow-outward] text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></span>
											</button>
										</div>
									)}

									{/* Additional Info */}
									<div className="mt-4 md:mt-6">
										<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
											<span>
												تاريخ الإضافة:{" "}
												{displayProduct?.createdAt
													? new Date(
															displayProduct.createdAt
													  ).toLocaleDateString()
													: "N/A"}
											</span>
										</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ProductDetailsModal;
