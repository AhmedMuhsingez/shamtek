import type { CompanyDetails } from "../../types/types";
import { baseAPI } from "../api/endpoints";

const company = await fetch(`${baseAPI}/company`);

const data: CompanyDetails = await company.json();

export const companyData = {
	name: data.name,
	logo: data.logo,
	address: data.address,
	phone: data.phone,
	email: data.email ?? "shaamtek4@gmail.com",
	facebook: "https://facebook.com/shamtek12321",
	instagram: "https://instagram.com/sham_tek1",
};
