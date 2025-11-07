export function formParseFromDate(date: Date, hasTime: boolean = false) {
	let result = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
	if (!hasTime) {
		result.setUTCHours(0, 0, 0, 0);
	}
	return result.toISOString();
}

export function formParseToDate(date: string, hasTime: boolean = false) {
	let result = new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
	if (!hasTime) {
		result.setUTCHours(0, 0, 0, 0);
	}
	return result;
}
