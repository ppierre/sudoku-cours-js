// = Classe SudokuSet \\//utilisant un objet Hash =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

/*global Class, Hash, $defined */

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// Initialise la propriété //this.data// avec une instance de {{{Hash}}}
// * //this.data = new Hash();//
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Core/Core#defined|$defined]] pour tester si on a passé un tableau de valeurs initiales.
// * Utilise [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/forEach|Array:forEach]] pour appliquer le même traitement avec chacun des éléments
// ** Le second paramètre de [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/forEach|Array:forEach]] (//this//) permet que //this// dans la fonction anonyme, soit //this// de l'objet réalisant l'opération.
// *** **Important :** [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_sp%C3%A9ciaux/L%27op%C3%A9rateur_this|L'opérateur this]]
// * Ajoute les éléments de l'instance (//this//) en utilisant {{{SudokuSet:set}}}

  initialize: function (array_init) {
    this.data = new Hash();
    if ($defined(array_init)) {
      array_init.forEach(function (key) {
        this.set(key);
      }, this);
    }
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément
//
// Retourne l'objet lui-même
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Hash#Hash:set|Hash:set]] pour ajouter l'élément à l'instance de {{{Hash}}} (//this.data//).
// * **Remarque :** La valeur associée à la clef (ici //true//) n'a pas d'importance.

  set: function (key) {
    this.data.set(key, true);
    return this;
  },

// ** {{{SudokuSet:has}}}
//
// test la présence d'un élément
//
// retourne un Booléen
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Hash#Hash:has|Hash:has]] pour tester la présence de l'élément dans l'instance de {{{Hash}}} (//this.data//).
//
// ** Remarque :
// * Retourne la valeur retournée par [[http://mootools.net/docs/Native/Hash#Hash:has|Hash:has]] : //true// ou //false//

  has: function (key) {
    return this.data.has(key);
  },

// ** {{{SudokuSet:erase}}}
//
// retire un élément
//
// Retourne l'objet lui-même
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Hash#Hash:erase|Hash:erase]] pour supprimer l'élément de l'instance de {{{Hash}}} (//this.data//).

  erase: function (key) {
    this.data.erase(key);
    return this;
  },

// ** {{{SudokuSet:getLength}}}
//
// retourne le nombre d'éléments
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Hash#Hash:getLength|Hash:getLength]] pour donner le nombre l'élément de l'instance de {{{Hash}}} (//this.data//).

  getLength: function () {
    return this.data.getLength();
  },

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Hash#Hash:getKeys|Hash:getKeys]] pour un tableau contant les clefs de l'instance de {{{Hash}}} (//this.data//).
// * Utilise [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/sort|Array:sort]] pour triéer le tableau 
// * **Attention :** les tableaux utilisent l'ordre lexicographique par défault

  getKeys: function () {
    return this.data.getKeys().sort(function (a, b) {
      return a - b;
    });
  },

// == Pour les autres méthodes :
// ** Implémentation : [[#sequence-3-1-Classe_SudokuSet_correction/javascript/SudokuSet-Array.js|idem SudokuSet avec tableau (Array)]]


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
    this.data.combine(set.data);
    return this;
  },

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
