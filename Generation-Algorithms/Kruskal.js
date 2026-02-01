class KruskalGenerator extends MazeGenerator {
    constructor(grid) {
        super(grid);
        this.currentWallIndex = 0;
        this.walls  = []; // contains all the walls of the gird and it will be randomized
        this.sets = []; // will include the set of each cell
        for (let j = 0; j < ROWS; j++) {
            for (let i = 0; i < COLS; i++) {
              this.sets.push(Index(i,j)); // Each cell is its own set initially
            }
        }

        this.intializedWalls();
        this.walls = shuffle(this.walls);

        
    }

    step(){

        if(this.currentWallIndex < this.walls.length){
            this.kruskalStep();   
        }
    }

    intializedWalls(){
        for ( let j = 0 ; j < ROWS ; j++){
            for(let i = 0 ; i < COLS ; i++){
                if (i < COLS - 1) this.walls.push({ x: i, y: j, dir: "right" }); // Right wall
                 if (j < ROWS - 1) this.walls.push({ x: i, y: j, dir: "bottom" }); // Bottom wall
            }
        }
    }

    kruskalStep() {
        let wall  = this.walls[this.currentWallIndex];
        let x = wall.x;
        let y = wall.y;
        let dir = wall.dir;

        let cell1Index = Index(x, y);
        let cell2Index = dir === "right" ? Index(x + 1, y) : Index(x, y + 1);

        let set1 = this.find(cell1Index);
        let set2 = this.find(cell2Index);

        if (set1 !== set2) {
            if(dir === "right"){
                this.grid[cell1Index].walls.right = false;
                this.grid[cell2Index].walls.left = false;
            }else if (dir === "bottom"){
                this.grid[cell1Index].walls.bottom = false;
                this.grid[cell2Index].walls.top = false;
            }
            this.union(set1, set2);
        }

        this.currentWallIndex++;

    }

    find(cellIndex){
        // Find the root of the set
        if (this.sets[cellIndex] !== cellIndex) {
            this.sets[cellIndex] = this.find(this.sets[cellIndex]); // Path compression
        }
        return this.sets[cellIndex];
    }

    union(setA, setB) {
        // Merge two sets
        this.sets[setB] = setA;
    }
    
    isComplete() {
        return this.currentWallIndex >= this.walls.length;
    }

}   

