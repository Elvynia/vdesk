export type FormParseNumber = string | number | undefined;

export function formParseNumber<T extends FormParseNumber>(
	value: T,
	parseFn: (s: string) => number,
	unwrap: (s: string) => string = (s) => s.replace(/[$€,]/g, '')
) {
	if (value && typeof value === 'string') {
		let parseVal = unwrap ? unwrap(value) : value;
		return parseFn(parseVal);
	}
	return value as number | undefined;
}

export const formParseFloat = (value: FormParseNumber, unwrap?: (s: string) => string) => formParseNumber(value, parseFloat, unwrap);
export const formParseInt = (value: FormParseNumber, unwrap?: (s: string) => string) => formParseNumber(value, parseInt, unwrap);
