export type StringKeys<E> = {
	[K in keyof E]: E[K] extends string ? K : never
}[keyof E] & string;
