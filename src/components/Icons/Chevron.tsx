import { cn } from "../../utils/utils"

function Chevron({
	direction,
	className,
}: {
	direction?: "left" | "right" | "up" | "down"
	className?: string
}) {
	return (
		<div>
			<svg
				fill="currentColor"
				viewBox="0 0 24 24"
				className={cn(
					"w-[18px] cursor-pointer ",
					direction === "left" ? "rotate-180" : direction === "down" && "rotate-90",
					className
				)}
			>
				<polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"></polygon>
			</svg>
		</div>
	)
}

export default Chevron
