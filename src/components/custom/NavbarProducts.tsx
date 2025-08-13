import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Chevron from "../Icons/Chevron";

type Props = {
	dummy: { name: string; link: string }[];
};

function NavbarProducts({ dummy }: Props) {
	const menu_item = dummy.map((item, index) => {
		return (
			<MenuItem key={index}>
				<a
					href={item.link}
					className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 data-[focus]:bg-white/50	dark:data-[focus]:bg-white/40 transition-colors duration-300"
				>
					<span className="text-white dark:text-black transition duration-300">
						{item.name}
					</span>
				</a>
			</MenuItem>
		);
	});

	return (
		<Menu>
			{({ open }) => (
				<>
					<MenuButton className="flex gap-2 justify-center items-center transition-all duration-300 text-lg cursor-pointer focus:outline-none group">
						Products
						<Chevron
							className={`transition-transform duration-300 ${
								open ? "rotate-180" : "rotate-90"
							}`}
						/>
					</MenuButton>

					<MenuItems
						transition
						anchor="bottom end"
						className="z-50 flex flex-col gap-y-1 mt-2 backdrop-blur-sm origin-top-right rounded-xl p-1 text-sm/6 dark:bg-white/70 bg-black/80 transition duration-300 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
					>
						{menu_item}
					</MenuItems>
				</>
			)}
		</Menu>
	);
}

export default NavbarProducts;
