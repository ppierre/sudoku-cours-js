// = Tests unitaires : SudokuGrid (fonctions simples)

/*global fireunit */

// ** Exemple de tests : simple assertion

fireunit.ok(2 * 2 === 4, "deux fois deux font quatre");

// ** Exemple de tests : comparaison
//
// cliquer sur le test puis utiliser l'onglet compare pour le corriger

var tableau = [1, 3, 2];

var tableau_double = [1, 3, 2, 1, 3, 2];

fireunit.compare(
  tableau_double.toSource(),
  tableau.extend([1, 2, 3]).toSource(),
  "1, 3, 2 suivit de 1, 3, 2 donne 1, 3, 2, 1 ,3 ,2");

// ** Tests de {{{extract_cols}}}
//
// À écrire !

// ** Tests de {{{get_i_col}}}
//
// À écrire !

// ** Tests de {{{get_i_line}}}
//
// À écrire !

// ** Tests de {{{extract_cells}}}
//
// À écrire !


// ** Fin des tests
fireunit.testDone();
