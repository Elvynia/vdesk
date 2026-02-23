export const reduceArrayToObject = <T extends { _id: string }>(acc: Record<string, T>, d: T) => Object.assign(acc, { [d._id]: d });
