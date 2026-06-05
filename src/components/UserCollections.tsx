import { useEffect, useState } from "react";
import type { Product } from "../../types/types";
import { getProductById } from "../data/dummy-data";
import {
	FAVORITES_EVENT,
	RECENTLY_VIEWED_EVENT,
	getFavorites,
	getRecentlyViewed,
	removeFavorite,
} from "../utils/storage";

type Lang = "ar" | "en" | "tr";

const COPY: Record<Lang, { title: string; favorites: string; recent: string; favHint: string; recentHint: string }> = {
	ar: {
		title: "مجموعتي",
		favorites: "المفضلة",
		recent: "شوهد مؤخراً",
		favHint: "اضغط على ♥ في أي منتج لإضافته هنا",
		recentHint: "ستظهر المنتجات التي تتصفّحها هنا",
	},
	en: {
		title: "My Collection",
		favorites: "Favorites",
		recent: "Recently viewed",
		favHint: "Tap ♥ on any product to save it here",
		recentHint: "Products you open will show up here",
	},
	tr: {
		title: "Koleksiyonum",
		favorites: "Favoriler",
		recent: "Son görüntülenen",
		favHint: "Kaydetmek için herhangi bir üründe ♥ simgesine dokunun",
		recentHint: "Açtığınız ürünler burada görünecek",
	},
};

function resolve(ids: string[]): Product[] {
	return ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
}

function MiniCard({ product, onRemove }: { product: Product; onRemove?: (id: string) => void }) {
	const image = Array.isArray(product.image) ? product.image[0] : (product.image as string);
	return (
		<div className="group relative flex-shrink-0 w-32">
			<a
				href={`/ar/product/${product.id}`}
				className="block rounded-xl overflow-hidden bg-white/60 dark:bg-surface/60 border border-white/30 dark:border-white/10 shadow-soft hover:shadow-vibrant transition-all duration-300 hover:-translate-y-1"
			>
				<img src={image} alt={product.name} className="w-full h-24 object-cover" loading="lazy" />
				<p className="px-2 py-2 text-xs font-semibold text-text line-clamp-2 text-center min-h-[2.5rem]">
					{product.name}
				</p>
			</a>
			{onRemove && (
				<button
					type="button"
					onClick={() => onRemove(product.id)}
					aria-label="Remove"
					className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
				>
					<span className="icon-[ic--baseline-close] text-base"></span>
				</button>
			)}
		</div>
	);
}

function Column({
	icon,
	label,
	count,
	hint,
	products,
	onRemove,
}: {
	icon: string;
	label: string;
	count: number;
	hint: string;
	products: Product[];
	onRemove?: (id: string) => void;
}) {
	return (
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-4">
				<span className={`${icon} text-2xl text-primary`}></span>
				<h3 className="text-lg font-bold text-text">{label}</h3>
				<span className="text-xs font-semibold text-white bg-gradient-primary rounded-full px-2 py-0.5">
					{count}
				</span>
			</div>
			{products.length === 0 ? (
				<p className="text-sm text-text-secondary py-6 text-center">{hint}</p>
			) : (
				<div className="flex gap-3 overflow-x-auto pb-3 scroll-smooth">
					{products.map((p) => (
						<MiniCard key={p.id} product={p} onRemove={onRemove} />
					))}
				</div>
			)}
		</div>
	);
}

function UserCollections({ lang = "ar" }: { lang?: Lang }) {
	const t = COPY[lang] ?? COPY.ar;
	const [favorites, setFavorites] = useState<Product[]>([]);
	const [recent, setRecent] = useState<Product[]>([]);

	useEffect(() => {
		const syncFavorites = () => setFavorites(resolve(getFavorites()));
		const syncRecent = () => setRecent(resolve(getRecentlyViewed()));
		syncFavorites();
		syncRecent();

		const onStorage = () => {
			syncFavorites();
			syncRecent();
		};

		window.addEventListener(FAVORITES_EVENT, syncFavorites);
		window.addEventListener(RECENTLY_VIEWED_EVENT, syncRecent);
		window.addEventListener("storage", onStorage);
		return () => {
			window.removeEventListener(FAVORITES_EVENT, syncFavorites);
			window.removeEventListener(RECENTLY_VIEWED_EVENT, syncRecent);
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	return (
		<section className="py-10">
			<div className="glass p-6 md:p-8 rounded-3xl shadow-vibrant-lg animate-fadeInUp">
				<div className="flex items-center gap-3 mb-6">
					<span className="icon-[mdi--bookmark-multiple] text-3xl text-primary"></span>
					<h2 className="text-2xl md:text-3xl font-bold text-text">{t.title}</h2>
				</div>
				<div className="flex flex-col md:flex-row gap-8 md:gap-10">
					<Column
						icon="icon-[mdi--heart]"
						label={t.favorites}
						count={favorites.length}
						hint={t.favHint}
						products={favorites}
						onRemove={removeFavorite}
					/>
					<div className="hidden md:block w-px bg-white/20 dark:bg-white/10"></div>
					<Column
						icon="icon-[mdi--history]"
						label={t.recent}
						count={recent.length}
						hint={t.recentHint}
						products={recent}
					/>
				</div>
			</div>
		</section>
	);
}

export default UserCollections;
