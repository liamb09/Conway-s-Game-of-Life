let array = []
let nextArray
let length = 30
let width = 30
initiateArray(length*width, 0)


function iterate () {
    let liveAdjCells = 0
    nextArray = []
    for (let i = 0; i < (length*width); i++) {
        liveAdjCells = liveItemsInList(findAdjacentTiles(positionInArray(i)[0], positionInArray(i)[1], array))
        if (array[i] == 1) {
            if (liveAdjCells < 2) {
                nextArray.push(0)
            } else if (liveAdjCells == 2 || liveAdjCells == 3) {
                nextArray.push(1)
            } else {
                nextArray.push(0)
            }
        } else {
            if (liveAdjCells == 3) {
                nextArray.push(1)
            } else {
                nextArray.push(0)
            }
        }
    }
    array = nextArray
    updateGrid(array)
}

function updateGrid (list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == 1) {
            document.getElementById(i.toString()).style.backgroundColor = "#afb219"
        } else {
            document.getElementById(i.toString()).style.backgroundColor = "#4f4f4f"
        }
    }
}

function liveItemsInList(list) {
    items = 0
    for (let i = 0; i < list.length; i++) {
        if (list[i] == 1) {
            items++
        }
    }
    return items
}

function findAdjacentTiles (x, y, list) {
    // Index Codes: 0=top, 1=topright, 2=right, 3=bottomright, 4=bottom, 5=bottomleft, 6=left, 7=topleft
    let adjacentTiles = []
    adjacentTiles.push(tileStatus(x, (y-1), list))
    adjacentTiles.push(tileStatus((x+1), (y-1), list))
    adjacentTiles.push(tileStatus((x+1), y, list))
    adjacentTiles.push(tileStatus((x+1), (y+1), list))
    adjacentTiles.push(tileStatus(x, (y+1), list))
    adjacentTiles.push(tileStatus((x-1), (y+1), list))
    adjacentTiles.push(tileStatus((x-1), y, list))
    adjacentTiles.push(tileStatus((x-1), (y-1), list))
    return adjacentTiles
}

function tileStatus (x, y, list) {
    return list[y*length+x]
}

function positionInArray (i) {
    return [i%length, Math.floor(i/length)]
}

function initiateArray (quantity, fillWith) {
    for (let i = 0; i < quantity; i++) {
        array.push(fillWith)
    }
}

function initiateGrid () {
    let grid  = document.getElementById("grid")
    for (let y = 0; y < width; y++) {
        grid.innerHTML += `<div id=\"row\" class=\"${y}\">`
        for (let x = 0; x < length; x++) {
            grid.innerHTML += `<div class=\"square\" onclick=\"toggleColor(this.id)\" id=\"${y*length+x}\">`
        }
        grid.innerHTML += "</div></div><br>"
    }
}

function toggleColor (id) {
    if (array[parseInt(id)] == 0) {
        array[parseInt(id)] = 1
        document.getElementById(id.toString()).style.backgroundColor = "#afb219"
    } else if (array[parseInt(id)] == 1) {
        array[parseInt(id)] = 0
        document.getElementById(id.toString()).style.backgroundColor = "#4f4f4f"
    }
}