// = Tests unitaires (Solitaire)

/*global CARREAU, COEUR, COULEURS, Carte, Colonne, NBR_COLONNES, 
         PIQUE, Piles, RANG, RANGS, Solitaire, TREFLE, Tas 
         fireunit
         */

// ** Constantes **

// Couleurs

fireunit.compare(
  COULEURS[PIQUE],
  "Pique",
  "La couleur de PIQUE est 'Pique'");

fireunit.compare(
  COULEURS[COEUR],
  "Coeur",
  "La couleur de COEUR est 'Coeur'");

fireunit.compare(
  COULEURS[CARREAU],
  "Carreau",
  "La couleur de CARREAU est 'Carreau'");

fireunit.compare(
  COULEURS[TREFLE],
  "Trèfle",
  "La couleur de TREFLE est 'Trèfle'");

// Rangs

fireunit.compare(
  RANGS[RANG.As],
  "As",
  "Le rang d'un As est 'As'");

fireunit.compare(
  RANGS[RANG[10]],
  "10",
  "Le rang d'un 10 est '10'");

fireunit.ok(
  new Carte(RANG.Valet, CARREAU).rang + 1 === new Carte(RANG[10], TREFLE).rang,
  "Le rang d'un 10 est le rang suivant un valet");

fireunit.ok(
  new Carte(RANG[8], PIQUE).rang + 1 === new Carte(RANG[7], COEUR).rang,
  "Le rang d'un 7 est le rang suivant un 8");

fireunit.ok(
  new Carte(RANG.Dame, CARREAU).rang + 1 === new Carte(RANG.Valet, PIQUE).rang,
  "Le rang d'un Valet est le rang suivant une Dame");

// ** Création d'une carte **

var carte_as_pique = new Carte(RANG.As, PIQUE);

fireunit.ok(
  carte_as_pique.rang === RANG.As,
  "L'As de Pique est un As");

fireunit.ok(
  carte_as_pique.couleur === PIQUE,
  "L'As de Pique est du Pique");

fireunit.ok(
  carte_as_pique.visible === false,
  "Par défaut une carte n'est pas visible");

var carte_dame_de_coeur_visible = new Carte(RANG.Dame, COEUR, true);

fireunit.ok(
  carte_dame_de_coeur_visible.rang === RANG.Dame,
  "La  Dame de Coeur est une Dame");

fireunit.ok(
  carte_dame_de_coeur_visible.couleur === COEUR,
  "La  Dame de Coeur est du Coeur");

fireunit.ok(
  carte_dame_de_coeur_visible.visible === true,
  "On a fait la Dame de Coeur visible");

// ** Ordre des cartes

fireunit.ok(
  new Carte(RANG.Valet, CARREAU).precede(new Carte(RANG[10], TREFLE)),
  "un valet précède un 10");

fireunit.ok(
  new Carte(RANG[8], CARREAU).precede(new Carte(RANG[7], TREFLE)),
  "un 8 précède un 7");

fireunit.ok(
  new Carte(RANG.Dame, CARREAU).precede(new Carte(RANG.Valet, PIQUE)),
  "une Dame précède un Valet");

fireunit.ok(
  ! new Carte(RANG.Valet, CARREAU).precede(new Carte(RANG[9], TREFLE)),
  "un valet ne précède pas un 9");

fireunit.ok(
  ! new Carte(RANG[7], CARREAU).precede(new Carte(RANG[8], TREFLE)),
  "un 7 ne précède pas un 8");

fireunit.ok(
  ! new Carte(RANG.Roi, CARREAU).precede(new Carte(RANG.Valet, PIQUE)),
  "une Roi ne précède pas un Valet");

// ** Tas **

fireunit.ok(
  new Tas().cartes.length === 52,
  "Le tas de carte en comporte 52 initialement");

var un_tas = new Tas();

fireunit.ok(
  COULEURS.every(function (nom_couleurs, couleur) {
    return RANGS.every(function (nom_rang, rang) {
      return un_tas.cartes.some(function (carte) {
        return (carte.couleur === couleur) && (carte.rang === rang);
      });
    });
  }),
  "Le tas comporte bien toutes les cartes");

// ** Piles **

var des_piles = new Piles();

fireunit.ok(
  ! des_piles.peut_prendre(new Carte(RANG.Roi, COEUR)),
  "On ne peut ajouter directement le Roi de Coeur");

