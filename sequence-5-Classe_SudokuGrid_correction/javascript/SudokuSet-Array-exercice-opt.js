// = Classe SudokuSet =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

/*global Class, $defined */

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// 

  initialize: function (array_init) {
    this.data = [undefined,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false];
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
    this.data[key] = true;
    return this;
  },

// ** {{{SudokuSet:has}}}
//
// test la présence d'un élément
//
// retourne un Booléen

  has: function (key) {
    return this.data[key];
  },

// ** {{{SudokuSet:erase}}}
//
// retire un élément

  erase: function (key) {
    this.data[key] = false;
    return this;
  },

// ** {{{SudokuSet:getLength}}}
//
// retourne le nombre d'éléments

  getLength: function () {
    var len = 0;
    this.data.forEach(function (val) {
      if (val) {
        len = len + 1;
      }
    });
    return len;
  },

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant

  getKeys: function () {
    var res = [];
    this.data.forEach(
      function (val, key) {
        if (val) {
          res.push(key);
        }
      });
    return res;
  },

// ** {{{SudokuSet:hasAll}}}
//
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.

  hasAll: function (set) {
    return set.getKeys().every(function (key) {
      return this.has(key);
    }, this);
  },

// ** {{{SudokuSet:equal}}}
//
// Compare deux ensembles
//
// **Remarque** A == B si :
// * A est inclus dans B
// * et B est inclus dans A

  equal: function (set) {
    return set.hasAll(this) && this.hasAll(set);
  },

// ** {{{SudokuSet:combine}}}
//
// Ajoute les éléments d'un autre ensemble
//
// Retourne l'objet lui-même

  combine: function (set) {
    this.data.forEach(function (val, index, arr) {
      arr[index] = val || set.data[index];
    });
    return this;
  },

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  remove: function (set) {
    this.data.forEach(function (val, index, arr) {
      arr[index] = val && !set.data[index];
    });
    return this;
  },

// ** {{{SudokuSet:intersect}}}
//
// Retir les éléments qui ne sont pas présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  intersect: function (set) {
    this.getKeys().forEach(function (key) {
      if (!set.has(key)) {
        this.erase(key);
      }
    }, this);
    return this;
  },

// ** {{{SudokuSet:copy}}}
//
// Retourne une copie de l'objet

  copy: function () {
    return new SudokuSet(this.getKeys());
  }

// ** Fin de la déclaration de la Class SudokuSet

});
