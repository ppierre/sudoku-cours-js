// = Sudoku Lib =
//
// [[#sequence-1-introduction/javascript/sudokulib-tests.js|Tests unitaires]]
//
// fonction de base pour sudoku

// ** {{{ nbr_possible_array(un_tableau) }}} **
//
// Compte le nombre d'éléments du tableau qui valent //vrai//

function nbr_possible_array (a) {
  var nbr_possible = 0;
  a.forEach(function(e) {
    if (e === true) {
      nbr_possible += 1;
    };
  });
  return nbr_possible;
}

// ** {{{ nbr_possible_objet(un_objet) }}} **
//
// Parcours toutes les clefs en se limitant à celle propre à l'objet
// Vérifie qu'elles valent //vrai//

function nbr_possible_objet (obj) {
  var length = 0;
  for (var key in obj){
    if (obj.hasOwnProperty(key) && (obj[key] === true)) length++;
  }
  return length;
}

