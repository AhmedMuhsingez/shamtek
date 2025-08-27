import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Language from "./Icons/language";
import { languages, getLanguageFlag } from "../utils/i18n";
import { useEffect, useState } from "react";

type Props = {
	currentLang?: string;
};

function ChangeLanguage({ currentLang = "ar" }: Props) {
	// State to track the actual current language
	const [detectedLang, setDetectedLang] = useState(currentLang);

	// Get current path without language prefix
	const getCurrentPath = () => {
		if (typeof window === "undefined") return "/";
		const path = window.location.pathname;
		// Remove language prefix from path
		const pathWithoutLang = path.replace(/^\/(ar|en|tr)/, "") || "/";
		return pathWithoutLang;
	};

	// Detect language from URL on client side
	useEffect(() => {
		if (typeof window !== "undefined") {
			const path = window.location.pathname;
			const langMatch = path.match(/^\/(ar|en|tr)/);
			const urlLang = langMatch ? langMatch[1] : "ar"; // Default to 'ar' if no language in URL
			setDetectedLang(urlLang);
		}
	}, []);

	const currentPath = getCurrentPath();

	const activeLang = detectedLang || currentLang;

	const LANGUAGES = Object.entries(languages).map(([code, name]) => ({
		code,
		name,
		icon: getLanguageFlag(code as keyof typeof languages),
		link: code === "ar" ? `/ar${currentPath}` : `/${code}${currentPath}`,
	}));

	const menu_item = LANGUAGES.map((item, index) => {
		const isActive = item.code === activeLang;
		return (
			<MenuItem key={index}>
				<a
					href={item.link}
					className={`group flex w-full items-center justify-between gap-4 rounded-lg py-2 px-3 transition-all duration-200 hover:scale-105 ${
						isActive
							? "bg-primary/20 text-primary border border-primary/30"
							: "text-white dark:text-black hover:bg-white/20 dark:hover:bg-white/40"
					}`}
				>
					<span className="font-medium">{item.name}</span>
					<div className="relative">
						<img
							src={item.icon}
							className="w-6 h-6 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-110"
							aria-label={item.name}
						/>
						{isActive && (
							<div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
						)}
					</div>
				</a>
			</MenuItem>
		);
	});

	return (
		<Menu>
			<MenuButton className="flex gap-2 justify-center items-center text-lg cursor-pointer focus:outline-none group transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-white/10">
				<div className="transition-transform duration-200 group-hover:rotate-12">
					<Language />
				</div>
			</MenuButton>

			<MenuItems
				transition
				anchor="bottom end"
				className="z-50 flex flex-col gap-y-1 mt-3 ml-4 backdrop-blur-md origin-top-right rounded-2xl p-2 text-sm/6 dark:bg-white/80 bg-black/90 shadow-2xl border border-white/20 dark:border-black/20 transition-all duration-300 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[closed]:translate-y-2 min-w-[160px]"
			>
				{menu_item}
			</MenuItems>
		</Menu>
	);
}

export default ChangeLanguage;
