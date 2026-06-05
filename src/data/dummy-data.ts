import type { Brand, Category, CompanyDetails, Product, ProductResponse } from "../../types/types";

/**
 * Local dummy data for the offline / no-backend demo.
 *
 * Everything that used to come from an external API (`BASE_API` / `PUBLIC_API_URL`)
 * is now served from this module so the site can be deployed as a fully static
 * demo on Vercel. Images point at files in `public/products`.
 */

export const company: CompanyDetails = {
	name: "شام تِك",
	logo: "/logo.jpeg",
	address: "حلب، الشعار",
	phone: "+90 555 123 4567",
	email: "shaamtek4@gmail.com",
	facebook: "https://facebook.com/shamtek",
	instagram: "https://instagram.com/shamtek",
	whatsapp: "https://wa.me/905551234567",
};

const PRODUCT_IMAGES = ["/products/p1.webp", "/products/p2.webp", "/products/p3.png", "/products/p4.jpeg"];

const STOCK_STATES = ["in_stock", "out_of_stock", "coming_soon"];

// --- Categories -----------------------------------------------------------
export const categories: Category[] = [
	{ id: 1, name: "هواتف ذكية", slug: "smartphones", products: [], _count: { products: 0 }, addedBy: { name: "Admin" }, description: "أحدث الهواتف الذكية من أبرز العلامات التجارية" },
	{ id: 2, name: "حواسيب محمولة", slug: "laptops", products: [], _count: { products: 0 }, addedBy: { name: "Admin" }, description: "حواسيب محمولة بأداء عالٍ لكل احتياجاتك" },
	{ id: 3, name: "إكسسوارات", slug: "accessories", products: [], _count: { products: 0 }, addedBy: { name: "Admin" }, description: "إكسسوارات تقنية تكمل أجهزتك" },
	{ id: 4, name: "صوتيات", slug: "audio", products: [], _count: { products: 0 }, addedBy: { name: "Admin" }, description: "سماعات ومكبرات صوت عالية الجودة" },
];

