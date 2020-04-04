///////////////////////////////////////////////////////////////////
//MODAL LAYOUT AND PAGE CHANGE FUNCTION
//////////////////////////////////////////////////////////////////
let pageNum = 0;
$(document).ready(function(){
  $("#myModal").modal('show');
  changeModalPage(pageNum);
  $("#myModal .prev").click(() => {
    pageNum--;
    changeModalPage(pageNum);
  })

  $("#myModal .next").click(() => {
    pageNum++;
    changeModalPage(pageNum);
  })
});

function changeModalPage(pageNum)
{
  if(pageNum == 9)
  {
    $("#myModal .next").text("Close");
  }
  else
  {
  $("#myModal .next").text("Next");
  }

  if(pageNum == 0)
  {
    $("#myModal .prev").text("Close");
  }
  else
  {
    $("#myModal .prev").text("Prev");
  }


  if(pageNum > 9 || pageNum < 0)
  {
    $("#myModal").modal("hide");
    return;
  }

  for(let i = 0 ; i < 10 ; i++)
  {
    if(i == pageNum)
    {
      $("#myModal #" + i).removeClass("hidden");
    }
    else
    {
      $("#myModal #" + i).addClass("hidden");
    }

  }
}
////////////////////////////////////////////////////////////////////
//FOR COMPLETED PROCESS
///////////////////////////////////////////////////////////////////
let hasCompleted = true;
///////////////////////////////////////////////////////////////////
//STARTING VARIABLE FOR START AND DESTINATION CO-ORDINATES
//////////////////////////////////////////////////////////////////
const row_size = 19;
const col_size = 49;

let start_row = 9;
let start_col = 6;

let dest_row = 9;
let dest_col = 40;
////////////////////////////////////////////////////////////////////
//SPEED MULTIPLIER
///////////////////////////////////////////////////////////////////
let speed_multiplier = 20;
////////////////////////////////////////////////////////////////////
//COLORS USED
///////////////////////////////////////////////////////////////////
const wallColor = "rgba(33, 36, 61, 0.9)";
const gridColor = "rgba(252, 248, 243, 0.5)";

///////////////////////////////////////////////////////////////////
//2D ARRAY FOR LOOKING THE WALL AND WALKABLE AREA
//////////////////////////////////////////////////////////////////
let canWalk = new Array(row_size);

for (let i = 0; i < row_size; i++) {
  canWalk[i] = new Array(col_size);
}

///////////////////////////////////////////////////////////////////
//CREATING THE GRID FOR THE WEB USING jquery
//////////////////////////////////////////////////////////////////
for (let i = 0; i < row_size; i++) {
  $("<tr id = row" + i + "></tr>").addClass("col stat border border-info").appendTo("#tableDiv");
  for (let j = 0; j < col_size; j++) {
    canWalk[i][j] = true;
    if (i == start_row && j == start_col) {
      $("<td id=" + i + "-" + j + "></td>").addClass("col stat border border-info bg-success").appendTo("#row" + i);
      $('<img />').attr({
        'class': 'myImage_start unselectable',
        'src': 'Icons/startPoint.png',
        'alt': 'Start Logo',
        'title': 'Start Point',
        'width': '30',
      }).appendTo('#' + start_row + "-" + start_col);

    } else if (i == dest_row && j == dest_col) {
      $("<td id=" + i + "-" + j + "></td>").addClass("col stat border border-info bg-info").appendTo("#row" + i);
      $('<img />').attr({
        'class': 'myImage_Destination unselectable',
        'src': 'Icons/Destination.png',
        'alt': 'Destination Logo',
        'title': 'Destination Point',
        'width': '30'
      }).appendTo('#' + dest_row + "-" + dest_col);

    } else {
      $("<td id=" + i + "-" + j + "></td>").addClass("col nstat border border-info").appendTo("#row" + i);

    }
  }
}

