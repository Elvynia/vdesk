export function dasherize(token: string): string {
	return token.replace(/[A-Z]/g, char => '-' + char.toLowerCase());
}
