import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import Chevron from "../Icons/Chevron";
import type { Category } from "../../../types/types";
import { localizeCategoryName } from "../../data/dummy-data";

type Props = {
	categories: Category[];
	lang?: "ar" | "en" | "tr";
};

function NavbarProducts({ categories, lang = "ar" }: Props) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const currentPath = window.location.pathname;
		const isCategoryPage = categories.some((category) =>
			currentPath.includes(category.slug.toLowerCase()),
		);
		setIsActive(isCategoryPage);
	}, [categories]);

	const menu_item = categories.map((item) => {
		return (
			<MenuItem key={item.id}>
				{({ focus, active }) => (
					<a
						href={`/${lang}/category/${item.slug}`}
						className={`group flex w-full items-center gap-2 rounded-lg px-1 py-2.5 transition-all duration-200 justify-between ${
							focus || active
								? "bg-primary/20 text-primary transform scale-[1.02]"
								: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
						}`}
					>
						<span className="font-medium">
							{localizeCategoryName(item.slug, item.name, lang)}
						</span>
					</a>
				)}
			</MenuItem>
		);
	});

	return (
		<Menu>
			{({ open }) => (
				<div>
					<MenuButton
						className={`navbar-link flex gap-2 justify-center items-center text-lg cursor-pointer focus:outline-none group md:px-3 px-2 py-2 rounded-lg transition-all duration-200 ${
							isActive
								? "text-primary bg-primary/10 font-semibold"
								: "hover:text-primary hover:bg-primary/5"
						}`}
					>
						<span className="font-medium">
							{lang === "ar"
								? "الأقسام"
								: lang === "en"
									? "Categories"
									: "Kategoriler"}
						</span>
						<Chevron
							className={`transition-transform duration-300 ${
								open ? "rotate-90" : lang === "ar" ? "rotate-180" : "rotate-0"
							}`}
						/>
					</MenuButton>

					<MenuItems
						transition
						anchor="bottom start"
						className="ml-2 z-50 min-w-[100px] mt-2 backdrop-blur-xl origin-top-left rounded-xl p-2 shadow-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 focus:outline-none transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[closed]:-translate-y-1"
					>
						<div className="space-y-1">{menu_item}</div>
					</MenuItems>
				</div>
			)}
		</Menu>
	);
}

export default NavbarProducts;
