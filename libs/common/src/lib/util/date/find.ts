/**
 * Return the first day of the week corresponding to the given date.
 *
 * @param date the date to start from
 * @param inMonth whether to stay in the same month or go to the previous one if needed
 * @param resetHours whether to set time at 00:00:00.0000
 */
export function findStartOfWeek(date: Date, inMonth: boolean = true, resetHours: boolean = true) {
	let result = new Date(date);
	let diff = date.getDate() - date.getDay() + 1;
	if (inMonth) {
		diff = Math.max(0, diff);
	}
	result.setDate(diff);
	if (resetHours) {
		result.setHours(0, 0, 0, 0);
	}
	return result;
}
