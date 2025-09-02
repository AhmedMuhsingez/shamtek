import type { Product } from "../../types/types";
import { companyData } from "../data/company-details";

/**
 * Generates a WhatsApp message URL with product details
 * @param product - The product to include in the message
 * @param language - The language for the message (ar, en, tr)
 * @returns WhatsApp URL with pre-filled message
 */
export function generateWhatsAppMessage(
	product: Product,
	language: "ar" | "en" | "tr" = "ar"
): string {
	const phoneNumber = companyData.whatsapp;

	if (!phoneNumber) {
		throw new Error("WhatsApp phone number not available");
	}

	// Remove any non-numeric characters from phone number
	const whatsappLink = phoneNumber.replace(/[^0-9]/g, "");

	// Generate message based on language
	const messages = {
		ar: {
			greeting: "مرحباً، أود الاستفسار عن هذا المنتج:",
			productName: "اسم المنتج",
			brand: "العلامة التجارية",
			category: "القسم",
			code: "رقم المنتج",
			status: "الحالة",
			thanks: "شكراً لكم",
		},
		en: {
			greeting: "Hello, I would like to inquire about this product:",
			productName: "Product Name",
			brand: "Brand",
			category: "Category",
			code: "Product Code",
			status: "Status",
			thanks: "Thank you",
		},
		tr: {
			greeting: "Merhaba, bu ürün hakkında bilgi almak istiyorum:",
			productName: "Ürün Adı",
			brand: "Marka",
			category: "Kategori",
			code: "Ürün Kodu",
			status: "Durum",
			thanks: "Teşekkürler",
		},
	};

	const msg = messages[language];
	const stockStatus = getStockStatusText(product.stock_state || undefined, language);

	const message =
		`${msg.greeting}

` +
		`${msg.productName}: ${product.name}
` +
		`${msg.brand}: ${product.brand?.name || "N/A"}
` +
		`${msg.category}: ${product.category?.name || "N/A"}
` +
		(product.code_name
			? `${msg.code}: ${product.code_name}
`
			: "") +
		`${msg.status}: ${stockStatus}

` +
		`${msg.thanks}`;

	// Encode the message for URL
	const encodedMessage = encodeURIComponent(message);

	// Return WhatsApp URL
	return `/${whatsappLink}?text=${encodedMessage}`;
}

/**
 * Gets localized stock status text
 * @param stockState - The stock state from the product
 * @param language - The language for the text
 * @returns Localized stock status text
 */
function getStockStatusText(
	stockState: string | undefined,
	language: "ar" | "en" | "tr"
): string {
	const state = stockState?.toLowerCase();

	const statusTexts = {
		ar: {
			in_stock: "متوفر",
			out_of_stock: "غير متوفر",
			coming_soon: "قادم قريباً",
			default: "غير محدد",
		},
		en: {
			in_stock: "In Stock",
			out_of_stock: "Out of Stock",
			coming_soon: "Coming Soon",
			default: "Unknown",
		},
		tr: {
			in_stock: "Stokta Var",
			out_of_stock: "Stokta Yok",
			coming_soon: "Yakında Gelecek",
			default: "Bilinmiyor",
		},
	};

	const texts = statusTexts[language];

	switch (state) {
		case "in_stock":
			return texts.in_stock;
		case "out_of_stock":
			return texts.out_of_stock;
		case "coming_soon":
			return texts.coming_soon;
		default:
			return texts.default;
	}
}

/**
 * Checks if WhatsApp functionality is available
 * @returns boolean indicating if WhatsApp is available
 */
export function isWhatsAppAvailable(): boolean {
	return Boolean(companyData.whatsapp && companyData.whatsapp.trim() !== "");
}
