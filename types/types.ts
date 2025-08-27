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
}

export interface Brand {
	id: number;
	name: string;
	image: string[] | string | Blob;
	products: Product[];

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
export interface Brand {
	id: number;
	name: string;
	image: string | Blob | string[];
	products: Product[];
	createdAt: string;
	updatedAt: string;
}

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
	description: string;
	phone: string;
	address: string;
	logo: string | Blob;
	whatsapp: string;
	facebook: string;
	instagram: string;
}