fireunit.ok(
  (function () {
    try {
      des_piles.prend(new Carte(RANG.Roi, COEUR));
      return false; // ne doit pas arriver ici
    }
    catch (erreur) {
      return true; // on a bien une erreur
    }
  })(),
  "Ajouter directement le Roi de Coeur provoque une erreur");

fireunit.ok(
  des_piles.peut_prendre(new Carte(RANG.As, COEUR)),
  "Òn peut ajouter l'As de Coeur");

fireunit.ok(
  (function () {
    try {
      des_piles.prend(new Carte(RANG.As, COEUR));
      return true; // on doit arriver ici
    }
    catch (erreur) {
      return false; // on ne doit pas avoir d'erreur
    }
  })(),
  "On ajoute l'As de Coeur sans erreur");

fireunit.ok(
  des_piles.prend(new Carte(RANG.As, TREFLE)),
  "On ajoute l'As de Trèfle");

fireunit.ok(
  des_piles.prend(new Carte(RANG.Roi, TREFLE)),
  "On ajoute le Roi de Trèfle");

fireunit.ok(
  (function () {
    try {
      des_piles.prend(new Carte(RANG.Roi, TREFLE));
      return false; // ne doit pas arriver ici
    }
    catch (erreur) {
      return true; // on a bien une erreur
    }
  })(),
  "Ajouter deux fois le Roi de Trèfle provoque une erreur");

fireunit.ok(
  des_piles.prend(new Carte(RANG.Dame, TREFLE)),
  "On ajoute la Dame de Trèfle");


// ** Carte:nom

fireunit.compare(
  "Dame de Trèfle",
  new Carte(RANG.Dame, TREFLE).nom(),
  "Le nom de la Dame de Trèfle est 'Dame de Trèfle'");

fireunit.compare(
  "10 de Carreau",
  new Carte(RANG[10], CARREAU).nom(),
  "Le nom du 10 de Carreau est '10 de Carreau'");

// ** Carte:visible

var dix_de_trefle = new Carte(RANG[10], TREFLE);

fireunit.ok(
  ! dix_de_trefle.visible,
  "Le dix de Trèfle est bien caché par défaut");

dix_de_trefle.rend_visible();

fireunit.ok(
  dix_de_trefle.visible,
  "On peut rendre visible le dix de Trèfle");

dix_de_trefle.rend_visible();

fireunit.ok(
  dix_de_trefle.visible,
  "On peut redemander à rendre visible le dix de Trèfle cela ne change rien");

dix_de_trefle.rend_cache();

fireunit.ok(
  ! dix_de_trefle.visible,
  "On peut rendre caché le dix de Trèfle");

dix_de_trefle.rend_cache();

fireunit.ok(
  ! dix_de_trefle.visible,
  "On peut redemander à rendre cacher le dix de Trèfle cela ne change rien");

// ** Tas **

un_tas.cartes = [new Carte(RANG[5],    COEUR),
                 new Carte(RANG.As,    TREFLE),
                 new Carte(RANG[5],    PIQUE),
                 new Carte(RANG.Roi,   CARREAU),
                 new Carte(RANG[7],    PIQUE),
                 new Carte(RANG.Valet, COEUR),
                 new Carte(RANG[10],   PIQUE),
                 new Carte(RANG.Dame,  CARREAU)];

fireunit.ok(
  un_tas.quelle_est_la_derniere().rang    === RANG.Dame &&
  un_tas.quelle_est_la_derniere().couleur === CARREAU,
  "On peut savoir la dernière carte du tas");

fireunit.ok(
  un_tas.quelle_est_la_derniere().visible === false,
  "Ici la dernière carte du tas n'est pas visible");

un_tas.montre_la_derniere();

fireunit.ok(
  un_tas.quelle_est_la_derniere().visible === true,
  "La dernière carte du tas est rendue visible " +
  "par la méthode 'montre_la_derniere'");

var tableau_de_deux_cartes = un_tas.donnes_en(2);

fireunit.ok(
  tableau_de_deux_cartes[0].rang    === RANG[10] &&
  tableau_de_deux_cartes[0].couleur === PIQUE &&
  tableau_de_deux_cartes[1].rang    === RANG.Dame &&
  tableau_de_deux_cartes[1].couleur === CARREAU &&
  tableau_de_deux_cartes.length === 2,
  "On peut avoir les deux dernières cartes sous forme de tableau");

var taille_du_tas_avant_modification = un_tas.cartes.length;

