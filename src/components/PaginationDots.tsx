// components/PaginationDots.tsx
import { useEffect } from "react";

interface PaginationDotsProps {
	containerId: string;
	imageCount: number;
}

export default function PaginationDots({ containerId, imageCount }: PaginationDotsProps) {
	useEffect(() => {
		const scrollContainer = document.getElementById(containerId);
		const pagination = document.getElementById(`pagination-${containerId}`);
		if (!scrollContainer || !pagination || imageCount <= 1) return;

		pagination.innerHTML = "";
		for (let i = 0; i < imageCount; i++) {
			const dot = document.createElement("span");
			dot.className = "w-2 h-2 rounded-full bg-gray-300 transition-all";
			if (i === 0) dot.classList.add("bg-gray-800");
			pagination.appendChild(dot);
		}

		const dots = pagination.querySelectorAll("span");

		const updateDots = () => {
			const scrollLeft = scrollContainer.scrollLeft;
			const itemWidth = scrollContainer.scrollWidth / imageCount;
			const currentIndex = Math.round(scrollLeft / itemWidth);

			dots.forEach((dot, idx) => {
				dot.classList.toggle("bg-gray-800", idx === currentIndex);
				dot.classList.toggle("bg-gray-300", idx !== currentIndex);
			});
		};

		scrollContainer.addEventListener("scroll", updateDots);
		return () => scrollContainer.removeEventListener("scroll", updateDots);
	}, [containerId, imageCount]);

	return (
		<div className="flex gap-2 mt-2 justify-center min-h-[1rem] bg-yellow-100">
			<span className="w-3 h-3 bg-red-500 rounded-full"></span>
			<span className="w-3 h-3 bg-red-500 rounded-full"></span>
		</div>
	);
}
