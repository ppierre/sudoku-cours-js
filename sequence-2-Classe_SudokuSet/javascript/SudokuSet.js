// = Classe SudokuSet =
//
// Classe manipulant les valeurs possibles d'une case:\\
// Une liste non ordonnée d'éléments distincts
//
// voire la documentation de {{http://mootools.net/docs/Class/Class|Class}} de MooTools.

var SudokuSet = new Class({
  
// ** Constructeur le la Classe SudokuSet
//
// 

  initialize: function(array_init){
    // Code à compléter ...
    
    // propriété d'instance
    //this._data = ????;
    
    // Dans un premier temps
    // ne pas s'occuper de l'initialisation 
    // par un tableau
  },

// ** {{{SudokuSet:set}}}
//
// ajoute un élément

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
// retire un élément

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
