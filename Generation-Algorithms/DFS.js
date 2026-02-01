class DFSGenerator extends MazeGenerator {
    constructor(grid) {
        super(grid);
        this.stack = [];
    }

    step() {
        this.current.visited = true;
        this.current.highlight();

        let neighbors = this.current.getNeighbors((cell)=> cell !== undefined && !cell.visited);

        if (neighbors.length > 0) {
            let next = neighbors[floor(random(0, neighbors.length))];
            this.stack.push(this.current);
            breakWalls(this.current, next);
            this.current = next;
        } else if (this.stack.length > 0) {
            this.current = this.stack.pop();
        }
    }

    // Function to check if maze is complete
    isComplete() {
        return this.stack.length === 0;  // If stack is empty, maze is done
    }

}
