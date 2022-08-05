type Move = [number, number];

const actions: Move[] = [
	[1, 2],
	[2, 1],
	[1, -2],
	[-2, 1],
	[-1, 2],
	[2, -1],
	[-1, -2],
	[-2, -1],
];
let returnVals: Move[] = [];

const check = (move: Move) =>
	move[0] >= 0 && move[1] >= 0 && move[0] < 8 && move[1] < 8;
const includes = (arr: Move[], move: Move) => {
	const presence = arr.filter(e => e[0] === move[0] && e[1] === move[1]);
	return presence.length > 0 ? true : false;
};
const displayFetcher = (unit: Block) => {
	if (unit.parent !== null) displayFetcher(unit);
	returnVals.push(unit.position);
};

class Block {
	position: Move;
	parent: Block | null;
	history: Move[];

	constructor(pos: Move, parent: Block | null = null) {
		this.position = pos;
		this.parent = parent;
		this.history = [pos];
	}

	children() {
		return actions
			.map(
				e => [this.position[0] + e[0], this.position[1] + e[1]] as Move
			)
			.filter(e => check(e) && !includes(this.history, e))
			.map(e => new Block(e, this));
	}
}

const knightMoves = (start: Move, end: Move) => {
	const queue: Block[] = [];
	let currentBlock: Block = new Block(start);

	while (currentBlock.position !== end) {
		queue.push(...currentBlock.children());
		currentBlock = queue.shift() as Block;
	}

	const localVal = displayFetcher(currentBlock);
	returnVals = [];
	return localVal;
};

console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]];
console.log(knightMoves([0, 0], [3, 3])); // [[0,0],[1,2],[3,3]];
console.log(knightMoves([3, 3], [0, 0])); // [[3,3],[1,2],[0,0]];
