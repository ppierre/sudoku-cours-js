// = Classe SudokuSet \\// (avec tableau : Array) =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

/*global Class, $defined */

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// Initialise la propriété //this.data// avec un tableau vide.
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Core/Core#defined|$defined]] pour tester si on a passé un tableau de valeurs initiales.
// * Utilise [[http://mootools.net/docs/Native/Array#Array:combine|Array:combine]] pour éliminer les éventuels duplicatas du tableau passé en paramètre.
//
// ** Remarque :
// * Le tableau n'est pas trié
// * [[http://mootools.net/docs/Native/Array#Array:combine|Array:combine]] assure que l'on fait une copie du tableau passé en paramètre.

  initialize: function (array_init) {
    this.data = [];
    if ($defined(array_init)) {
      this.data.combine(array_init);
    }
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément
//
// Retourne l'objet lui-même
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Array#Array:combine|Array:combine]] pour ajouter l'élément (mis dans un tableau); assure ainsi de ne pas l'ajouter si déjà présent dans le tableau stocker dans this.data
//
// ** Remarque :
// * Le tableau n'est pas trié

  set: function (key) {
    this.data.combine([key]);
    return this;
  },

// ** {{{SudokuSet:has}}}
//
// test la présence d'un élément
//
// retourne un Booléen
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Array#Array:contains|Array:contains]] pour tester la présence de l'élément dans le tableau stocker dans this.data
//
// ** Remarque :
// * Retourne la valeur retournée par [[http://mootools.net/docs/Native/Array#Array:contains|Array:contains]] : //true// ou //false//

  has: function (key) {
    return this.data.contains(key);
  },

// ** {{{SudokuSet:erase}}}
//
// retire un élément
//
// Retourne l'objet lui-même
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Array#Array:erase|Array:erase]] pour supprimer l'élément du tableau stocké dans this.data

  erase: function (key) {
    this.data.erase(key);
    return this;
  },

// ** {{{SudokuSet:getLength}}}
//
// retourne le nombre d'éléments
//
// ** Implémentation :
// * Utilise [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Function/length|Array:length]] pour obtenir le nombre d'éléments
// * **Attention :** [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Function/length|Array:length]] est une propriété, on l'utilise sans parenthèse contrairement à une fonction
//
// ** Remarque :
// * Retourne la valeur retournée par [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Function/length|Array:length]] appliqué au tableau stocké dans this.data

  getLength: function () {
    return this.data.length;
  },

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant
//
// ** Implémentation :
// * Utilise [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/sort|Array:sort]] pour triéer le tableau stocker dans this.data
// * **Attention :** les tableaux utilisent l'ordre lexicographique par défault
//
// ** Remarque :
// * Retourne la valeur retournée par [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/sort|Array:sort]] c.-à-d. le tableau lui-même
// * **Attention :** le tableau est trié "en place", on aurait pu écrire :
// ** //this.data.sort(...);//
// ** //return this.data;//

  getKeys: function () {
    return this.data.sort(function (a, b) {
      return a - b;
    });
  },

// ** {{{SudokuSet:hasAll}}}
//
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.
//
// ** Implémentation :
// * Utilise {{{SudokuSet:getKeys}}} sur le paramètre//set// (une instance de {{{SudokuSet}}}), pour obtenir un tableau des éléments.
// * Utilise [[http://mootools.net/docs/Native/Array#Array:every|Array:every]] sur le tableau obtenu, pour tester si tous sont inclus par le biais de la méthode {{{SudokuSet:has}}}

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
//
// ** Implémentation :
// * Utilise {{{SudokuSet:hasAll}}} pour tester l'inclusion
// * Retourne le résultat du "ET" logique (voir [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_logiques|Opérateurs logiques]])

  equal: function (set) {
    return set.hasAll(this) && this.hasAll(set);
  },

// ** {{{SudokuSet:combine}}}
//
// Ajoute les éléments d'un autre ensemble
//
// Retourne l'objet lui-même
//
// ** Implémentation :
// * Utilise [[http://mootools.net/docs/Native/Array#Array:combine|Array:combine]] pour ajouter les éléments du tableau obtenu par {{{SudokuSet:getKeys}}} sur le paramètre//set// (une instance de {{{SudokuSet}}})

  combine: function (set) {
    this.data.combine(set.getKeys());
    return this;
  },

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même
//
// **Implémentation :
// * Parcour tous les éléments passés en paramètre
// ** Utilise {{{SudokuSet:getKeys}}} sur le paramètre//set// (une instance de {{{SudokuSet}}}), pour obtenir un tableau des éléments.
// ** Utilise [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/forEach|Array:forEach]] pour appliquer le même traitement avec chacun des éléments
// *** Le second paramètre de [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/forEach|Array:forEach]] (//this//) permet que //this// dans la fonction anonyme, soit //this// de l'objet réalisant l'opération.
// **** **Important :** [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_sp%C3%A9ciaux/L%27op%C3%A9rateur_this|L'opérateur this]]
// * Supprime les éléments de l'instance (//this//) en utilisant {{{SudokuSet:erase}}}

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
//
// **Implémentation :
//
// Utilise le même principe que pécedement, mais :
// * Parcour les éléments de l'instance (//this//) "l'objet lui-même"
// * Les supprime (de l'instance), //this.erase(key)//, si ils ne sont  pas présent dans l'ensemble passé en paramètre ({{{SudokuSet}}}) //!set.has(key)//

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
//
// **Implémentation :
// * Obtient un tableau des éléments de l'instance (//this//) "l'objet lui-même"
// ** //this.getKeys()//
// * Retourne une nouvelle instance construite à partir des mêmes éléments.
// ** //new// SudokuSet(...)
// Important : Il faut s'assurer de faire une copie du tableau
// * Soit dans la méthode {{{SudokuSet:getKeys}}}
// * Soit lors de la construction de l'objet ({{{SudokuSet:initialize}}})
// * **Attention :
// ** [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/sort|Array:sort]] trie le tableau lui-même, //sort// une retourne pas une copie.
// ** [[http://mootools.net/docs/Native/Array#Array:combine|Array:combine]] réalise une copie
// ** Une solution simple est fournie par la librairie MooTools : la fonction [[http://mootools.net/docs/Native/Array#A|$A]], qui s'assure de retourner un nouveau tableau.
// *** Le but premier de [[http://mootools.net/docs/Native/Array#A|$A]], est de s'assurer qu'une collection d'objets, soit bien sous forme d'un tableau.

  copy: function () {
    return new SudokuSet(this.getKeys());
  }

// ** Fin de la déclaration de la Class SudokuSet

});
