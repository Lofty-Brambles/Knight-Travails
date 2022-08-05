const actions = [
	[1, 2],
	[2, 1],
	[1, -2],
	[-2, 1],
	[-1, 2],
	[2, -1],
	[-1, -2],
	[-2, -1],
];
let returnVals = [];
const check = (move) => move[0] >= 0 && move[1] >= 0 && move[0] < 8 && move[1] < 8;
const includes = (arr, move) => {
	const presence = arr.filter(e => e[0] === move[0] && e[1] === move[1]);
	return presence.length > 0;
};
const displayFetcher = (unit) => {
	if (unit.parent !== null)
		displayFetcher(unit);
	returnVals.push(unit.position);
};
class Block {
	constructor(pos, parent = null) {
		this.position = pos;
		this.parent = parent;
		this.history = [pos];
	}

	children() {
		return actions
			.map(e => [this.position[0] + e[0], this.position[1] + e[1]])
			.filter(e => check(e) && !includes(this.history, e))
			.map(e => new Block(e, this));
	}
}
const knightMoves = (start, end) => {
	const queue = [];
	let currentBlock = new Block(start);
	while (currentBlock.position !== end) {
		queue.push(...currentBlock.children());
		currentBlock = queue.shift();
	}
	const localVal = displayFetcher(currentBlock);
	returnVals = [];
	return localVal;
};
console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]];
console.log(knightMoves([0, 0], [3, 3])); // [[0,0],[1,2],[3,3]];
console.log(knightMoves([3, 3], [0, 0])); // [[3,3],[1,2],[0,0]];