fireunit.ok(
  (function () {
    try {
      var plein_de_cartes = un_tas.donnes_en(10);
      return false; // ne doit pas arriver ici
    }
    catch (erreur) {
      return true; // on a bien une erreur
    }
  })(),
  "En demander trop provoque une erreur");

fireunit.ok(
  un_tas.cartes.length === taille_du_tas_avant_modification &&
  un_tas.quelle_est_la_derniere().rang    === RANG.Valet &&
  un_tas.quelle_est_la_derniere().couleur === COEUR,
  "Le tas ne change pas si l'on n'a pas réussi à retirer les cartes");

var valet_de_coeur = un_tas.donne_la_derniere();

fireunit.ok(
  valet_de_coeur.rang === RANG.Valet &&
  valet_de_coeur.couleur === COEUR,
  "On peut récupérer la dernière carte du tas 'donne_la_derniere'");

fireunit.ok(
  un_tas.cartes.length === taille_du_tas_avant_modification - 1,
  "Le tas à bien changé : une carte de moins");

fireunit.ok(
  un_tas.quelle_est_la_derniere().rang    === RANG[7] &&
  un_tas.quelle_est_la_derniere().couleur === PIQUE,
  "Le tas à bien changé : la carte suivante est le 7 de Pique");

fireunit.ok(
  un_tas.quelle_est_la_derniere().visible === true,
  "Le tas à bien changé : la carte suivante est bien visible");


// ** Solitaire:initialize **
// 
// La création d'un nouveau jeu
// * On vérfie que les catre on bien êtes distribuées

var un_solitaire = new Solitaire();

fireunit.compare(
  24,
  un_solitaire.tas.cartes.length,
  "Le tas après distribution contient 24 cartes");

fireunit.ok(
  un_solitaire.tas.quelle_est_la_derniere().visible === true,
  "La dernière carte du tas est bien retournée");

fireunit.ok(
  un_solitaire.colonnes.every(function (colonne, index) {
    return colonne.cartes.length === index + 1;
  }),
  "Les colonnes ont bien la bonne taille (index + 1)");


fireunit.ok(
  un_solitaire.colonnes.every(function (colonne, index) {
    return colonne.quelle_est_la_derniere().visible === true;
  }),
  "Les colonnes ont bien la dernière carte de retournée ");


// ** Solitaire:de_tas_a_piles **

un_solitaire = new Solitaire();

un_solitaire.tas.cartes = [new Carte(RANG.Dame,  PIQUE),
                           new Carte(RANG.Roi,   CARREAU),
                           new Carte(RANG.As,    CARREAU),
                           new Carte(RANG.As,    TREFLE)];

fireunit.ok(
  un_solitaire.de_tas_a_piles(),
  "On peut mettre l'As de Trèfle du tas vers les piles");

fireunit.ok(
  un_solitaire.de_tas_a_piles(),
  "On peut mettre l'As de Carreau du tas vers les piles");

fireunit.ok(
  un_solitaire.de_tas_a_piles(),
  "On peut mettre le Roi de Carreau du tas vers les piles");

fireunit.ok(
  ! un_solitaire.de_tas_a_piles(),
  "On ne peut pas mettre la Dame de Pique du tas vers les piles");

fireunit.ok(
  un_solitaire.tas.quelle_est_la_derniere().rang    === RANG.Dame &&
  un_solitaire.tas.quelle_est_la_derniere().couleur === PIQUE,
  "Le tas a toujours comme dernière carte la Dame de Pique");


// ** Solitaire:de_tas_a_colonne **

un_solitaire = new Solitaire();

un_solitaire.tas.cartes = [new Carte(RANG.Dame,  PIQUE),
                           new Carte(RANG[8],    TREFLE),
                           new Carte(RANG.Valet, COEUR),
                           new Carte(RANG.Dame,  PIQUE)];


un_solitaire.colonnes[0].cartes = [new Carte(RANG[10], PIQUE),
                                   new Carte(RANG.Roi, CARREAU)];

fireunit.ok(
  un_solitaire.de_tas_a_colonne(un_solitaire.colonnes[0]),
  "On peut mettre la Dame de Pique du tas vers la colonne 0");

fireunit.ok(
  un_solitaire.colonnes[0].quelle_est_la_derniere().rang    === RANG.Dame &&
  un_solitaire.colonnes[0].quelle_est_la_derniere().couleur === PIQUE,
  "La colonne 0 à bien maintenant la Dame de Pique");