////////////////////////////////////////////////////////////////////////
//GETTING KEY PRESSES
///////////////////////////////////////////////////////////////////////
$(document).on("keydown", function(e) {
  if(hasCompleted)
  {
    switch (e.which) {
      case 87:
        move_flags(start_row - 1, start_col, start_row, start_col, true, false);
        console.log("w pressed");
        break;
      case 68:
        move_flags(start_row, start_col + 1, start_row, start_col, true, false);
        console.log("d pressed");
        break;
      case 65:
        move_flags(start_row, start_col - 1, start_row, start_col, true, false);
        console.log("a pressed");
        break;
      case 83:
        move_flags(start_row + 1, start_col, start_row, start_col, true, false);
        console.log("s pressed");
        break;
      case 37:
        move_flags(dest_row, dest_col - 1, dest_row, dest_col, false, true);
        console.log("left pressed");
        e.preventDefault();
        break;
      case 38:
        move_flags(dest_row - 1, dest_col, dest_row, dest_col, false, true);
        console.log("up pressed");
        break;
      case 39:
        move_flags(dest_row, dest_col + 1, dest_row, dest_col, false, true);
        console.log("right pressed");
        break;
      case 40:
        move_flags(dest_row + 1, dest_col, dest_row, dest_col, false, true);
        console.log("down pressed");
        break;
      default:
        console.log(e.which);
    }
  }
  else
  {
    console.log("TASK NOT COMPLETED");
  }

})

function move_flags(xpos, ypos, xprev, yprev, starter, destination)
{
  if (inside_grid(xpos, ypos)) {
    $("#" + xprev + "-" + yprev).removeClass("stat scale-in-center");
    $("#" + xprev + "-" + yprev).addClass("nstat");
    if (starter) {
      $("img").remove(".myImage_start");
      start_row = xpos;
      start_col = ypos;
      $("#" + xprev + "-" + yprev).removeClass("bg-success flip-in-hor-bottom");
      $('<img />').attr({
        'class': 'myImage_start unselectable',
        'src': 'Icons/startPoint.png',
        'alt': 'Start Logo',
        'title': 'Start Point',
        'width': '30',
      }).appendTo('#' + start_row + "-" + start_col);
      $("#" + start_row + "-" + start_col).addClass("bg-success flip-in-hor-bottom");
    } else if (destination) {
      $("img").remove(".myImage_Destination");
      dest_row = xpos;
      dest_col = ypos;
      $("#" + xprev + "-" + yprev).removeClass("bg-info flip-in-hor-bottom");
      $('<img />').attr({
        'class': 'myImage_Destination unselectable',
        'src': 'Icons/Destination.png',
        'alt': 'Destination Logo',
        'title': 'Destination Point',
        'width': '30'
      }).appendTo('#' + dest_row + "-" + dest_col);
      $("#" + dest_row + "-" + dest_col).addClass("bg-info flip-in-hor-bottom");
    }
  }
}
///////////////////////////////////////////////////////////////////////
// CHANGING THE COLOR AS THE WALL FOR THE ALGORITHM
//////////////////////////////////////////////////////////////////////
function sh_color_grid(coord_x, coord_y) {
  if (canWalk[coord_x][coord_y]) {
    canWalk[coord_x][coord_y] = false;
    return true;
  } else {
    canWalk[coord_x][coord_y] = true;
    return false;
  }
}

var isDragging = false;
$(".nstat").mousedown(function() {
    isDragging = true;
    if (isDragging && hasCompleted) {
      let coord = $(this)[0].id;
      let coord_x_y = coord.split("-");

      if (sh_color_grid(coord_x_y[0], coord_x_y[1])) {
        $(this).removeClass("color-change-2x");
        $(this).removeClass("color-change-shortest");
        $(this).css("background-color", wallColor);
        $(this).addClass("scale-up-center");
      } else {
        $(this).removeClass("color-change-2x");
        $(this).removeClass("color-change-shortest");
        $(this).css("background-color", gridColor);
        $(this).removeClass("scale-up-center");
      }
    }
  })
  .mousemove(function() {
    if (isDragging && hasCompleted) {
      let coord = $(this)[0].id;
      let coord_x_y = coord.split("-");
      if (sh_color_grid(coord_x_y[0], coord_x_y[1])) {
        $(this).removeClass("color-change-2x");
        $(this).removeClass("color-change-shortest");
        $(this).css("background-color", wallColor);
        $(this).addClass("scale-up-center");
      } else {
        $(this).removeClass("color-change-2x");
        $(this).removeClass("color-change-shortest");
        $(this).css("background-color", gridColor);
        $(this).removeClass("scale-up-center");
      }
    }
  })

