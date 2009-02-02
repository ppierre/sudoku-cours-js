// = Tests unitaires (Modèle)


// ** Test d'une itération de réduction par powerSet

var grid_init =   [[0, 0, 0, 0, 5, 0, 4, 9, 0],
                   [7, 0, 0, 2, 0, 0, 0, 0, 3],
                   [0, 0, 0, 6, 0, 9, 2, 0, 0],
                   [9, 0, 5, 0, 7, 0, 0, 0, 4],
                   [3, 0, 0, 0, 0, 0, 0, 0, 7],
                   [4, 0, 0, 0, 6, 0, 3, 0, 1],
                   [0, 0, 2, 4, 0, 5, 0, 0, 0],
                   [6, 0, 0, 0, 0, 8, 0, 0, 9],
                   [0, 9, 4, 0, 3, 0, 0, 0, 0]];

var grid_solved = [[2, 6, 1, 3, 5, 7, 4, 9, 8],
                   [7, 5, 9, 2, 8, 4, 1, 6, 3],
                   [8, 4, 3, 6, 1, 9, 2, 7, 5],
                   [9, 1, 5, 8, 7, 3, 6, 2, 4],
                   [3, 2, 6, 5, 4, 1, 9, 8, 7],
                   [4, 7, 8, 9, 6, 2, 3, 5, 1],
                   [1, 8, 2, 4, 9, 5, 7, 3, 6],
                   [6, 3, 7, 1, 2, 8, 5, 4, 9],
                   [5, 9, 4, 7, 3, 6, 8, 1, 2]];

var grid = new SudokuGrid(grid_init);

function compare_grid (grid1,grid2,msg) {
  grid1.each(function(line1,index) {
    line2 = grid2[index];
    fireunit.compare(
      line1.toSource(),
      line2.toSource(),
      msg+" (ligne: "+(index+1).toString()+")");
  });
}

compare_grid(
  grid_init,
  grid.getSolved(),
  "Grille identique à l'initialisation");

var grid_step1 =  [[0, 0, 0, 0, 5, 0, 4, 9, 0],
                   [7, 0, 9, 2, 0, 0, 0, 0, 3],
                   [0, 0, 0, 6, 0, 9, 2, 7, 0],
                   [9, 0, 5, 0, 7, 0, 0, 0, 4],
                   [3, 0, 0, 0, 0, 0, 9, 0, 7],
                   [4, 0, 0, 0, 6, 2, 3, 0, 1],
                   [0, 0, 2, 4, 9, 5, 0, 3, 0],
                   [6, 0, 0, 0, 2, 8, 0, 4, 9],
                   [0, 9, 4, 0, 3, 6, 0, 0, 0]];

grid.reducePowerSetAll();

compare_grid(
  grid_step1,
  grid.getSolved(),
  "Grille 1 itération de réduction");

var grid_step2 =  [[2, 0, 0, 3, 5, 7, 4, 9, 0],
                   [7, 0, 9, 2, 0, 0, 0, 0, 3],
                   [0, 0, 0, 6, 0, 9, 2, 7, 5],
                   [9, 0, 5, 8, 7, 3, 0, 0, 4],
                   [3, 0, 0, 5, 0, 0, 9, 0, 7],
                   [4, 0, 0, 9, 6, 2, 3, 5, 1],
                   [0, 0, 2, 4, 9, 5, 0, 3, 0],
                   [6, 0, 0, 0, 2, 8, 0, 4, 9],
                   [0, 9, 4, 0, 3, 6, 0, 0, 2]];

grid.reducePowerSetAll();

compare_grid(
  grid_step2,
  grid.getSolved(),
  "Grille 2 itérations de réduction");

var grid_step3 =  [[2, 6, 0, 3, 5, 7, 4, 9, 8],
                   [7, 5, 9, 2, 0, 0, 1, 6, 3],
                   [0, 4, 3, 6, 0, 9, 2, 7, 5],
                   [9, 1, 5, 8, 7, 3, 6, 2, 4],
                   [3, 2, 6, 5, 0, 0, 9, 8, 7],
                   [4, 0, 0, 9, 6, 2, 3, 5, 1],
                   [0, 0, 2, 4, 9, 5, 0, 3, 6],
                   [6, 3, 0, 0, 2, 8, 0, 4, 9],
                   [5, 9, 4, 0, 3, 6, 0, 1, 2]];

grid.reducePowerSetAll();

compare_grid(
  grid_step3,
  grid.getSolved(),
  "Grille 3 itérations de réduction");

grid.reducePowerSetAll();

compare_grid(
  grid_solved,
  grid.getSolved(),
  "Grille 4 itérations de réduction");
