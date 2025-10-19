export type FormParseNumber = string | number | undefined;

export function formParseNumber(
	value: FormParseNumber,
	parseFn: (s: string) => number
) {
	if (value) {
		return typeof value === 'string' ? parseFn(value.replace(/[$€]/g, '')) : value;
	}
	return value;
}

export const formParseFloat = (value: FormParseNumber) => formParseNumber(value, parseFloat);
export const formParseInt = (value: FormParseNumber) => formParseNumber(value, parseInt);
