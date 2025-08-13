import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Language from "./Icons/language";

type Props = {};

function ChangeLanguage({}: Props) {
	const LANGUAGES = [
		{
			name: "Arabic",
			icon: "flags/sy.webp",
			link: "#",
		},
		{
			name: "English",
			icon: "flags/uk.webp",
			link: "#",
		},

		{
			name: "Turkish",
			icon: "flags/tr.webp",
			link: "#",
		},
	];

	const menu_item = LANGUAGES.map((item, index) => {
		return (
			<MenuItem key={index}>
				<a
					href={item.link}
					className="group flex w-full items-center justify-between gap-4 rounded-lg py-1.5 px-3 data-[focus]:bg-white/20	dark:data-[focus]:bg-white/40 "
				>
					<span className="text-white dark:text-black ">{item.name}</span>

					<img
						src={item.icon}
						className="w-6 h-6 rounded-full"
						aria-label={item.name}
					/>
				</a>
			</MenuItem>
		);
	});

	return (
		<Menu>
			<MenuButton className="flex gap-2 justify-center items-center tran text-lg cursor-pointer focus:outline-none group">
				<div className="mt-1 mx-1">
					<Language />
				</div>
			</MenuButton>

			<MenuItems
				transition
				anchor="bottom end"
				className="z-50 flex flex-col gap-y-2 mt-2 ml-4 backdrop-blur-sm origin-top-right rounded-xl p-1 text-sm/6 dark:bg-white/70 bg-black/80  ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
			>
				{menu_item}
			</MenuItems>
		</Menu>
	);
}

export default ChangeLanguage;
