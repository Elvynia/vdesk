export const reduceArrayToObject = <T extends { _id: string }>(acc: Record<string, T>, d: T) => Object.assign(acc, { [d._id]: d });

export function reduceMapArray<
	T extends Record<K, string>,
	K extends string
>(property: K) {
	return (acc: Map<string, T[]>, item: T) => {
		(acc.get(item[property]) ?? acc.set(item[property], []).get(item[property])!).push(item);
		return acc;
	};
}
