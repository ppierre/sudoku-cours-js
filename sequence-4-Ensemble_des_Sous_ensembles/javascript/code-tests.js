// = Tests unitaires
//
// == Power Set :
// * [[http://fr.wikipedia.org/wiki/Ensemble_des_parties_d%27un_ensemble|Ensemble des parties d'un ensemble (WpFR)]]
// * [[http://en.wikipedia.org/wiki/Power_set#Algorithms|Power Set Wikipedia EN]]

/*global fireunit getFirst appendTo
  appendToAll getRest power_set */

// === Power Set sous forme de fonction
fireunit.ok(
  getFirst(["A", "B", "C"]) === "A",
  "getFirst retourne bien le 1er éléments");
  
fireunit.compare(
  '["B", "C"]',
  getRest(["A", "B", "C"]).toSource(),
  'getRest donne bien le restant de la liste');

fireunit.compare(
  '["A", "B", "C"]',
  appendTo("A", ["B", "C"]).toSource(),
  'appendTo("A", ["B", "C"]) donne ["A", "B", "C"]');

fireunit.compare(
  '[["A", "B"], ["A", "C"]]',
  appendToAll("A", [["B"], ["C"]]).toSource(),
  'appendToAll("A", [["B"], ["C"]]) donne [["A", "B"], ["A", "C"]]');

fireunit.compare(
  '[[]]',
  power_set([]).toSource(),
  'power_set([]) donne [[]]');

fireunit.compare(
  '[[], ["A"]]',
  power_set(["A"]).toSource(),
  'power_set(["A"]) donne [[], ["A"]]');

fireunit.compare(
  '[[], ["B"], ["A"], ["A", "B"]]',
  power_set(["A", "B"]).toSource(),
  'power_set(["A", "B"]) donne [[], ["B"], ["A"], ["A", "B"]]');

fireunit.compare(
  '[[], ["C"], ["B"], ["B", "C"], ["A"], ["A", "C"], ["A", "B"], ["A", "B", "C"]]',
  power_set(["A", "B", "C"]).toSource(),
  'power_set(["A", "B", "C"]) donne ' +
  '[[], ["C"], ["B"], ["B", "C"], ["A"], ["A", "C"], ["A", "B"], ["A", "B", "C"]]');

// === Power Set ajouté à Array

fireunit.compare(
  '["B", "C"]',
  ["A", "B", "C"].getRest().toSource(),
  '["A", "B", "C"].getRest() donne ["B", "C"]');

fireunit.compare(
  '[[], ["C"], ["B"], ["B", "C"], ["A"], ["A", "C"], ["A", "B"], ["A", "B", "C"]]',
  ["A", "B", "C"].powerSet().toSource(),
  '["A", "B", "C"].powerSet() donne ' +
  '[[], ["C"], ["B"], ["B", "C"], ["A"], ["A", "C"], ["A", "B"], ["A", "B", "C"]]');
// == Comparaison avec //equal// ou {{{===}}}

fireunit.ok(
  ["A", ["B", "C"]].equal(["A", ["B", "C"]]),
  "Array:equal : compare le tableaux par valeur (tous égaux)");

fireunit.ok(
  ! ["A", ["B", "D"]].equal(["A", ["B", "C"]]),
  "Array:equal : compare le tableaux par valeur (un différent)");

// == SudokuList
// Une liste de "cases" avec pour chaque leurs valeurs possibles ({{{SudokuSet}}})
//
// En Bref un tableau de {{{SudokuSet}}}

/*global test_tableau_de_tableau
         test_valeurs_combine_tableau
         test_tableau_de_SudokuSet
         SudokuSet SudokuList
         test_list */

test_tableau_de_tableau = 
  [[1, 2, 6], [3, 5, 6], [3], [2, 3, 5], [5, 6]];
test_valeurs_combine_tableau = 
  [1, 2, 3, 5, 6];
test_tableau_de_SudokuSet = 
  test_tableau_de_tableau.map(function (set) {
  return new SudokuSet(set);
});

