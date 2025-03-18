export const getApi = async (url: string) => {
	const response = await fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	});
	return response.json();
};

export const postApi = async (url: string, data: any) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	return response.json();
};

export const putApi = async (url: string, data: any) => {
	const response = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	return response.json();
};

export const deleteApi = async (url: string, id: string, title: string) => {
	const response = await fetch(url, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id })
	});
	return title;
};
