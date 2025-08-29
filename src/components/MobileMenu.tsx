import { useState, useEffect } from "react";
import ChangeLanguage from "./ChangeLanguage";
import { useTranslatedPath } from "../utils/i18n";
import navbar from "../data/navbar.json";

interface Props {
	currentLang?: string;
	categories?: any[];
	translations?: Record<string, any>;
}

// Theme Toggle Component
function ThemeToggleButton() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check initial theme
		const checkTheme = () => {
			const htmlElement = document.documentElement;
			setIsDark(htmlElement.classList.contains("dark"));
		};

		checkTheme();

		// Listen for theme changes
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => {
		const html = document.documentElement;
		const newTheme = isDark ? "light" : "dark";

		html.classList.remove("light", "dark");
		html.classList.add(newTheme);
		localStorage.setItem("theme", newTheme);

		setIsDark(!isDark);
	};

	return (
		<button
			onClick={toggleTheme}
			className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
			aria-label="Toggle theme"
		>
			{isDark ? (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<circle cx="12" cy="12" r="5"></circle>
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
				</svg>
			)}
		</button>
	);
}

function MobileMenu({ currentLang = "ar", categories = [], translations = {} }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const translatePath = useTranslatedPath(
		currentLang as keyof typeof import("../utils/i18n").languages
	);

	// Apply background blur effect when menu is open
	useEffect(() => {
		if (isOpen) {
			// Apply blur to main content and other elements, excluding mobile menu
			const elementsToBlur = document.querySelectorAll(
				"main, header:not(.mobile-menu-container), nav:not(.mobile-menu-container), section, footer"
			);

			document.body.style.overflow = "hidden";
			const body = document.getElementById("website");
			if (body) {
				body.style.overflow = "hidden";
			}

			elementsToBlur.forEach((element) => {
				const htmlElement = element as HTMLElement;
				// Skip if element is part of mobile menu
				if (
					!htmlElement.closest("[data-mobile-menu]") &&
					!htmlElement.querySelector("[data-mobile-menu]")
				) {
					htmlElement.style.filter = "blur(6px)";
					htmlElement.style.transition = "filter 0.3s ease-in-out";
				}
			});

			// Prevent body scroll with enhanced positioning
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.height = "100%";
			const websiteBody = document.getElementById("website");
			if (websiteBody) {
				websiteBody.style.overflow = "hidden";
				websiteBody.style.position = "fixed";
				websiteBody.style.height = "100%";
			}
		} else {
			// Remove blur effects from all elements
			const elementsToUnblur = document.querySelectorAll(
				"main, header, nav, section, footer"
			);

			document.body.style.overflow = "";

			elementsToUnblur.forEach((element) => {
				const htmlElement = element as HTMLElement;
				htmlElement.style.filter = "none";
			});

			// Restore body scroll and positioning
			document.body.style.overflow = "unset";
			document.body.style.position = "unset";
			document.body.style.height = "unset";
			const websiteBody = document.getElementById("website");
			if (websiteBody) {
				websiteBody.style.overflow = "unset";
				websiteBody.style.position = "unset";
				websiteBody.style.height = "unset";
			}
		}

		// Cleanup function
		return () => {
			const allElements = document.querySelectorAll("main, header, nav, section, footer");
			allElements.forEach((element) => {
				const htmlElement = element as HTMLElement;
				htmlElement.style.filter = "none";
			});
			document.body.style.overflow = "unset";
			document.body.style.position = "unset";
			document.body.style.height = "unset";
			const websiteBody = document.getElementById("website");
			if (websiteBody) {
				websiteBody.style.overflow = "unset";
				websiteBody.style.position = "unset";
				websiteBody.style.height = "unset";
			}
		};
	}, [isOpen]);

	// Enhanced mobile menu functionality
	useEffect(() => {
		if (isOpen) {
			// Add active state management for mobile menu links
			const updateMobileActiveStates = () => {
				const currentPath = window.location.pathname;
				const mobileLinks = document.querySelectorAll(".mobile-nav-link");

				mobileLinks.forEach((link) => {
					const htmlLink = link as HTMLAnchorElement;
					const href = htmlLink.getAttribute("href");
					const isActive = href && currentPath.includes(href) && href !== "/";

					if (isActive) {
						htmlLink.classList.add("bg-primary/20", "text-primary", "font-semibold");
						htmlLink.classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-800");
					} else {
						htmlLink.classList.remove(
							"bg-primary/20",
							"text-primary",
							"font-semibold"
						);
						htmlLink.classList.add("hover:bg-gray-100", "dark:hover:bg-gray-800");
					}
				});
			};

			// Update active states when menu opens
			setTimeout(updateMobileActiveStates, 100);
		}
	}, [isOpen]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	// Enhanced link click handler with smooth scrolling
	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Check if it's an anchor link (starts with #)
		if (href && href.startsWith("#")) {
			e.preventDefault();
			closeMenu();

			// Wait for menu to close, then scroll
			setTimeout(() => {
				const targetElement = document.querySelector(href);
				if (targetElement) {
					targetElement.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}, 300);
		} else {
			closeMenu();
		}
	};

	return (
		<div className="md:hidden relative" data-mobile-menu>
			{/* Menu Toggle Button */}
			<button
				onClick={toggleMenu}
				className="flex items-center justify-center w-10 h-10 bg-primary/20 hover:bg-primary/30 backdrop-blur-lg rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
				aria-label="Toggle mobile menu"
			>
				<div className="relative w-6 h-6">
					<span
						className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${
							isOpen ? "rotate-45 translate-y-2" : ""
						}`}
					/>
					<span
						className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
							isOpen ? "opacity-0" : ""
						}`}
					/>
					<span
						className={`absolute left-0 top-5 w-6 h-0.5 bg-current transform transition-all duration-300 ${
							isOpen ? "-rotate-45 -translate-y-2" : ""
						}`}
					/>
				</div>
			</button>

			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-xl z-40"
					onClick={closeMenu}
					data-mobile-menu
				/>
			)}

			{/* Mobile Menu Panel */}
			<div
				className={`fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 z-50 transform transition-all duration-300 origin-top-right ${
					isOpen
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 -translate-y-4 pointer-events-none"
				}`}
				style={{ maxHeight: "calc(100vh - 6rem)" }}
				data-mobile-menu
			>
				{/* Scrollable Menu Content */}
				<div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 12rem)" }}>
					<div className="p-4 space-y-2">
						{/* Home Link */}
						<a
							href={translatePath("/")}
							className="mobile-nav-link block p-3 rounded-lg transition-all duration-200 text-gray-900 dark:text-white hover:scale-[1.02] hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
							onClick={(e) => handleLinkClick(e, translatePath("/"))}
						>
							<span className="font-medium">
								{translations?.nav?.home || "Home"}
							</span>
						</a>

						{/* Products Link */}
						<a
							href={translatePath("/all-products")}
							className="mobile-nav-link block p-3 rounded-lg transition-all duration-200 text-gray-900 dark:text-white hover:scale-[1.02] hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
							onClick={(e) => handleLinkClick(e, translatePath("/all-products"))}
						>
							<span className="font-medium">
								{translations?.nav?.allProducts || "All Products"}
							</span>
						</a>

						{/* Navbar Items */}
						{navbar.map((item, index) => (
							<a
								key={index}
								href={translatePath(item.link)}
								className="mobile-nav-link block p-3 rounded-lg transition-all duration-200 text-gray-900 dark:text-white hover:scale-[1.02] hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
								onClick={(e) => handleLinkClick(e, translatePath(item.link))}
							>
								<span className="font-medium">
									{item.nameKey === "nav.about"
										? translations?.nav?.about || "About"
										: item.nameKey === "nav.contact"
										? translations?.nav?.contact || "Contact"
										: item.nameKey}
								</span>
							</a>
						))}
					</div>
				</div>

				{/* Header with Controls */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
					{/* Left side - Language and Theme Controls */}
					<div className="flex items-center gap-3">
						{/* Language Selector */}
						<div className="scale-90">
							<ChangeLanguage currentLang={currentLang} />
						</div>

						{/* Theme Toggle */}
						<ThemeToggleButton />
					</div>

					{/* Right side - Close Button */}
					<button
						onClick={closeMenu}
						className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
						aria-label="Close menu"
					>
						×
					</button>
				</div>
			</div>
		</div>
	);
}

export default MobileMenu;
