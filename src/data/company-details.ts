import type { CompanyDetails } from "../../types/types";

let companyData: CompanyDetails;

try {
	const company = await fetch(`${import.meta.env.PUBLIC_API_URL}/company`);

	if (!company.ok) {
		throw new Error(`HTTP error! status: ${company.status}`);
	}

	const data: CompanyDetails = await company.json();

	companyData = {
		name: data.name,
		logo: typeof data.logo === "string" ? data.logo : "",
		address: data.address,
		phone: data.phone,
		email: "shaamtek4@gmail.com",
		facebook: data.facebook,
		instagram: data.instagram,
		whatsapp: data.whatsapp,
	};
} catch (error) {
	console.error("Error fetching company data:", error);
}
export { companyData };