fireunit.compare(
  test_tableau_de_tableau.toSource(),
  new SudokuList(test_tableau_de_tableau)
    .getAllKeys().toSource(),
  "fct getAllKeys : SudokuList construit par un tableau" +
  " de tableau (trié), retourne le même tableau");

fireunit.compare(
  test_tableau_de_tableau.toSource(),
  new SudokuList(test_tableau_de_tableau)
    .getAllKeys().toSource(),
  "fct SudokuList:getAllKeys construit par un tableau" +
  " de tableau (trié), retourne le même tableau");

fireunit.compare(
  test_valeurs_combine_tableau.toSource(),
  new SudokuList(test_tableau_de_tableau)
    .combineAll().getKeys().toSource(),
  "fct SudokuList:combineAll retourne toutes les clefs");

fireunit.compare(
  "[],[[2]],[[1]],[[1], [2]]",
  new SudokuList([[1], [2]]).powerSet().map(function (list) {
    return list.getAllKeys().toSource();
  }).toString(),
  "[[1], [2]] powerSet donne " +
  "[[], [[2]], [[1]], [[1], [2]]]");

fireunit.ok(
  new SudokuList([[1, 2], [1, 2]]).isComplete(),
  "[[1, 2], [1, 2]] est complet");

fireunit.ok(
  ! new SudokuList([[1, 2], [1, 3]]).isComplete(),
  "[[1, 2], [1, 3]] n'est pas complet");

fireunit.compare(
  "[],[[2, 3], [2, 3]],[[1]],[[1], [2, 3], [2, 3]]",
  new SudokuList([[1], [2, 3], [2, 3]])
  .getAllCompleteList().map(function (list) {
    return list.getAllKeys().toSource();
  }).toString(),
  "[[1], [2, 3], [2, 3]] getAllCompleteList donne " +
  "[[],[[2, 3], [2, 3]],[[1]],[[1], [2, 3], [2, 3]]]");

test_list = new SudokuList(test_tableau_de_SudokuSet);

fireunit.compare(
  "[[1, 2, 6], [5, 6], [3], [2, 5], [5, 6]]",
  test_list
    .reduce(new SudokuList(
      [test_tableau_de_SudokuSet[2]])) // [[3]]
    .getAllKeys().toSource(),
  "[[1, 2, 6], [3, 5, 6], [3], [2, 3, 5], [5, 6]] " +
  "réduit par [[3]] donne " +
  "[[1, 2, 6], [5, 6], [3], [2, 5], [5, 6]]");

fireunit.compare(
  "[[1, 2], [5, 6], [3], [2], [5, 6]]",
  test_list
    .reduce(new SudokuList(
      [test_tableau_de_SudokuSet[1],
       test_tableau_de_SudokuSet[4]]))
        // [[5, 6], [5, 6]]
    .getAllKeys().toSource(),
  "[[1, 2, 6], [5, 6], [3], [2, 5], [5, 6]] " +
  "réduit par [[5, 6], [5, 6]] donne " +
  "[[1, 2], [5, 6], [3], [2], [5, 6]]");

fireunit.compare(
  "[[1], [5, 6], [3], [2], [5, 6]]",
  test_list
    .reduce(new SudokuList(
      [test_tableau_de_SudokuSet[3]])) // [[2]]
    .getAllKeys().toSource(),
  "[[1, 2], [5, 6], [3], [2], [5, 6]] " +
  "réduit par [[2]] donne " +
  "[[1], [5, 6], [3], [2], [5, 6]]");

// Réinitalise la liste
test_list = new SudokuList(test_tableau_de_tableau);

fireunit.compare(
  "[[1], [5, 6], [3], [2], [5, 6]]",
  test_list.reducePowerSet().getAllKeys().toSource(),
  "[[1, 2, 6], [3, 5, 6], [3], [2, 3, 5], [5, 6]] " +
  "réduit par tous les sous-ensembles (une itération) donne " +
  "[[1], [5, 6], [3], [2], [5, 6]]");

// ** Fin des tests
fireunit.testDone();