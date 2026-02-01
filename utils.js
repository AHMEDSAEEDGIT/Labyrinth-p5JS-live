// Convert (i, j) to a 1D array index
function Index(i, j) {
    if (i < 0 || j < 0 || i > COLS - 1 || j > ROWS - 1) {
        return -1;
    }
    return i + j * COLS;
}

// Remove walls between two cells
function breakWalls(current, neighbor) {
    let dx = current.i - neighbor.i;
    if (dx == 1) {
        current.walls.left = false;
        neighbor.walls.right = false;
    }
    if (dx == -1) {
        current.walls.right = false;
        neighbor.walls.left = false;
    }

    let dy = current.j - neighbor.j;
    if (dy == 1) {
        current.walls.top = false;
        neighbor.walls.bottom = false;
    }
    if (dy == -1) {
        current.walls.bottom = false;
        neighbor.walls.top = false;
    }
}


