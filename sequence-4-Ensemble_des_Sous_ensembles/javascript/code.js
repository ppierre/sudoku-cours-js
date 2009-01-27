// == Power Set :
// * [[http://fr.wikipedia.org/wiki/Ensemble_des_parties_d%27un_ensemble|Ensemble des parties d'un ensemble (WpFR)]]
// * [[http://en.wikipedia.org/wiki/Power_set#Algorithms|Power Set Wikipedia EN]]

/*global $defined $type SudokuSet SudokuList Class */

// ** {{{ getFirst }}} **
// * Reçoit un tableau
// * Retourne un élément (le premier)
//
// Donne le 1er élément d'un tableau

function getFirst(array) {

}

// ** {{{ getRest }}} **
// * Reçoit un tableau
// * Retourne une copie du tableau (sauf le premier élément)
//
// Donne un tableau qui est une copie du paramètre sauf le 1er élément

function getRest(array) {

}

// ** {{{ appendTo }}} **
// * Reçoit un élément et un tableau
// * Retourne un tableau 
//
// Ajoute un élément au début du tableau

function appendTo(value, array) {

}

// ** {{{ appendToAll }}} **
// * Reçoit un élément et un tableau de tableau
// * Retourne un tableau de tableau
// 
// Ajoute un élément au début de chaque tableau contenu dans le tableau de tableau

function appendToAll(value, list_of_array) {



}

// ** {{{ power_set }}} **
// * Reçoit un tableau
// * Retourne un tableau de tableau
// 
// Voir [[http://en.wikipedia.org/wiki/Power_set#Algorithms|Power Set Wikipedia EN]]

function power_set(array) {







}

// === Power Set ajouté à Array
//
// [[http://mootools.net/docs/Class/Class#Class:implement|Class:implement]]

Array.implement({

// ** {{{ Array:getRest }}} **
// * Reçoit un tableau
// * Retourne une copie du tableau (sauf le premier élément)

  getRest: function () {

  },

// ** {{{ Array:powerSet }}} **
// * Retourne un tableau de tableau
//
// Donne l'ensemble des sous-ensembles

  powerSet: function () {







  }
});

// == Comparaison avec //equal// ou {{{===}}}
//
// Reçoit un tableau à comparer avec l'instance (//this// : un tableau)
//
// Ajoute //equal// à {{{Array}}}
// * compare les tableaux élément par élément
// * utilise la méthode//equal// si elle est définie pour les éléments
// * si //equal// n'est pas définie, utilise {{{===}}}

Array.implement({
  equal: function (array) {
    return this.every(function (val_this, pos) {
      var val_param = array[pos];
      if ($defined(val_this.equal)) {
        return val_this.equal(val_param);
      } else {
        return val_this === val_param;
      }
    });
  }
});

// == SudokuList
// Une liste de "cases" avec pour chaque leurs valeurs possibles ({{{SudokuSet}}})
//
// En Bref un tableau de {{{SudokuSet}}}

SudokuList = new Class({

// ** voir documentation de [[http://mootools.net/docs/Class/Class|Class]] pour {{{Extends}}}

  Extends: Array,

// ** Constructeur de {{{SudokuList}}}
// * Peut recevoir un tableau en paramètre
// * Si les éléments du tableau sont des tableaux, les convertis-en {{{SudokuSet}}}

  initialize: function (array_init) {
    if ($defined(array_init)) {
      array_init.forEach(function (set) {
        if ($type(set) === "array") {
          set = new SudokuSet(set);
        }
        this.push(set);
      }, this);
    }
  },

// ** {{{SudokuSet:getAllKeys}}}
// 
// Retourne un tableau de tableaux, ces tableaux contiennent les clefs (SudokuSet:getKeys) des SudokuSet contenus dans l'instance de SudokuList

  getAllKeys: function () {



  },

// ** {{{SudokuList:combineAll}}}
//
// Retourne un {{{SudokuSet}}} qui contient toutes les clefs distinctes (utilise {{{SudokuSet:combine}}}) de tous éléments contenus dans cette liste (//this//)

  combineAll: function () {





  },

// ** {{{SudokuList:powerSet}}}
// 
// Retourne un tableau de {{{SudokuList}}}
//
// * Utilise la méthode //powerSet// de la classe parent ({{{SudokuSet:powerSet}}})
// * //powerSet// retourne un tableau de tableaux
// ** Converti les tableaux en instance de {{{SudokuList}}}

  powerSet: function () {



  },

// ** {{{SudokuList:isComplete}}}
//
// Retourne si le nombre d'élément de la liste et égale au nombre de clefs distinctes dans tous les éléments de la liste ({{SudokuList:combineAll}} retourne une instance {{{SudokuSet}}})

  isComplete : function () {

  },

// ** {{{SudokuList:getAllCompleteList}}}
//
// Retourne si le nombre d'élément de la liste et égale au nombre de clefs distinctes dans tous les éléments de la liste ({{SudokuList:combineAll}})

  getAllCompleteList : function () {



  },

// ** {{{SudokuList:reduce(list)}}}
//
// * Reçoit une liste ({{{SudokuList}}}) de {{{SudokuSet}}}
// * Retourne l'objet lui-même (//this//)
//
// * Retire aux éléments de cette instance (//this//) toutes les clefs présentent dans la liste reçue en paramètre (utilise {{{SudokuList:combineAll}}})
// * Ne modifie pas un élément si il est dans la liste passé en paramètre

  reduce: function (list) {







  },

// ** {{{SudokuList:reducePowerSet}}}
//
// * Retourne l'objet lui-même (//this//)
//
// * Utilise //powerSet// pour obtenir tous les sous-ensembles
// * Ne garde que ceux qui sont "complets" (//isCompleteSet//)
// * Réduit (//reduce//) par chaque sous-ensemble complet

  reducePowerSet: function () {




  }

// ** {{{SudokuList:iterReducePowerSet}}} inutile ?
//
// * Retourne l'objet lui-même (//this//)
//
// * Prend une "photo" de l'objet avec //getAllKeys//
// * Applique //reducePowerSet//
// * Compare avec la "photo", si il y a des différences, recommence

  // iterReducePowerSet: function () {
  //   // inutile ???
  // }
});