// --- Brands ---------------------------------------------------------------
export const brands: Brand[] = [
	{ id: 1, name: "Apple", slug: "apple", image: "/products/p1.webp", products: [], _count: { products: 0 }, createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z" },
	{ id: 2, name: "Samsung", slug: "samsung", image: "/products/p2.webp", products: [], _count: { products: 0 }, createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z" },
	{ id: 3, name: "Sony", slug: "sony", image: "/products/p3.png", products: [], _count: { products: 0 }, createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z" },
	{ id: 4, name: "Dell", slug: "dell", image: "/products/p4.jpeg", products: [], _count: { products: 0 }, createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z" },
	{ id: 5, name: "Anker", slug: "anker", image: "/products/p1.webp", products: [], _count: { products: 0 }, createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z" },
];

const brandById = (id: number) => brands.find((b) => b.id === id)!;
const categoryById = (id: number) => categories.find((c) => c.id === id)!;

type Seed = {
	name: string;
	categoryId: number;
	brandId: number;
	is_featured?: boolean;
	stock?: number; // index into STOCK_STATES
	code_name?: string;
	description?: string;
};

const SEEDS: Seed[] = [
	{ name: "iPhone 15 Pro", categoryId: 1, brandId: 1, is_featured: true, stock: 0, code_name: "IP15P", description: "هاتف **iPhone 15 Pro** بشريحة A17 Pro وكاميرا احترافية وتصميم من التيتانيوم." },
	{ name: "Samsung Galaxy S24 Ultra", categoryId: 1, brandId: 2, is_featured: true, stock: 0, code_name: "SGS24U", description: "شاشة Dynamic AMOLED 2X مع قلم S Pen وكاميرا 200 ميجابكسل." },
	{ name: "iPhone 14", categoryId: 1, brandId: 1, stock: 1, code_name: "IP14", description: "أداء قوي وبطارية تدوم طويلاً بسعر مناسب." },
	{ name: "Galaxy A55", categoryId: 1, brandId: 2, stock: 2, code_name: "GA55", description: "هاتف متوسط الفئة بمواصفات ممتازة." },
	{ name: "MacBook Pro 16", categoryId: 2, brandId: 1, is_featured: true, stock: 0, code_name: "MBP16", description: "حاسوب **MacBook Pro** بشريحة M3 Pro وشاشة Liquid Retina XDR." },
	{ name: "Dell XPS 15", categoryId: 2, brandId: 4, stock: 0, code_name: "DXPS15", description: "حاسوب محمول نحيف بأداء احترافي للمصممين والمطورين." },
	{ name: "MacBook Air 13", categoryId: 2, brandId: 1, stock: 2, code_name: "MBA13", description: "خفيف ونحيف مع بطارية تدوم طوال اليوم." },
	{ name: "Dell Inspiron 14", categoryId: 2, brandId: 4, stock: 1, code_name: "DIN14", description: "خيار عملي للاستخدام اليومي والدراسة." },
	{ name: "AirPods Pro 2", categoryId: 4, brandId: 1, is_featured: true, stock: 0, code_name: "APP2", description: "سماعات **AirPods Pro** مع إلغاء الضوضاء النشط وصوت مكاني." },
	{ name: "Sony WH-1000XM5", categoryId: 4, brandId: 3, stock: 0, code_name: "WH1000XM5", description: "أفضل سماعات لإلغاء الضوضاء مع جودة صوت استثنائية." },
	{ name: "Sony WF-C700N", categoryId: 4, brandId: 3, stock: 2, code_name: "WFC700N", description: "سماعات لاسلكية مدمجة مع إلغاء ضوضاء." },
	{ name: "Anker PowerCore 26800", categoryId: 3, brandId: 5, stock: 0, code_name: "APC26800", description: "بطارية محمولة بسعة كبيرة لشحن أجهزتك في أي وقت." },
	{ name: "Anker USB-C Hub", categoryId: 3, brandId: 5, stock: 0, code_name: "AHUB7", description: "موزّع USB-C بسبعة منافذ لتوسيع إمكانيات حاسوبك." },
	{ name: "Apple MagSafe Charger", categoryId: 3, brandId: 1, stock: 1, code_name: "AMSC", description: "شاحن مغناطيسي لاسلكي سريع لأجهزة iPhone." },
	{ name: "Samsung 45W Charger", categoryId: 3, brandId: 2, stock: 0, code_name: "S45W", description: "شاحن فائق السرعة بقوة 45 واط." },
	{ name: "Sony BRAVIA Soundbar", categoryId: 4, brandId: 3, is_featured: true, stock: 2, code_name: "SBSB", description: "مكبر صوت بتقنية Dolby Atmos لتجربة سينمائية في منزلك." },
];

export const products: Product[] = SEEDS.map((seed, i) => {
	const brand = brandById(seed.brandId);
	const category = categoryById(seed.categoryId);
	const day = String((i % 27) + 1).padStart(2, "0");
	return {
		id: String(i + 1),
		name: seed.name,
		description: seed.description ?? seed.name,
		image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
		categoryId: seed.categoryId,
		stock_state: STOCK_STATES[seed.stock ?? 0],
		createdAt: `2024-03-${day}T10:00:00.000Z`,
		updatedAt: `2024-03-${day}T10:00:00.000Z`,
		category: { name: category.name },
		addedBy: { name: "Admin" },
		brand: { name: brand.name },
		brandId: seed.brandId,
		is_featured: Boolean(seed.is_featured),
		code_name: seed.code_name,
	};
});

// Backfill the per-relation counts now that products exist.
for (const brand of brands) {
	brand._count.products = products.filter((p) => p.brandId === brand.id).length;
}
for (const category of categories) {
	category._count.products = products.filter((p) => p.categoryId === category.id).length;
}

// --- Query helpers (mirror the old API surface) ---------------------------
export const featuredProducts = products.filter((p) => p.is_featured);

export function getProductById(id: string | undefined): Product | null {
	if (!id) return null;
	return products.find((p) => p.id === id) ?? null;
}

export function getBrandBySlug(slug: string | undefined): Brand | null {
	if (!slug) return null;
	return brands.find((b) => b.slug === slug) ?? null;
}

export function getCategoryBySlug(slug: string | undefined): Category | null {
	if (!slug) return null;
	return categories.find((c) => c.slug === slug) ?? null;
}

/**
 * Returns a ProductResponse-shaped object. Filtering and pagination in the
 * static demo happen on the client, so this returns the full matching set.
 */
export function getProducts(opts: { brandId?: number; categoryId?: number; featured?: boolean } = {}): ProductResponse {
	let data = products;
	if (opts.featured) data = data.filter((p) => p.is_featured);
	if (opts.brandId) data = data.filter((p) => p.brandId === opts.brandId);
	if (opts.categoryId) data = data.filter((p) => p.categoryId === opts.categoryId);
	return {
		data,
		meta: { page: 1, pageSize: data.length, totalCount: data.length, totalPages: 1 },
	};
}
