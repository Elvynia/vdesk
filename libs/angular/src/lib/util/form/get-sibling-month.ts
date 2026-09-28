export function getSiblingMonth(date: Date, offset: number = 1) {
	return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}
