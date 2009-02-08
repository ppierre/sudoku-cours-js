// = Classe SudokuSet =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

/*global Class, $defined */

var ALL_KEYS = Math.pow(2, 1) +
               Math.pow(2, 2) +
               Math.pow(2, 3) +
               Math.pow(2, 4) +
               Math.pow(2, 5) +
               Math.pow(2, 6) +
               Math.pow(2, 7) +
               Math.pow(2, 8) +
               Math.pow(2, 9);

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// 

  initialize: function (array_init) {
    this.data = 0;
    if ($defined(array_init)) {
      array_init.forEach(function (key) {
        this.set(key);
      }, this);
    }
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément

  set: function (key) {
    this.data |= Math.pow(2, key);
    return this;
  },

// ** {{{SudokuSet:has}}}
//
// test la présence d'un élément
//
// retourne un Booléen

  has: function (key) {
    return this.data === (this.data | Math.pow(2, key));
  },

// ** {{{SudokuSet:erase}}}
//
// retire un élément

  erase: function (key) {
    this.data &= ALL_KEYS - Math.pow(2, key);
    return this;
  },

  eraseAll: function () {
    this.data = 0;
    return this;
  },

// ** {{{SudokuSet:getLength}}}
//
// retourne le nombre d'éléments

  getLength: function () {
    var d = this.data;
    return (  2 === (d &   2)) +
           (  4 === (d &   4)) +
           (  8 === (d &   8)) +
           ( 16 === (d &  16)) +
           ( 32 === (d &  32)) +
           ( 64 === (d &  64)) +
           (128 === (d & 128)) +
           (256 === (d & 256)) +
           (512 === (d & 512));
  },

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant

  getKeys: function () {
    var res = [];
    for (var i=1; i < 10; i++) {
      if (this.has(i)) {
          res.push(i);
      }
    }
    return res;
  },

// ** {{{SudokuSet:hasAll}}}
//
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.

  hasAll: function (set) {
    return set.data === (this.data & set.data);
  },

// ** {{{SudokuSet:equal}}}
//
// Compare deux ensembles
//
// **Remarque** A == B si :
// * A est inclus dans B
// * et B est inclus dans A

  equal: function (set) {
    return this.data === set.data;
  },

// ** {{{SudokuSet:combine}}}
//
// Ajoute les éléments d'un autre ensemble
//
// Retourne l'objet lui-même

  combine: function (set) {
    this.data |= set.data;
    return this;
  },

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  remove: function (set) {
    this.data &= ALL_KEYS - set.data;
    return this;
  },

// ** {{{SudokuSet:intersect}}}
//
// Retir les éléments qui ne sont pas présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  intersect: function (set) {
    this.data &= set.data;
    return this;
  },

// ** {{{SudokuSet:copy}}}
//
// Retourne une copie de l'objet

  copy: function () {
    res = new SudokuSet();
    res.data = this.data;
    return res;
  }

// ** Fin de la déclaration de la Class SudokuSet

});
