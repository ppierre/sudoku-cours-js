// = Classe SudokuGrid =
//
// Mise en place du modèle : la grille complète

/*global Class SudokuSet SudokuList*/

var size = 9,
    cell_size = 3,
    list_all = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// ** {{{extract_cols}}}
// 
// Transpose un tableau de tableau
// 
// Exemple :
//
// {{{[[1 2 3]  donne [[1 4 7] }}}\\
// {{{ [4 5 6]         [2 5 8] }}}\\
// {{{ [7 8 9]]        [3 6 9]]}}}

function extract_cols(aa) {









}

// ** {{{get_i_coll}}}
// 
// Donne l'indice de la colonne pour un indice de sous-grille
// et la position dans cette sous-grille

function get_i_coll(i_cell, i_pos) {
 
}

// ** {{{get_i_line}}}
// 
// Donne l'indice de la ligne pour un indice de sous-grille
// et la position dans cette sous-grille

function get_i_line(i_cell, i_pos) {
 
}

// ** {{{extract_cells}}}
// 
// Donne le tableau des sous-grilles

function extract_cells(aa) {











}

// ** {{{map_SudokuList}}}

function map_SudokuList(aa) {
  return aa.map(function (line) {
    return new SudokuList(line);
  });
}

// == SudokuGrid
// Représente la grille de "cases" avec pour chaque leurs valeurs possibles ({{{SudokuSet}}})
//
// En Bref un tableau de tableau de {{{SudokuSet}}}

var SudokuGrid = new Class({

  initialize: function (array_array_init) {
    
    this.data = array_array_init.map(function (line) {
      return line.map(function (val) {
        if (val === 0) {
          return new SudokuSet(list_all);
        } else {
          return new SudokuSet([val]);
        }
      });
    });
    
    this.lines = map_SudokuList(this.data);
    
    this.cols = map_SudokuList(extract_cols(this.data));
    
    this.cells = map_SudokuList(extract_cells(this.data));
    
  },
  
  reducePowerSet: function (array_of_list) {
    array_of_list.forEach(function (list) {
      list.reducePowerSet();
    });
  },
  
  reducePowerSetAll: function () {
    this.reducePowerSet(this.lines);
    this.reducePowerSet(this.cols);
    this.reducePowerSet(this.cells);
  },
  
  getSolved: function () {
    return this.data.map(function (line) {
      return line.map(function (cell) {
        if (cell.getLength() === 1) {
          return cell.getKeys()[0];
        } else {
          return 0;
        }
      });
    });
  },

// ** {{{SudokuSet:solve}}}
//
// Ecrire une méthode qui va appeler reducePowerSetAll 
// autant de fois que nécessaire pour résoudre le Sudoku

  solve: function () {
    
  }

});
