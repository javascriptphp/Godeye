export function findTimestampRanges(array:number[], timestamps:string[], threshold:number) {
	if (array.length !== timestamps.length) {
		throw new Error("Array and timestamps must have the same length");
	}
	const n = array.length;
	const intervals = [];
	let start = null;

	for (let i = 1; i < n - 1; i++) {
		if (array[i] < threshold) {
			if (start === null) {
				// 检查左端条件：左端点的前一个元素大于 threshold
				if (array[i - 1] > threshold) {
					start = i;
				}
			}
		} else {
			if (start !== null) {
				// 检查右端条件：右端点的后一个元素大于 threshold
				if (array[i] > threshold) {
					// 确保区间至少包含两个元素
					// if (i - 1 > start) {
						intervals.push([start, i - 1]);
					// }
				}
				start = null;
			}
		}
	}

	// 检查最后一个元素结束区间
	if (start !== null && array[n - 1] > threshold) {
		// 确保区间至少包含两个元素
		// if (n - 1 > start) {
			intervals.push([start, n - 1]);
		// }
	}

	// 提取 timestamps 中对应的区间
	// return intervals.map(([start, end]) => [timestamps[Math.max(0, start - 1)], timestamps[Math.min(end, n - 1)]]);
	return intervals.map(([start, end]) => [timestamps[start], timestamps[end]]);
}
export function findTimestamp(array: string[][]) {
	const timestamps = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === array[i][1]) {
			timestamps.push(array[i][0]);
		}
	}
	return timestamps;
}