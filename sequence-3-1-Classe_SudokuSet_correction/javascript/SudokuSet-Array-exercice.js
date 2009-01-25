// = Classe SudokuSet = Nom:________________________Groupe:_________
/*global Class, $defined */
var SudokuSet = new Class({
// ** Constructeur le la Classe SudokuSet
  initialize: function (array_init) {
    this.data = [undefined,
                 false, false, false,
                 false, false, false,
                 false, false, false];
    if ($defined(array_init)) {
      array_init.forEach(function (key) {
        this.set(key);
      }, this);
    }
  },
// ** {{{SudokuSet:set}}} \\
// ajoute un élément
  set: function (key) {
    this.data[key] = true;
    return this;
  },
// ** {{{SudokuSet:has}}} \\
// test la présence d'un élément; retourne un Booléen
  has: function (key) {
    return this.data[key];
  },
// ** {{{SudokuSet:erase}}} retire un élément
  erase: function (key) {
    this.data[key] = false;
    return this;
  },
// ** {{{SudokuSet:getLength}}} retourne le nombre d'éléments
  getLength: function () {








  },
// ** {{{SudokuSet:getKeys}}} \\
// retourne un tableau contenant tous les éléments\\
// Le tableau doit être trié en ordre croissant
  getKeys: function () {








  },
// ** {{{SudokuSet:hasAll}}} \\
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.
  hasAll: function (set) {





  },
// ** {{{SudokuSet:equal}}}  Compare deux ensembles
  equal: function (set) {




  },
// ** {{{SudokuSet:combine}}} \\
// Ajoute les éléments d'un autre ensemble Retourne l'objet lui-même
  combine: function (set) {





  },
// ** {{{SudokuSet:remove}}} \\
// Retir les éléments présents dans l'autre ensemble\\
// Retourne l'objet lui-même
  remove: function (set) {





  },
// ** {{{SudokuSet:intersect}}} \\
// Retir les éléments qui ne sont pas présents dans l'autre ensemble 
// Retourne l'objet lui-même
  intersect: function (set) {





  },
// ** {{{SudokuSet:copy}}} Retourne une copie de l'objet
  copy: function () {




  }
});
// ** Important :
// Au dos, écrire des tests untitaire vérifiant getLength