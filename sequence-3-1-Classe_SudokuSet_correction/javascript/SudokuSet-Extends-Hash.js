// = Classe SudokuSet =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

/*global Class, Hash, $defined */

var SudokuSet = new Class({
  Extends: Hash,
  
// ** Constructeur le la Classe SudokuSet
//
// 

  initialize: function (array_init) {
    if ($defined(array_init)) {
      array_init.forEach(function (key) {
        this.set(key);
      }, this);
    }
    // delete this.$family;
    // delete this.constructor;
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément

  set: function (key) {
    this.parent(key, true);
    return this;
  },

// ** {{{Hash:has}}}

// ** {{{Hash:erase}}}

// ** {{{Hash:getLength}}}

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant

  getKeys: function () {
    return this.parent()
      // .erase("$family")
      // .erase("constructor")
      .sort(function (a, b) {
        return a - b;
      });
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

// ** {{{Hash:combine}}}

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  remove: function (set) {
    set.getKeys().forEach(function (key) {
      this.erase(key);
    }, this);
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
