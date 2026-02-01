class DFSSolver {
    constructor(grid, start, goal) {
        this.grid = grid;
        this.start = start;
        this.goal = goal;
        this.stack = [];
        this.visited = new Set();
        this.path = [];
        this.isComplete = false;
        // Start DFS
        this.stack.push(start);
        this.visited.add(start);
    }

    solveStep() {
        if (this.stack.length === 0) {t
             return ;
        } // No solution found

        let current = this.stack.pop();
        this.path.push(current);

        if (current === this.goal) {
            console.log("Goal reached!");
            this.isComplete = true;
            return;
        }

        let neighbors = this.getUnvisitedNeighbors(current);
        for (let neighbor of neighbors) {
            if (!this.visited.has(neighbor)) {
                this.visited.add(neighbor);
                this.stack.push(neighbor);
            }
        }
    }

    

    getUnvisitedNeighbors(cell) {
        let neighbors = [];
        let i = cell.i;
        let j = cell.j;

        let top = Grid[Index(i, j - 1)];
        let right = Grid[Index(i + 1, j)];
        let bottom = Grid[Index(i, j + 1)];
        let left = Grid[Index(i - 1, j)];

        if (top && !this.reached&& !cell.walls.top) neighbors.push(top);
        if (right && !this.reached && !cell.walls.right) neighbors.push(right);
        if (bottom && !this.reached && !cell.walls.bottom) neighbors.push(bottom);
        if (left && !this.reached && !cell.walls.left) neighbors.push(left);

        return neighbors;
    }

    highlightPath() {
        // for (let cell of this.path) {
        //     fill(0, 0, 255, 150); // Blue for solution path
        //     noStroke();
        //     rect(cell.i * TILE, cell.j * TILE, TILE, TILE);
        // }






        // if (this.path.length < 2) return; // At least 2 points needed

        // stroke(0, 0, 255); // Blue for path
        // strokeWeight(4);
        // noFill();

        // beginShape();
        // for (let cell of this.path) {
        //     vertex(cell.i * TILE + TILE / 2, cell.j * TILE + TILE / 2); // Center of cell
        // }
        // endShape();






        stroke(0, 0, 255); // Blue color for the path
    strokeWeight(4);
    noFill();

    for (let i = 0; i < this.path.length - 1; i++) {
        let cellA = this.path[i];
        let cellB = this.path[i + 1];

        // 🔹 Only draw if there’s no wall blocking the way
        if (
            (cellA.i === cellB.i && Math.abs(cellA.j - cellB.j) === 1 && !cellA.walls.bottom && !cellB.walls.top) || // Vertical movement
            (cellA.j === cellB.j && Math.abs(cellA.i - cellB.i) === 1 && !cellA.walls.right && !cellB.walls.left)    // Horizontal movement
        ) {
            line(cellA.i * TILE + TILE / 2, cellA.j * TILE + TILE / 2, 
                 cellB.i * TILE + TILE / 2, cellB.j * TILE + TILE / 2);
        }
    }


    }

    isComplete() {
        return this.stack.length === 0;  // If stack is empty, maze is done
    }
}
