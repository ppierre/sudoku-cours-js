// = Compteur =
//
// JS typique ou Class avec MooTools

// == Avec une Fermeture
//
// [[http://fr.wikipedia.org/wiki/Fermeture_(informatique)|Article Sur Wikipédia]]

/*global Class */

var compteur_fermeture = (function () {
  var val = 0;
  return {
    next: function () {
      return val++;
    },
    clear: function () {
      val = 0;
    }
  };
})();

// == Avec une Classe
//
// [[http://mootools.net/docs/Class/Class|Documentation de MooTools sur la création de Classes]]

var CompteurClass = new Class({
  initialize: function () {
    if (1 > this.data) {
      this.data = 1;
    }
    this.data = 0;
  },
  next: function (attribute) {
    return this.data++;
  },
  clear: function () {
    this.data = 0;
  }
});

var compteur_instance = new CompteurClass();