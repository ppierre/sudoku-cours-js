// = Classe Hash (ajout de méthodes sur les clefs) =
//
// But manipuler les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// * voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.
// * voire la documentation de [[http://mootools.net/docs/Native/Hash|Hash]] de MooTools.

/*global Hash */

Hash.implement({
  
// ** {{{Hash:hasAllKeys}}}
//
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.

  hasAllKeys: function (hash) {
    return hash.getKeys().every(function (key) {
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

  equalKeys: function (hash) {
    return hash.hasAllKeys(this) && this.hasAllKeys(hash);
  },

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  removeKeys: function (set) {
    set.getKeys().forEach(function (key) {
      this.erase(key);
    }, this);
    return this;
  },

// ** {{{Hash:intersectKeys}}}
//
// Retir les éléments qui ne sont pas présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  intersectKeys: function (hash) {
    this.getKeys().forEach(function (key) {
      if (!hash.has(key)) {
        this.erase(key);
      }
    }, this);
    return this;
  }

// ** Fin des modification de la Class Hash

});