$(document).mouseup(function() {
  isDragging = false;
})
/////////////////////////////////////////////////////////////////////////////
//A-STAR AND Dijkstra TRAVERSAL
////////////////////////////////////////////////////////////////////////////
function a_star(isdijkstra)
{
  let cell_table = new Array(row_size);
  for (let i = 0; i < row_size; i++) {
    cell_table[i] = new Array(col_size);
  }

  for (let i = 0; i < row_size; i++) {
    for (let j = 0; j < col_size; j++) {
      cell_table[i][j] = new cell_cost(-1, -1, -1, i, j, !canWalk[i][j]);
    }
  }

  if (isdijkstra) {
    cell_table[start_row][start_col].g_cost = 0;
    cell_table[start_row][start_col].h_cost = 0;
    cell_table[start_row][start_col].f_cost = cell_table[start_row][start_col].g_cost;
    console.log(cell_table);

    let x_neighbour = [0, 1, 0, -1];
    let y_neighbour = [1, 0, -1, 0];

    let openList = new pq();
    openList.enqueue(start_row, start_col, cell_table[start_row][start_col].f_cost);
    let time = 0;
    while (openList.item.length != 0)
    {
      time++;
      let current = openList.dequeue();
      let X = current.x;
      let Y = current.y;
      changeColor(X, Y, time, speed_multiplier , false);
      if (X == dest_row && Y == dest_col) {
        let path_values_x = new Array();
        let path_values_y = new Array();
        path_values_x.push(dest_row);
        path_values_y.push(dest_col);
        construct_Path(dest_row, dest_col, cell_table, path_values_x, path_values_y);
        for (let i = path_values_x.length - 1; i >= 0; i--)
        {
          changeColor(path_values_x[i], path_values_y[i], time, speed_multiplier, true);
          time++;
        }
        return;
      }

      for (let i = 0; i < 4; i++) {
        let a = X + x_neighbour[i];
        let b = Y + y_neighbour[i];

        if (inside_grid(a, b) && !cell_table[a][b].isWall) {
          if (cell_table[a][b].f_cost == -1) {
            cell_table[a][b].g_cost = cell_table[X][Y].g_cost + 1;
            cell_table[a][b].h_cost = 0;
            cell_table[a][b].f_cost = cell_table[a][b].g_cost + cell_table[a][b].h_cost;
            cell_table[a][b].parent_x = X;
            cell_table[a][b].parent_y = Y;
            openList.enqueue(a, b, cell_table[a][b].f_cost);
          }
        }
      }
    }
    hasCompleted = true;
    console.log("NO PATH FOUND");
  }
  else
  {
    cell_table[start_row][start_col].g_cost = 0;
    cell_table[start_row][start_col].h_cost = 0;
    cell_table[start_row][start_col].f_cost = cell_table[start_row][start_col].h_cost;
    console.log(cell_table);

    let x_neighbour = [0, 1, 0, -1];
    let y_neighbour = [1, 0, -1, 0];

    let openList = new pq();
    openList.enqueue(start_row, start_col, cell_table[start_row][start_col].f_cost);
    let time = 0;
    while (openList.item.length != 0) {
      time++;
      let current = openList.dequeue();
      let X = current.x;
      let Y = current.y;
      console.log(X + " " + Y + " :: " + cell_table[X][Y].f_cost);
      changeColor(X, Y, time, 20);
      if (X == dest_row && Y == dest_col) {
        let path_values_x = new Array();
        let path_values_y = new Array();
        path_values_x.push(dest_row);
        path_values_y.push(dest_col);
        construct_Path(dest_row, dest_col, cell_table, path_values_x, path_values_y);
        console.log(path_values_x);
        console.log(path_values_y);
        for (let i = path_values_x.length - 1; i >= 0; i--) {
          changeColor(path_values_x[i], path_values_y[i], time, 20, true);
          time++;
        }
        return;
      }

      for (let i = 0; i < 4; i++) {
        let a = X + x_neighbour[i];
        let b = Y + y_neighbour[i];

        if (inside_grid(a, b) && !cell_table[a][b].isWall) {
          if (cell_table[a][b].f_cost == -1) {
            cell_table[a][b].g_cost = cell_table[X][Y].g_cost + 1;
            cell_table[a][b].h_cost = Math.abs(a - dest_row) + Math.abs(b - dest_col);
            cell_table[a][b].f_cost = cell_table[a][b].g_cost + cell_table[a][b].h_cost;
            cell_table[a][b].parent_x = X;
            cell_table[a][b].parent_y = Y;
            openList.enqueue(a, b, cell_table[a][b].f_cost);
          }
        }
      }
    }
  }
  hasCompleted = true;
  console.log("NO PATH FOUND");
}
/////////////////////////////////////////////////////////////////////////////
//CALCULATE SHORTEST PATH
////////////////////////////////////////////////////////////////////////////
function construct_Path(x, y, cell_table, path_values_x, path_values_y)
{
  let v1 = Number.MAX_VALUE;
  let v2 = Number.MAX_VALUE;
  let v3 = Number.MAX_VALUE;
  let v4 = Number.MAX_VALUE;

  if (inside_grid(x, (y - 1)) && cell_table[x][(y - 1)].f_cost != -1) {
    v1 = cell_table[x][(y - 1)].f_cost;
  }

  if (inside_grid((x + 1), y) && cell_table[(x + 1)][y].f_cost != -1) {
    v2 = cell_table[(x + 1)][y].f_cost;
  }

  if (inside_grid((x - 1), y) && cell_table[(x - 1)][y].f_cost != -1) {
    v3 = cell_table[(x - 1)][y].f_cost;
  }

  if (inside_grid(x, (y + 1)) && cell_table[x][(y + 1)].f_cost != -1) {
    v4 = cell_table[x][(y + 1)].f_cost;
  }

  let min_val = Math.min(v1, v2, v3, v4);
  if (min_val == v1) {
    path_values_x.push(x);
    path_values_y.push((y - 1));
  } else if (min_val == v2) {
    path_values_x.push((x + 1));
    path_values_y.push(y);
  } else if (min_val == v3) {
    path_values_x.push((x - 1));
    path_values_y.push(y);
  } else if (min_val == v4) {
    path_values_x.push(x);
    path_values_y.push((y + 1));
  }

  while (x != start_row || y != start_col) {
    path_values_x.push(cell_table[x][y].parent_x);
    path_values_y.push(cell_table[x][y].parent_y);
    x = path_values_x[path_values_x.length - 1];
    y = path_values_y[path_values_y.length - 1];
  }

}
/////////////////////////////////////////////////////////////////////////////
//DFS TRAVERSAL
////////////////////////////////////////////////////////////////////////////
function DFS()
{
  let stack_x = new Array();
  let stack_y = new Array();
  let time = 0;
  let canWalk_copy = new Array(row_size);
  let distance_table = new Array(row_size);

  for (let i = 0; i < row_size; i++) {
    canWalk_copy[i] = new Array(col_size);
    distance_table[i] = new Array(col_size);
  }
  for (let i = 0; i < row_size; i++) {
    for (let j = 0; j < col_size; j++) {
      canWalk_copy[i][j] = canWalk[i][j];
      if (i == start_row && j == start_col)
      {
        distance_table[i][j] = 0;
      }
      else
      {
        distance_table[i][j] = -1;
      }

    }
  }
  stack_x.push(start_row);
  stack_y.push(start_col);
  canWalk_copy[start_row][start_col] = false;
  while (stack_x.length != 0 && stack_y.length != 0)
  {
    time++;
    let value = findNextUnvisited(stack_x[stack_x.length - 1], stack_y[stack_y.length - 1], canWalk_copy, distance_table, time, speed_multiplier);
    if (value != "-1") {
      if (value.x == dest_row && value.y == dest_col) {
        let path_values_x = new Array();
        let path_values_y = new Array();
        path_values_x.push(dest_row);
        path_values_y.push(dest_col);
        calculate_shortest_Path(dest_row, dest_col, distance_table, path_values_x, path_values_y);
        for (let i = path_values_x.length - 1; i >= 0; i--)
        {
          changeColor(path_values_x[i], path_values_y[i], time, speed_multiplier, true)
          time++;
        }
        return;
      }
      else
      {
        stack_x.push(value.x);
        stack_y.push(value.y);
        canWalk_copy[value.x][value.y] = false;
      }
    }
    else
    {
      stack_x.pop();
      stack_y.pop();
    }
  }
  hasCompleted = true;
  console.log("NO PATH FOUND");
}
/////////////////////////////////////////////////////////////////////////////
//BFS TRAVERSAL
////////////////////////////////////////////////////////////////////////////
function BFS()
{
  let queue_x = new Array();
  let queue_y = new Array();
  let time = 0;
  let canWalk_copy = new Array(row_size);
  let distance_table = new Array(row_size);

  for (let i = 0; i < row_size; i++) {
    canWalk_copy[i] = new Array(col_size);
    distance_table[i] = new Array(col_size);
  }
  for (let i = 0; i < row_size; i++) {
    for (let j = 0; j < col_size; j++) {
      canWalk_copy[i][j] = canWalk[i][j];
      if (i == start_row && j == start_col) {
        distance_table[i][j] = 0;
      } else {
        distance_table[i][j] = -1;
      }

    }
  }

  queue_x.push(start_row);
  queue_y.push(start_col);
  canWalk_copy[start_row][start_col] = false;
  let value2;
  while (queue_x.length != 0 && queue_y.length != 0)
  {
    let value1_x = queue_x[0];
    let value1_y = queue_y[0];
    time++;
    if (value1_x == dest_row && value1_y == dest_col) {
      ///////////////////////////////////////////////////////////////////
      //STORING PATH FOR FINDING SHORTEST path
      //////////////////////////////////////////////////////////////////
      let path_values_x = new Array();
      let path_values_y = new Array();
      path_values_x.push(dest_row);
      path_values_y.push(dest_col);
      calculate_shortest_Path(dest_row, dest_col, distance_table, path_values_x, path_values_y);
      for (let i = path_values_x.length - 1; i >= 0; i--) {
        changeColor(path_values_x[i], path_values_y[i], time, speed_multiplier, true)
        time++;
      }
      return;
    }

    queue_x.shift();
    queue_y.shift();

    while ((value2 = findNextUnvisited(value1_x, value1_y, canWalk_copy, distance_table, time, speed_multiplier)) != -1) {
      queue_x.push(value2.x);
      queue_y.push(value2.y);
      canWalk_copy[value2.x][value2.y] = false;
    }
  }
  hasCompleted = true;
  console.log("NO PATH FOUND");
}
////////////////////////////////////////////////////////////////////////////
//GREEDY BFS
////////////////////////////////////////////////////////////////////////////
function greedy_BFS()
{
  let cell_table = new Array(row_size);
  for (let i = 0; i < row_size; i++) {
    cell_table[i] = new Array(col_size);
  }

  for (let i = 0; i < row_size; i++) {
    for (let j = 0; j < col_size; j++) {
      cell_table[i][j] = new cell_cost(-1, -1, -1, i, j, !canWalk[i][j]);
    }
  }
  cell_table[start_row][start_col].g_cost = 0;
  cell_table[start_row][start_col].h_cost = 0;
  cell_table[start_row][start_col].f_cost = Math.abs(start_row - dest_row) + Math.abs(start_col - dest_col);

  let x_neighbour = [0, 1, 0, -1];
  let y_neighbour = [1, 0, -1, 0];

  let listPath = new pq();
  listPath.enqueue(start_row, start_col, cell_table[start_row][start_col].f_cost);
  let time = 0;
  while (listPath.item.length != 0) {
    time++;
    let current = listPath.dequeue();
    let X = current.x;
    let Y = current.y;
    console.log(X + " " + Y + " :: " + cell_table[X][Y].f_cost);
    changeColor(X, Y, time, speed_multiplier , false);
    if (X == dest_row && Y == dest_col) {
      let path_values_x = new Array();
      let path_values_y = new Array();
      path_values_x.push(dest_row);
      path_values_y.push(dest_col);
      construct_Path(dest_row, dest_col, cell_table, path_values_x, path_values_y);
      console.log(path_values_x);
      console.log(path_values_y);
      for (let i = path_values_x.length - 1; i >= 0; i--) {
        changeColor(path_values_x[i], path_values_y[i], time, speed_multiplier, true);
        time++;
      }
      return;
    }

    for (let i = 0; i < 4; i++) {
      let a = X + x_neighbour[i];
      let b = Y + y_neighbour[i];

      if (inside_grid(a, b) && !cell_table[a][b].isWall) {
        if (cell_table[a][b].f_cost == -1) {
          cell_table[a][b].g_cost = 0;
          cell_table[a][b].h_cost = 0;
          cell_table[a][b].f_cost = Math.abs(a - dest_row) + Math.abs(b - dest_col);
          cell_table[a][b].parent_x = X;
          cell_table[a][b].parent_y = Y;
          listPath.enqueue(a, b, cell_table[a][b].f_cost);
        }
      }
    }
  }
  hasCompleted = true;
  console.log("NO PATH FOUND");
}

