// = Compteur =
//
// JS typique ou Class avec MooTools

// == Avec une Fermeture
//
// [[http://fr.wikipedia.org/wiki/Fermeture_(informatique)|Article Sur Wikipédia]]

compteur_fermeture = (function () {
  var val = 0;
  return {
    next:function () {
      return val++;
    },
    clear:function () {
      val = 0;
    }
  };
})();

// == Avec une Classe
//
// [[http://mootools.net/docs/Class/Class|Documentation de MooTools sur la création de Classes]]

CompteurClass = new Class({
  initialize: function () {
    this.data = 0;
  },
  next: function (attribute){
    return this.data++;
  },
  clear: function() {
    this.data = 0;
  }
});

compteur_instance = new CompteurClass();