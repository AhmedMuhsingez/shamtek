import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Chevron from "../Icons/Chevron";
import type { Category } from "../../../types/types";

type Props = {
	categories: Category[];
};

function NavbarProducts({ categories }: Props) {
	const menu_item = categories.map((item, index) => {
		return (
			<MenuItem key={index}>
				<a
					href={item.name}
					className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 data-[focus]:bg-white/50	dark:data-[focus]:bg-white/40 "
				>
					<span className="text-white dark:text-black">{item.name}</span>
				</a>
			</MenuItem>
		);
	});

	return (
		<Menu>
			{({ open }) => (
				<>
					<MenuButton className="flex gap-2 justify-center items-center  text-lg cursor-pointer focus:outline-none group">
						الأقسام
						<Chevron className={` ${open ? "rotate-0" : "rotate-90"}`} />
					</MenuButton>

					<MenuItems
						transition
						anchor="bottom end"
						className="z-50 flex flex-col gap-y-1 mt-2 backdrop-blur-sm origin-top-right rounded-xl p-1 text-sm/6 dark:bg-white/70 bg-black/80 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
					>
						{menu_item}
					</MenuItems>
				</>
			)}
		</Menu>
	);
}

export default NavbarProducts;