////////////////////////////////////////////////////////////////////////////
//converting TO WALL
///////////////////////////////////////////////////////////////////////////
function convert_to_wall(x, y, time, time_multiplier , finalMaze)
{
  setTimeout(() => {
    var coord = ("#" + x + "-" + y);
    $(coord).removeClass("color-change-2x");
    $(coord).removeClass("color-change-shortest");
    $(coord).css("background-color", wallColor);
    $(coord).addClass("scale-up-center");
    canWalk[x][y] = false;
    console.log(x + "," + y);
    if(finalMaze)
    {
      if(x == row_size-1 && y == col_size-1)
      {
        hasCompleted = true;
      }
    }
  }, (time + 1) * time_multiplier);
}

////////////////////////////////////////////////////////////////////////////
//CREATING BOUNDARY WALL
///////////////////////////////////////////////////////////////////////////
function create_boundary_walls(grid)
{
  let time = 0;
  for (let i = 0; i < row_size; i++) {
    convert_to_wall(i, 0, time, 5 , false);
    grid[i][0] = "w";
    time++;
    convert_to_wall(i, col_size - 1, time, 5 , false);
    grid[i][col_size - 1] = "w";
    time++;
  }

  for (let i = 0; i < col_size; i++) {
    convert_to_wall(0, i, time, 5 , false);
    grid[0][i] = "w";
    time++;
    convert_to_wall(row_size - 1, i, time, 5 , false);
    grid[row_size - 1][i] = "w";
    time++;
  }
}
////////////////////////////////////////////////////////////////////////////
//CREATING THE MAZE USING RECURSIVE DIVISION
///////////////////////////////////////////////////////////////////////////
let grid;

