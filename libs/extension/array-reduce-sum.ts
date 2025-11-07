interface Array<T> {
	reduceSum(): number;
}

Array.prototype.reduceSum = function (this: Array<number>) {
	return this.reduce((a, b) => a + b, 0);
};
