// = Classe SudokuViewGrid =
//
// Fais la correspondance entre les saisies de l'utilisateur 
// et un tableau de tableau contenant les valeurs saisies.

var SudokuViewGrid = new Class({
  
// == Constructeur
// 
// Recoit : 
// * l'élément ou insérer le code HTML 
// * et un tableau de valeurs initiales

  initialize: function(element, data){

  },

// == {{{SudokuViewGrid:get}}}
//
// Reçoit :
// * l'indice de la ligne
// * l'indice de la colonne
//
// Retourne la valeurs corespondant a cette position

  get: function(i_ligne, i_col){
    return 1111;
  },

// == {{{SudokuViewGrid:get}}}
//
// Reçoit :
// * l'indice de la ligne
// * l'indice de la colonne
// * la nouvelle valeur
//
// Retourne l'objet lui-même

  set: function(i_ligne, i_col, value){

    return this;
  }
});