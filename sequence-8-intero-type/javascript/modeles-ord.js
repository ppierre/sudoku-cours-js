// = Modéles =
//
// On y trouve :
// 
// * Les cartes : Carte
// * Les (La) piles : Piles
// * Le tas : Tas
// * Les colonnes : Colonne
// 
// Et le jeux dans son ensemble : Solitaire

/*global Class */

// == Constantes 

// ** Couleurs **

var PIQUE   = 0,
    COEUR   = 1,
    CARREAU = 2,
    TREFLE  = 3;

var COULEURS = ["Pique", "Coeur", "Carreau", "Trèfle"];

// ** Rangs **
// 
// Les Rangs vont de 0 à 12 en décroissant

var RANGS = ["As", "Roi", "Dame", "Valet", 
              "10", "9", "8", "7", "6", "5", "4", "3", "2"];

// * Construction d'un dictionnaire :
// ** Les index suivant les noms

var RANG = (function () {
  var rang_par_nom = {};
  RANGS.forEach(function (item, index) {
    rang_par_nom[item] = index;
  });
  return rang_par_nom;
})();

// == Avec quoi on joue ?

// ** {{{ Carte }}} **
// 
// Représente une carte à jouer :
// 
// Est caratérisé par :
// * Le rang
// * La couleur
// * Sa vibilité (retourné ou non)
// ** Par défault non visible

var Carte = new Class({
  initialize: function (rang, couleur, visible) {
    this.rang = rang;


  },

// ** {{{ Carte:precede}}} **
// 
// Dis si la carte précède une autre (par rang)
// 
// Praramétre : la carte supposée suivante
// 
// Retourne un booléen

  precede: function (autre_carte) {
    return this.rang + 1 === autre_carte.rang;
  },

// ** {{{ Carte.nom }}}
// 
// Retourne une chaine de caractère représentant le nom de la carte

  nom: function () {

  },

// ** {{{ Carte:rend_visible }}}
//
// Rend visible la carte

  rend_visible: function () {

    return this;
  },

// ** {{{ Carte:rend_cache }}}
//
// Rend caché la carte

  rend_cache: function () {

    return this;
  }

});


// ** {{{ Tas }}} **
// 
// Représente les tas ou l'on pioche les cartes
// 
// Initialiser avec toutes les cartes du jeux

var Tas = new Class({
  initialize: function () {
    // les cartes sont stoker dans un tableau

    // pour chaque couleurs

      // pour chaques rangs




    // trier les cartes suivant un critère aléatoire
    this.cartes.sort(function (a, b) {
      // on tire à pile ou face
      return Math.random() - 0.5;
    });
  },

// ** {{{ Tas:donnes_en }}} **
// 
// Donne un nombre déterminer de carte

  donnes_en: function (nbr) {
    // vérfifie qu'il a assez de cartes !
    if (nbr > this.cartes.length) {
      // Crie si ce n'est pas le cas
      throw new Error("Vous m'en demander trop !");
    } else {
      // en contant de puis la fin '-nbr' on retire 'nbr' éléments


    }
  },

// ** {{{ Tas:montre_la_derniere }}} **
// 
// Montre la dernière cartes du tas

  montre_la_derniere: function () {
    // trouve la dernière carte


    return this;
  },

// ** {{{ Tas:quelle_est_la_derniere }}} **
// 
// Dit quel est la derniére carte (mais ne la retire pas)

  quelle_est_la_derniere: function () {
    // On vérifie que l'on a encore au moins une carte

      // On crie que l'on a plus rien


      // on retourne la dreniére carte 
      // (mais elle reste réferencée dans le tableau)


  },

// ** {{{ Tas:donne_la_derniere }}} **
// 
// Donne la derniére carte en la retirant du tableau

  donne_la_derniere: function () {
    // On vérifie que l'on a encore au moins une carte
    if (this.cartes.length < 1) {
      // On crie que l'on a plus rien
      throw new Error("J'ai plus rien à donner !");
    } else {
      // La derniére carte tout en la retirant

      // Si il y a encore au moins une carte



      // on retourne la carte retiré

    }
  }

});


// ** {{{ Piles }}} **
// 
// Ou l'on peut déposer les cartes (si on repecte les régles !)
// 
// * Un tas par couleurs
// * On débute un tas par l'As
// * Puis on empile les cartes par rangs
// ** Roi, Dame, Valet, 10, 9, ... , 2