function generate_maze(dimensions , numDoors)
{
  grid = new Array();
  for (var i = 0; i < dimensions; i++) {
    grid[i] = new Array();
    for (var j = 0; j < dimensions; j++) {
      grid[i][j] = "";
    }
  }

  create_boundary_walls(grid);
  grid[start_row][start_col] = "g";
  addInnerWalls(false, 1, col_size-1, 1, row_size-1);
}

function addInnerWalls(h, minX, maxX, minY, maxY)
{
  if (h) {
    if (maxX - minX < 2)
    {
      return;
    }

    var y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(minX, maxX, y);

    addInnerWalls(!h, minX, maxX, minY, y - 1);
    addInnerWalls(!h, minX, maxX, y + 1, maxY);
  }
  else
  {
    if (maxY - minY < 2)
    {
      return;
    }

    var x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(minY, maxY, x);

    addInnerWalls(!h, minX, x - 1, minY, maxY);
    addInnerWalls(!h, x + 1, maxX, minY, maxY);
  }
}

function addHWall(minX, maxX, y)
{
  var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  for (var i = minX; i <= maxX; i++) {
    if (i == hole)
      grid[y][i] = "";
    else if((y != start_row || i != start_col) && (y != dest_row || i != dest_col))
      grid[y][i] = "w";
  }
}

