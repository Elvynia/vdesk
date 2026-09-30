/**
 * Convert from localized date to a UTC date at midnight.
 *
 * @param date a localized date.
 * @returns Date the UTC converted date.
 */
export function parseFromDateOnly(date: Date) {
	return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

/**
 * Convert from ISO string date (must end with 'Z' or '+00:00') to UTC Date object at midnight. If argument is a date
 * object, it is returned as is. If argument is a UTC Date it will not be changed to a localized date.
 *
 * @param date the ISO string or localized date.
 * @returns Date the UTC converted date.
 */
export function parseToDateOnly(date: string | Date) {
	if (typeof date === 'string') {
		const [y, m, d] = date.slice(0, 10).split('-').map(Number);
		return new Date(y, m - 1, d);
	}
	return date;
}