var Piles = new Class({
  initialize: function () {
    // Un tableau de 4 tableaux (un par piles de couleurs)
    this.pile_couleurs = [[], [], [], []];
  },

// ** Remarque :** on prend un peut d'avance su comment jouer ...

// ** {{{ Piles:peut_prendre}}}
// 
// Dit si la pile peut prendre une carte (rappel : il faut respecter l'ordre)
// 
// Retourne un booléen

  peut_prendre: function (carte) {
    /* Si la taille de la pile correspondant à la couleur 
           est égale à son rang */

  },

// ** {{{ Piles:prend }}} **
// 
// Prend la carte (déclenche une erreurs si cela est impossible)

  prend: function (carte) {
    // Si l'on peut prendre la carte
    if (this.peut_prendre(carte)) {
      // On l'ajoute sur la pile de la bonne couleur
      this.pile_couleurs[carte.couleur].push(carte);
    } else {
      // Si on a essayer de tricher, on crie au scandale
      throw new Error("Impossible de prendre la carte :" + carte.nom());
    }
    return this;
  }
});


// ** {{{ Colonne }}} **
// 
// Représente une colonne de cartes

var Colonne = new Class({

// ** Constructeur **
// 
// Reçoit un tableau (non vide) de cartes
// 
// Rend visible la derniére carte

  initialize: function (cartes) {
    this.cartes = cartes;
    // On rend visible la derniéres carte de la colonnes
    this.cartes[cartes.length - 1].rend_visible();
  },

// ** {{{ Colonne:peut_prendre }}}
// 
// Dis si la colonne peut prendre une carte
// 
// Retourne un booléen

  peut_prendre: function (nvl_carte) {
    // On fait attention la colonne peut être vide !
    try {
      // On regarde déja la derniére carte :
      var derniere_carte = this.quelle_est_la_derniere();
    }
    catch (e) {
      // Si la colonne est vide
      if (e.message === "J'ai plus rien à montrer !") {
        // On peut alors placer la catre que l'on veut
        return true;
      } else {
        // Si on est ici pour une autre raison !
        // On ne sait pas quoi faire, alors on relance l'erreur
        throw e;
      }
    }
    // En premier on regarde le rang
    if (nvl_carte.rang !== (derniere_carte.rang + 1)) {
      // ce n'est pas la suivant donc impossible
      return false;
    } else {
      // maintenant la couleur

        // Si on va sur pique ou trèfle on doit avoir coeur ou carreau


        // Sin on a coeur ou carreau on doit avoir pique ou trèfle


    }
  },

// ** {{{ Colonne:prend }}} **
// 
// Prend la carte (déclenche une erreurs si cela est impossible)

  prend: function (carte) {
    // Si l'on peut prendre la carte
    if (this.peut_prendre(carte)) {
      // On l'ajoute sur la pile de la bonne couleur
      this.cartes.push(carte);
    } else {
      // Si on a essayer de tricher, on crie au scandale
      throw new Error("Impossible de prendre la carte :" + carte.nom());
    }
    return this;
  },

// ** {{{ Colonne:quelle_est_la_derniere }}} **
// 
// Dit quel est la derniére carte (mais ne la retire pas)

  quelle_est_la_derniere: function () {
    // On vérifie que l'on a encore au moins une carte
    if (this.cartes.length < 1) {
      // On crie que l'on a plus rien
      throw new Error("J'ai plus rien à montrer !");
    } else {
      // on retourne la dreniére carte 
      // (mais elle reste réferencée dans le tableau)
      return this.cartes[this.cartes.length - 1];
    }
  },

// ** {{{ Colonne:donne_la_derniere }}} **
// 
// Donne la derniére carte en la retirant du tableau

  donne_la_derniere: function () {














  },

// ** {{{ Colonne:montre_la_derniere }}} **
// 
// Montre la dernière cartes du tas

  montre_la_derniere: function () {




  }

});


// ** {{{ Solitaire }}} **
// 
// Le jeu de solitaire comporte
// 
// * 7 colonnes (NBR_COLONNES)

var NBR_COLONNES = 7;