function addVWall(minY, maxY, x)
{
  var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  for (var i = minY; i <= maxY; i++) {
    if (i == hole)
      grid[i][x] = "";
    else if((i != start_row || x != start_col) && (i != dest_row || x != dest_col))
      grid[i][x] = "w";
  }
}

function randomNumber(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function display()
{
  let time = 0;
  clear_everything();
  generate_maze(row_size,col_size,0);
  for(let i = 0 ; i < row_size ; i++)
  {
    for(let j = 0 ; j < col_size ; j++)
    {
      if(grid[i][j] == "w")
      {
        convert_to_wall(i , j , time , speed_multiplier , true);
        time++;
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////////
//CHECK IF VALUES PROVIDED ARE INSIDE THE grid
///////////////////////////////////////////////////////////////////////////
function inside_grid(x, y) {
  if (x < 0 || x >= row_size || y < 0 || y >= col_size) {
    return false;
  }
  return true;
}

///////////////////////////////////////////////////////////////////////////
//FIND THE NEXT UNVISITED NODES IN THE GRAPH
///////////////////////////////////////////////////////////////////////////
function findNextUnvisited(x, y, canWalk, distance_table, time, count) {
  if (inside_grid(x, y + 1) && canWalk[x][y + 1]) {
    distance_table[x][y + 1] = distance_table[x][y] + 1;
    changeColor((x), (y + 1), time, count, false);
    return {
      x: x,
      y: y + 1
    };
  } else if (inside_grid(x, y - 1) && canWalk[x][y - 1]) {
    distance_table[x][y - 1] = distance_table[x][y] + 1;
    changeColor((x), (y - 1), time, count, false);
    return {
      x: x,
      y: y - 1
    };
  } else if (inside_grid(x + 1, y) && canWalk[x + 1][y]) {
    distance_table[x + 1][y] = distance_table[x][y] + 1;
    changeColor((x + 1), y, time, count, false);
    return {
      x: x + 1,
      y: y
    };
  } else if (inside_grid(x - 1, y) && canWalk[x - 1][y]) {
    distance_table[x - 1][y] = distance_table[x][y] + 1;
    changeColor((x - 1), y, time, count, false);
    return {
      x: x - 1,
      y: y
    };
  } else {
    return -1;
  }
}

/////////////////////////////////////////////////////////////////////
//CHANGING COLOR OF THE GRID WITH A SET TIMEOUT
////////////////////////////////////////////////////////////////////
function changeColor(x, y, time, count, shortestPath , pathLength)
{
  if (shortestPath) {
    setTimeout(() => {
      $("#" + x + "-" + y).removeClass("color-change-2x");
      $("#" + x + "-" + y).addClass("color-change-shortest");
      console.log(x + "," + y);
      if(x == dest_row && y == dest_col)
      {
        console.log("COMPLETED");
        hasCompleted = true;
      }
    }, (time + 1) * count);

  }
  else
  {
    setTimeout(() => {
      $("#" + x + "-" + y).addClass("color-change-2x");
    }, (time + 1) * count);
  }
}


function calculate_shortest_Path(x, y, distance_table, path_values_x, path_values_y)
{
  let v1 = Number.MAX_VALUE;
  let v2 = Number.MAX_VALUE;
  let v3 = Number.MAX_VALUE;
  let v4 = Number.MAX_VALUE;

  while (x != start_row || y != start_col) {
    if (inside_grid(x, y - 1) && distance_table[x][y - 1] != -1) {
      v1 = distance_table[x][y - 1];
    }
    if (inside_grid(x + 1, y) && distance_table[x + 1][y] != -1) {
      v2 = distance_table[x + 1][y];
    }
    if (inside_grid(x - 1, y) && distance_table[x - 1][y] != -1) {
      v3 = distance_table[x - 1][y];
    }
    if (inside_grid(x, y + 1) && distance_table[x][y + 1] != -1) {
      v4 = distance_table[x][y + 1];
    }

    let minVal = Math.min(v1, v2, v3, v4);
    if (minVal == v1) {
      path_values_x.push(x);
      path_values_y.push(y - 1);
    } else if (minVal == v2) {
      path_values_x.push(x + 1);
      path_values_y.push(y);
    } else if (minVal == v3) {
      path_values_x.push(x - 1);
      path_values_y.push(y);
    } else if (minVal == v4) {
      path_values_x.push(x);
      path_values_y.push(y + 1);
    }

    x = path_values_x[path_values_x.length - 1];
    y = path_values_y[path_values_y.length - 1];
  }
}
////////////////////////////////////////////////////////////////////
//CLEAR ALREADY CHECKED POINT
///////////////////////////////////////////////////////////////////
function clear_checked()
{
  for (let i = 0; i < canWalk.length; i++) {
    for (let j = 0; j < canWalk[i].length; j++) {
      $("#" + i + "-" + j).removeClass("color-change-2x");
      $("#" + i + "-" + j).removeClass("color-change-shortest");
    }
  }
}

function clearWalls()
{
  for(let i = 0 ; i < row_size ; i++)
  {
    for(let j = 0 ; j < col_size ; j++)
    {
      $("#" + i + "-" + j).css("background-color", gridColor);
      $("#" + i + "-" + j).removeClass("scale-up-center");
      canWalk[i][j] = true;
    }
  }
}

function clear_everything()
{
  clear_checked();
  clearWalls();
}
////////////////////////////////////////////////////////////////////
//DROPDOWN 1 MENU
///////////////////////////////////////////////////////////////////
let BFS_btn = false;
let DFS_btn = false;
let A_star_btn = false;
let Dijkstar_btn = false;
let GreedyBFS_btn = false;
$("#btn-visualize").click(() => {
  if(hasCompleted)
  {
    clear_checked();
    if (BFS_btn) {
      hasCompleted = false;
      BFS();
      $("#info_text").removeClass("shake-bottom");
    } else if (DFS_btn) {
      hasCompleted = false;
      DFS();
      $("#info_text").removeClass("shake-bottom");
    } else if (A_star_btn) {
      hasCompleted = false;
      a_star(false);
      $("#info_text").removeClass("shake-bottom");
    } else if (Dijkstar_btn) {
      hasCompleted = false;
      a_star(true);
      $("#info_text").removeClass("shake-bottom");
    } else if (GreedyBFS_btn) {
      hasCompleted = false;
      greedy_BFS();
      $("#info_text").removeClass("shake-bottom");
    } else {
      console.log("SELECT ALGORITHM");
      $("#info_text").addClass("shake-bottom");
    }
  }
  else
  {
    $(this).addClass("bg-warning");
  }
})

$("#dropdown_div button").click(function(e) {
  if(hasCompleted)
  {
    let selText = $(this).text();
    if (selText == "Bfs") {
      BFS_btn = true;
      DFS_btn = false;
      A_star_btn = false;
      Dijkstar_btn = false;
      GreedyBFS_btn = false;
      $("#info_text").text("Breadth First Search");
    } else if (selText == "Dfs") {
      BFS_btn = false;
      DFS_btn = true;
      A_star_btn = false;
      Dijkstar_btn = false;
      GreedyBFS_btn = false;
      $("#info_text").text("Depth First Search");
    } else if (selText == "A-star") {
      BFS_btn = false;
      DFS_btn = false;
      A_star_btn = true;
      Dijkstar_btn = false;
      GreedyBFS_btn = false;
      $("#info_text").text("A-star Algorithm");
    } else if (selText == "Dijkstra's") {
      BFS_btn = false;
      DFS_btn = false;
      A_star_btn = false;
      Dijkstar_btn = true;
      GreedyBFS_btn = false;
      $("#info_text").text("Dijkstra's Algorithm");
    } else if (selText == "Greedy-BFS") {
      BFS_btn = false;
      DFS_btn = false;
      A_star_btn = false;
      Dijkstar_btn = false;
      GreedyBFS_btn = true;
      $("#info_text").text("Best-First Search");
    }
  }
})

$("#btn-gen_maze").click(() => {
   if(hasCompleted)
   {
     hasCompleted = false;
     display();
   }
})

$("#btn-clear-checked").click(() => {
  if(hasCompleted)
    clear_checked();
})

$("#btn-clear-walls").click(() => {
  if(hasCompleted)
    clearWalls();
})

$("#btn-clear-Board").click(() => {
  if(hasCompleted)
    clear_everything();
})

////////////////////////////////////////////////////////////////////
//DROPDOWN SPEED MENU
///////////////////////////////////////////////////////////////////
$("#dropdown_speed button").click(function(e) {
  if(hasCompleted)
  {
    let selText = $(this).text();
    if(selText == "Slow")
    {
      speed_multiplier = 45;
      $("#Speed_selector").text("Slow");

      console.log("SLOW SELECTED");
    }
    else if(selText == "Average")
    {
      speed_multiplier = 35;
      $("#Speed_selector").text("Average");

      console.log("AVERAGE SELECTED");
    }
    else if(selText == "Fast")
    {
      speed_multiplier = 20;
      $("#Speed_selector").text("Fast");

      console.log("FAST SELECTED");
    }
  }
})
