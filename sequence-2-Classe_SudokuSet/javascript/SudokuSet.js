// = Classe SudokuSet =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de [[http://mootools.net/docs/Class/Class|Class]] de MooTools.

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// Vous pouvez utiliser une propriété d'instance pour stocker les éléments.
// * Mise en commentaire elle est ici nommée  //_data//
// * On l'utilise de la façon suivante :
// ** //this._data//
//
// Les choix possibles pour stocker les données sont :
// * Le plus simple dans un premier temps; un tableau
// ** //this._data = [];//
// *** Documentation de [[http://mootools.net/docs/Native/Array|Mootools sur les tableaux]]
// *** Documentation de [[https://developer.mozilla.org/fr/Référence_de_JavaScript_1.5_Core/Objets_globaux/Array|Mozilla sur les tableaux]]
// * Moins évidant à utiliser au premier abord, un tableau associatif ([[https://developer.mozilla.org/fr/Référence_de_JavaScript_1.5_Core/Objets_globaux/Object|Object en Javascript]])
// ** //this._data = {};//
// *** Documentation des [[https://developer.mozilla.org/fr/Guide_JavaScript_1.5/Constantes_littérales#Objets|'object' sur le site de Mozilla (constantes littérales)]]
// * Il existe également Hash de la librairie MooTools, une version modifiée d'Object
// ** //this._data = new Hash()
// *** Documentation de [[http://mootools.net/docs/Native/Hash|Hash sur le site de MooTools]]

  initialize: function(array_init){
    // Code à compléter ...
    
    // propriété d'instance
    // this._data = ????;
    
    // Dans un premier temps
    // ne pas s'occuper de l'initialisation 
    // par un tableau
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément et retourne l'objet lui-même (//this//)

  set: function(key){
    // Code à compléter ...
  },

// ** {{{SudokuSet:has}}}
//
// test la présence d'un élément
//
// retourne un Booléen

  has: function(key){
    // Code à compléter ...
  },

// ** {{{SudokuSet:erase}}}
//
// retire un élément  et retourne l'objet lui-même (//this//)

  erase: function(key){
    // Code à compléter ...
  },

// ** {{{SudokuSet:getLength}}}
//
// retourne le nombre d'éléments

  getLength: function(){
    // Code à compléter ...
  },

// ** {{{SudokuSet:getKeys}}}
//
// retourne un tableau contenant tous les éléments
//
// Le tableau doit être trié en ordre croissant

  getKeys: function(){
    // Code à compléter ...
  },

// ** {{{SudokuSet:include}}}
//
// Test si l'ensemble inclut tous les éléments d'un autre ensemble.

  hasAll: function(set){
    // Code à compléter ...
  },

// ** {{{SudokuSet:equal}}}
//
// Compare deux ensembles
//
// **Remarque** A == B si :
// * A est inclus dans B
// * et B est inclus dans A

  equal: function(set){
    // Code à compléter ...
  },

// ** {{{SudokuSet:combine}}}
//
// Ajoute les éléments d'un autre ensemble
//
// Retourne l'objet lui-même

  combine: function(set){
    // Code à compléter ...
  },

// ** {{{SudokuSet:remove}}}
//
// Retir les éléments présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  remove: function(set){
    // Code à compléter ...
  },

// ** {{{SudokuSet:intersect}}}
//
// Retir les éléments qui ne sont pas présents dans l'autre ensemble
//
// Retourne l'objet lui-même

  intersect: function(set){
    // Code à compléter ...
  },

// ** {{{SudokuSet:copy}}}
//
// Retourne une copie de l'objet

  copy: function(){
    // Code à compléter ...
  },

// ** Fin de la déclaration de la Class SudokuSet

});