fireunit.ok(
  un_solitaire.de_tas_a_colonne(un_solitaire.colonnes[0]),
  "On peut mettre le Valet de Coeur du tas vers la colonne 0");

fireunit.ok(
  un_solitaire.colonnes[0].quelle_est_la_derniere().rang    === RANG.Valet &&
  un_solitaire.colonnes[0].quelle_est_la_derniere().couleur === COEUR,
  "La colonne 0 à bien maintenant le Valet de Carreau");

fireunit.ok(
  ! un_solitaire.de_tas_a_colonne(un_solitaire.colonnes[0]),
  "On ne peut pas mettre le 8 de Trèfle du tas vers la colonne 0");

fireunit.ok(
  un_solitaire.colonnes[0].quelle_est_la_derniere().rang    === RANG.Valet &&
  un_solitaire.colonnes[0].quelle_est_la_derniere().couleur === COEUR,
  "La colonne 0 a toujours comme dernière carte le Valet de Carreau");

fireunit.ok(
  un_solitaire.tas.quelle_est_la_derniere().rang    === RANG[8] &&
  un_solitaire.tas.quelle_est_la_derniere().couleur === TREFLE,
  "Le tas a toujours comme dernière carte le 8 de Trèfle");


// ** Solitaire:de_colonne_a_piles **

un_solitaire = new Solitaire();

un_solitaire.colonnes[0].cartes = [new Carte(RANG.Dame,  PIQUE),
                                   new Carte(RANG.Roi,   CARREAU),
                                   new Carte(RANG.As,    CARREAU),
                                   new Carte(RANG.As,    TREFLE)];

fireunit.ok(
  un_solitaire.de_colonne_a_piles(un_solitaire.colonnes[0]),
  "On peut mettre l'As de Trèfle de la colonne 0 vers les piles");

fireunit.ok(
  un_solitaire.de_colonne_a_piles(un_solitaire.colonnes[0]),
  "On peut mettre l'As de Carte de la colonne 0 vers les piles");

fireunit.ok(
   un_solitaire.de_colonne_a_piles(un_solitaire.colonnes[0]),
  "On peut mettre le Roi de Carreau de la colonne 0 vers les piles");

fireunit.ok(
   ! un_solitaire.de_colonne_a_piles(un_solitaire.colonnes[0]),
  "On ne peut pas mettre la Dame de Pique de la colonne 0 vers les piles");

fireunit.ok(
  un_solitaire.colonnes[0].quelle_est_la_derniere().rang    === RANG.Dame &&
  un_solitaire.colonnes[0].quelle_est_la_derniere().couleur === PIQUE,
  "La colonne 0 a toujours comme dernière carte la Dame de Pique");


// ** Solitaire:de_colonne_a_colonne

un_solitaire = new Solitaire();

un_solitaire.colonnes[0].cartes = [new Carte(RANG.Valet, COEUR),
                                   new Carte(RANG.Roi,   COEUR),
                                   new Carte(RANG.Roi,   TREFLE),
                                   new Carte(RANG.Dame,  PIQUE),
                                   new Carte(RANG.Roi,   CARREAU)];

un_solitaire.colonnes[1].cartes = [new Carte(RANG.As,    TREFLE)];

un_solitaire.colonnes[2].cartes = [new Carte(RANG.As,    CARREAU)];

un_solitaire.colonnes[3].cartes = [];

fireunit.ok(
  un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[1]),
  "On peut mettre le Roi de Carreau de la colonne 0 vers la colonne 1");

fireunit.ok(
  un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[1]),
  "On peut mettre la Dame de Pique de la colonne 0 vers la colonne 1");

fireunit.ok(
  ! un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[1]),
  "On ne peut pas mettre le Roi de Trèfle de la colonne 0 vers la colonne 1");

fireunit.ok(
  un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[2]),
  "On peut mettre le Roi de Trèfle de la colonne 0 vers la colonne 2");

fireunit.ok(
  un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[3]),
  "On peut mettre le Roi de Coeur de la colonne 0 vers la colonne 3");

fireunit.ok(
  un_solitaire.de_colonne_a_colonne(
    un_solitaire.colonnes[0], un_solitaire.colonnes[1]),
  "On peut mettre le Valet de Coeur de la colonne 0 vers la colonne 1");

// ** Fin des tests
fireunit.testDone();