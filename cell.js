class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
         this.reached = false;
        this.walls = {  top: true, right: true, bottom: true, left: true };
        this.start = false;
        this.goal = false;
    }
    
    //using higher-order functions we can pass small function 
    // Returns the neighbors of the cell that satisfy the condition
    // we can use to get visited or unvisited neighbors or both
    getNeighbors(condition) {
        let neighbors = [];
        let top = Grid[Index(this.i, this.j - 1)];
        let right = Grid[Index(this.i + 1, this.j)];
        let bottom = Grid[Index(this.i, this.j + 1)];
        let left = Grid[Index(this.i - 1, this.j)];

        if (condition(top)) neighbors.push(top);
        if (condition(right)) neighbors.push(right);
        if (condition(bottom)) neighbors.push(bottom);
        if (condition(left)) neighbors.push(left);

        return  neighbors;
    }


    highlight() {
        let x = this.i * TILE;
        let y = this.j * TILE;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, TILE, TILE);
    }

    show() {
        let x = this.i * TILE;
        let y = this.j * TILE;
        stroke(255);

        if (this.walls.top) line(x, y, x + TILE, y);
        if (this.walls.right) line(x + TILE, y, x + TILE, y + TILE);
        if (this.walls.bottom) line(x + TILE, y + TILE, x, y + TILE);
        if (this.walls.left) line(x, y + TILE, x, y);

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, TILE, TILE);
        }

        if (this.start) {
            fill(0, 255, 0); // Green for Start
            rect(x, y, TILE, TILE);
        } else if (this.goal) {
            fill(255, 0, 0); // Red for Goal
            rect(x, y, TILE, TILE);
        }

    }

    contains(x, y) {
        return (x > this.i * TILE && x < (this.i + 1) * TILE &&
                y > this.j * TILE && y < (this.j + 1) * TILE);
    }


        // getUnVisitedNeighbours(){
    //     let neighbors = [];
    //     let top = Grid[Index(this.i, this.j - 1)];
    //     let right = Grid[Index(this.i + 1, this.j)];
    //     let bottom = Grid[Index(this.i, this.j + 1)];
    //     let left = Grid[Index(this.i - 1, this.j)];

    //     if (top && !top.visited) neighbors.push(top);
    //     if (right && !right.visited) neighbors.push(right);
    //     if (bottom && !bottom.visited) neighbors.push(bottom);
    //     if (left && !left.visited) neighbors.push(left);

    //     return neighbors.length > 0 ? neighbors : undefined;
    // }

    // getVisitedNeighbours(){
    //     let neighbors = [];
    //     let top = Grid[Index(this.i, this.j - 1)];
    //     let right = Grid[Index(this.i + 1, this.j)];
    //     let bottom = Grid[Index(this.i, this.j + 1)];
    //     let left = Grid[Index(this.i - 1, this.j)];

    //     if (top && top.visited) neighbors.push(top);
    //     if (right && right.visited) neighbors.push(right);
    //     if (bottom && bottom.visited) neighbors.push(bottom);
    //     if (left && left.visited) neighbors.push(left);

    //     return neighbors.length > 0 ? neighbors : undefined;
    // }
}
