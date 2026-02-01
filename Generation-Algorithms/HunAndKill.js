class HUKGenerator extends MazeGenerator
{
    constructor(grid) {
        super(grid);
        this.current = grid[floor(random(this.grid.length))];
        this.current.visited = true;
        this.hunting = false;
        this.huntIndex = 0 ;
        this.huntCell = undefined;
    }

    step()
    {
        if (!this.hunting) {
            this.huntAndKill();
          } else {
            this.huntPhase();
          }
    }


    huntAndKill(){

        this.current.visited = true;
        //get unvisited neighbors
        let  UnvistedNeighbours = this.current.getNeighbors((cell) => cell !== undefined && !cell.visited) ;
        let nextIndex = UnvistedNeighbours.length > 0 ?   floor(random(UnvistedNeighbours.length)) : undefined;
        console.log(nextIndex);
        let next = UnvistedNeighbours[nextIndex];
        if(next !== undefined){
            breakWalls(this.current, next);
            this.current = next;
        }else {
            // Hunt Phase
            this.hunting = true;
            this.huntIndex = 0; // Start scanning from the beginning
        }
    }

    huntPhase(){
        
        if(this.huntIndex< this.grid.length){
            this.huntCell = this.grid[this.huntIndex];
            this.huntIndex++;
            this.huntCell.highlight();
            //scan the grid to find unvisited cell has visited neighbors
            if(!this.huntCell.visited){
                let visitedNeighbours = this.huntCell.getNeighbors((cell) => cell !== undefined && cell.visited);
                if(visitedNeighbours.length > 0){
                    //pick random visited neighbour and open passage
                    //the hunted cell will be the current cell and hunting phase will stop
                    let next = visitedNeighbours[floor(random(visitedNeighbours.length))];
                    breakWalls(this.huntCell, next);
                    this.huntCell.visited = true;
                    this.current = this.huntCell;
                    this.hunting = false;
                }
            }
            
        }

    }

    isComplete() {
        return this.grid.every(cell => cell.visited);
    }

}