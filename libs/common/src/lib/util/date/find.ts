/**
 * Return the first day of the week corresponding to the given date.
 *
 * @param date the date to start from
 * @param day the day of the week to find between 1 and 7
 * @param inMonth whether to stay in the same month or go to the previous one if needed
 * @param resetHours whether to set time at 00:00:00.0000
 */
export function findDayOfWeek(date: Date, day: number = 1, inMonth: boolean = true, resetHours: boolean = true) {
	let result = new Date(date);
	let diff = date.getDate() - date.getDay() + day;
	if (inMonth) {
		const dayCount = getMonthDayCount(date.getMonth() + 1, date.getFullYear());
		diff = Math.min(dayCount, Math.max(1, diff));
	}
	result.setDate(diff);
	if (resetHours) {
		result.setHours(0, 0, 0, 0);
	}
	return result;
}

/**
 * Get the number of days in the given month for the given year.
 *
 * @param m the month index starting with 1
 * @param y the full year
 * Source - https://stackoverflow.com/a/27947860
 * Posted by iCollect.it Ltd, modified by community. See post 'Timeline' for change history
 * Retrieved 2025-11-09, License - CC BY-SA 4.0
 */
function getMonthDayCount(m: number, y: number) {
	return m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
}
