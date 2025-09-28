// utils/filterData.ts
export function filterData<T extends Record<string, any>>({
	data,
	searchTerm,
	selectedStatus,
	fields,
	extraFilters = [],
}: {
	data: T[];
	searchTerm: string;
	selectedStatus?: string;
	fields: (keyof T)[];
	extraFilters?: ((item: T) => boolean)[];
}): T[] {
	const term = searchTerm.toLowerCase();

	return data.filter((item) => {
		const matchesSearch = fields.some((field) =>
			String(item[field] ?? "")
				.toLowerCase()
				.includes(term)
		);

		const matchesStatus =
			!selectedStatus ||
			selectedStatus === "all" ||
			item.status === selectedStatus;

		const matchesExtras = extraFilters.every((fn) => fn(item));

		return matchesSearch && matchesStatus && matchesExtras;
	});
}