// * Un tas (pour la pioche)
// ** Remarque : la dernière carte non distribué, doit être retournée
// * Une pile(s) (par couleurs)

var Solitaire = new Class({
  initialize: function () {
    // le tas ou l'on pioche 
    // (Rappel il mélange les cartes)
    this.tas = new Tas();
    // la pile(s) 
    // (Rappel : ou vont les cartes par couleurs et dans l'ordre)
    this.piles = new Piles();
    // un tableau de colonnes (à remplir)
    this.colonnes = [];
    // Pour faire chaqunes des colonnes (index de 0 à NBR_COLONNES - 1)
    NBR_COLONNES.times(function (index) {
      // On l'ajoute au tableau de colonne
      this.colonnes.push(
        // Création de la colonne
        new Colonne(
          // Avec un paquet de carte pris sur le tas
          this.tas.donnes_en(index + 1)
          )
        );
    }, this);
    this.tas.montre_la_derniere();
  },

// == Comment on joue ?
// 
// === Les mouvements simple :
// 
// * Placer une carte sur la pile de sa couleurs (la bonne des Piles)
// ** La derniére depuis le tas
// ** La derniére depuis une colonne
// * Place une carte sur une colonne  
// ** La derniére depuis le tas
// ** La derniére depuis une autre colonne
//
// Pour plus tard : une suite d'un colone à une autre ...


// ==== Mouvement depuis le tas

// ** {{{ Solitaire::de_tas_a_piles }}} **
// 
// Essaye de déplace la derniére carte du tas vers les piles
// 
// Retourne {{{true}}} si il a réussi ; ({{{false}}} si non)

  de_tas_a_piles: function () {
    // Demande si il peut (mais ne déplace pas)
    if (this.piles.peut_prendre(this.tas.quelle_est_la_derniere())) {
      // On peut déplacer la derniére ccarte
      // on prend sur le tas
      var carte = this.tas.donne_la_derniere();
      // on la place sur la pile
      this.piles.prend(carte);
      // Dis qu'il a réussi !
      return true;
    } else {
      // On ne peut pas déplacer la derniére : on le dit (sans crier)
      return false;
    }
  },

// ** {{{ Solitaire:de_tas_a_colonne}}} **
// 
// Essaye de déplace la derniére carte d'une colonne vers les piles
// 
//Paramètres :
// * On doit lui dire quel colonne
// 
// Retourne {{{true}}} si il a réussi ; ({{{false}}} si non)

  de_tas_a_colonne: function (colonne) {













  },

// ==== Mouvement depuis une colonne

// ** {{{ Solitaire::de_colonne_a_piles }}} **
// 
// Essaye de déplace la derniére carte d'une colonne vers les piles
// 
// Paramètres :
// * On doit lui dire quel colonne
// 
// Retourne {{{true}}} si il a réussi ; ({{{false}}} si non)

  de_colonne_a_piles: function (colonne) {
    // Demande si il peut (mais ne déplace pas)
    if (this.piles.peut_prendre(colonne.quelle_est_la_derniere())) {
      // On peut déplacer la derniére carte
      // on prend sur la colonne
      var carte = colonne.donne_la_derniere();
      // on la place sur la pile
      this.piles.prend(carte);
      // Dis qu'il a réussi !
      return true;
    } else {
      // On ne peut pas déplacer la derniére : on le dit (sans crier)
      return false;
    }
  },

// ** {{{ Solitaire:de_colonne_a_colonne}}} **
// 
// Essaye de déplace la derniére carte d'une colonne vers une autre colonne
// 
//Paramètres :
// * On doit lui dire la colonne de départ
// * Et on doit lui dire la colonne d'arrivée
// 
// Retourne {{{true}}} si il a réussi ; ({{{false}}} si non)

  de_colonne_a_colonne: function (depart_colonne, arrive_colonne) {
    // Demande si il peut (mais ne déplace pas)
    if (arrive_colonne.peut_prendre(depart_colonne.quelle_est_la_derniere())) {
      // On peut déplacer la derniére carte
      // on prend sur le tas
      var carte = depart_colonne.donne_la_derniere();
      // on la place sur la pile
      arrive_colonne.prend(carte);
      // Dis qu'il a réussi !
      return true;
    } else {
      // On ne peut pas déplacer la derniére : on le dit (sans crier)
      return false;
    }
  }
});
