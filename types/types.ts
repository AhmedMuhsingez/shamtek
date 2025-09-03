export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	role: string;
	createdAt: string; // ISO Date string
	updatedAt: string;
	Product: Product[]; // Related products
}
export interface Category {
	id: number;
	name: string;
	slug: string;
	image?: Blob | string | null;
	description?: string | null;
	products: Product[];
	_count: { products: number };
	addedBy: { name: string };
}

export interface ProductResponse {
	data: Product[];
	meta: {
		page: number;
		pageSize: number;
		totalCount: number;
		totalPages: number;
	};
}
export interface Product {
	id: string;
	name: string;
	description: string;
	image: string[] | string | Blob; // depending on usage, adjust to one type
	categoryId: number;
	stock_state: string | null;
	createdAt: string;
	updatedAt: string;
	category: { name: string };
	addedBy: { name: string };
	brand: { name: string };
	brandId: number;
	is_featured: boolean;
	code_name?: string;
}

export interface Brand {
	id: number;
	name: string;
	image: string[] | string | Blob;
	products: Product[];
	slug: string;

	_count: {
		products: number;
	};

	createdAt: string;
	updatedAt: string;
}

export interface NewProduct {
	name: string;
	description?: string | null;
	image?: Blob | string | null;
	category: string;
	brand: string;
}

export interface AboutUs {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}
export interface Contact {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}
// export interface Brand {
// 	id: number;
// 	name: string;
// 	image: string | Blob | string[];
// 	products: Product[];
// 	createdAt: string;
// 	updatedAt: string;
// }

export interface Auth {
	email: string;
	password: string;
	name?: string;
}

export interface AuthRes {
	user: User;
}

export interface Dashboard {
	categoriesCount: number;
	itemsCount: number;
	usersCount: number;
	latestItems: Product[] | [];
	brandsCount: number;
}

export interface LatestItems {
	id: number;
	name: string;
	category: string;
	addedBy: string;
	addedDate: string;
}

export interface CompanyDetails {
	name: string;
	logo: string;
	address: string;
	phone: string;
	email: string;
	facebook: string;
	instagram: string;
	whatsapp: string;
}

export interface ProductsApiResponse {
	data: Product[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
