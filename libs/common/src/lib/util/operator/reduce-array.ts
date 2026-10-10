export const reduceArrayToObject = <T extends { _id: string }>(acc: Record<string, T>, d: T) => Object.assign(acc, { [d._id]: d });

export function reduceArrayToMap<K extends string>(property: K) {
	return <T extends Record<K, any>>(acc: Map<T[K], T[]>, item: T) => {
		(acc.get(item[property]) ?? acc.set(item[property], []).get(item[property])!).push(item);
		return acc;
	};
}
