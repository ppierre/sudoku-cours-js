// = Tests unitaires de Sudoku Lib
// ** Rappel de //Javacript//

// === Portée des variables**

// ** On peut voir une variable définie dans la même portée.

var dans_portee = true;
fireunit.ok(
  dans_portee,
  "Peut voir la variable dans la même portée");

// ** Une Fonction est ce qui crée une nouvelle portée.
//
// L'utilisation d'une fonction anonyme :
// 
// * {{{function() {} }}}
//
// Avec sont appel :
//
// * {{{ ( ... )(); }}}
//
// Idiome permettant de créer une [[http://fr.wikipedia.org/wiki/Port%C3%A9e_(informatique)|portée de variable]] (scope)

(function() {
  var sous_portee = false;
  fireunit.ok(
    $defined(sous_portee), 
    "Peut voir la variable dans la même sous-portée");
})();

// ** Tester l'existence d'une variable (ou fonction)
//
// L'utilisation de l'opérateur [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_sp%C3%A9ciaux/L%27op%C3%A9rateur_typeof|typeof]] permet d'éviter l'erreur lors de l'analyse.

fireunit.ok(
  (typeof sous_portee === "undefined"),
  "Ne voit pas la variable de la sous-portée");

// ** La portée des variables est [[http://fr.wikipedia.org/wiki/Port%C3%A9e_(informatique)|lexicale]] en Javascript.
//
// On peut référer à une variable d'une portée supérieure.

(function() {
  dans_portee = "nvl valeur";
  fireunit.ok(
    (dans_portee === "nvl valeur"),
    "Peut changer une varible capturé");
})();
fireunit.ok(
  (dans_portee === "nvl valeur"),
  "Le changement de la valeur est visible dans cette portée");

// === Structure de données
//
// La suite vise à introduire
// * L'usage des [[http://fr.wikipedia.org/wiki/Test_unitaire|tests unitaires]]
// * La notion de [[http://en.wikipedia.org/wiki/Set_(computer_science)|collection non ordonnée (set)]]
//
// Dans les exemples suivants, on démarrera toujours avec les valeurs 1 et 3

// ==== Tableaux
// N’oublier pas que vous pouvez (devez) utiliser des ressources :
// * [[https://developer.mozilla.org/fr/JavaScript|Mozilla/Javascript]] : [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array|Array]]
// * [[http://mootools.net/docs/|MooTools]] : [[http://mootools.net/docs/Native/Array|Array]]

// ** Notation littérale d'un tableau
// * **Rappel :** les tableaux débutent à //zéro//.
// * On utilise un booléen pour symboliser la présence d'un élément.

var possible = [null,  // Position zéro
                true,  // 1 est présent
                false, // 2 est absent
                true,  // 3 est présent
                false, // 4 est absent
                false, // ...
                false,
                false,
                false,
                false];

// ** On vérifie la présence (ou absence) en comparant la valeur correspondant à la position.
//
// ** Rappel :** préférez l'usage de l'[[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_de_comparaison|opérateur de comparaison stricte (===)]].

fireunit.ok(
  (possible[1] === true),
  "1 est présent");
fireunit.ok(
  (possible[2] === false),
  "2 est absent");
fireunit.ok(
  (possible[3] === true),
  "3 est présent");

// ** On modifie la présence d'un élément en modifiant la valeur associée.

possible[1] = false;
fireunit.ok(
  (possible[1] === false),
  "On peut retirer 1");

// ** L'usage de booléen permet d'utiliser la négation.

possible[2] = !possible[2];
fireunit.ok(
  (possible[2] === true),
  "On peut basculer l'état de 2");

// ** Compter les éléments demande un code spécifique :
// 
// Voir : [[#sequence-1-introduction/javascript/sudokulib.js|sudokulib.js]]

fireunit.ok(
  (nbr_possible_array(possible) === 2),
  "On a deux éléments");

// ==== Tableau associatif
// Les [[http://fr.wikipedia.org/wiki/Tableau_associatif|tableaux associatifs]] associent à un ensemble de clefs un ensemble correspondant de valeurs.
//
// En Javascript un tableau associatif est un [[https://developer.mozilla.org/fr/Guide_JavaScript_1.5/Constantes_litt%C3%A9rales#Objets|Objet]], et inversement.

// ** On spécifie les éléments présents en leur associant la valeur //vraie//.

var possible = { 1:true, 3:true};

// ** On peut vérifier la présence d'un élément :
// * Présent si la valeur associée est //vraie//.
// * Absent si pas de valeur associée : [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Propri%C3%A9t%C3%A9s_globales/undefined|undefined]].
// ** La librairie MooTools dispose de la fonction [[http://mootools.net/docs/Core/Core#defined|$defined]] pour effectuer ce test.

fireunit.ok(
  (possible[1] === true),
  "1 est présent");
fireunit.ok(
  (! $defined(possible[2])),
  "2 est absent");
fireunit.ok(
  (possible[3] === true),
  "3 est présent");

// ** On retire un élément
// par l'opérateur [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_sp%C3%A9ciaux/L%27op%C3%A9rateur_delete|delete]].

delete possible[1];
fireunit.ok(
  (! $defined(possible[1])),
  "On peut retirer 1");

// ** Suivant cette logique, il n'est pas simple de basculer l'état :
// * Si présent : l'effacer
// * Si absent : l'ajouter

// ne correspond pas au raisonnement 
//possible[2] = !possible[2];

// ** Compter les éléments demande un code spécifique :
// 
// Voir : [[#sequence-1-introduction/javascript/sudokulib.js|sudokulib.js]]

fireunit.ok(
  (nbr_possible_objet(possible) === 2),
  "On a deux éléments")

// ==== Variante tableau associatif
//
// On peut exploiter le fait que [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Propri%C3%A9t%C3%A9s_globales/undefined|undefined]] est considéré comme **false** (faux).

// Le code reste le même :

var possible = {1:true,3:true};
fireunit.ok(
  (possible[1] === true),
  "1 est présent");

// ** Possible car :
//
// {{{!undefined === true}}}

fireunit.ok(
  (!possible[2]),
  "2 est absent");

fireunit.ok(
  (possible[3] === true),
  "3 est présent");
  
possible[1] = false;
fireunit.ok(
  (!possible[1]),
  "On peut retirer 1");

// ** Possible car :
// * {{{!undefined === true}}}
// * {{{     !true === false}}}
// * {{{    !false === true}}}

possible[2] = !possible[2];
fireunit.ok(
  (possible[2] === true),
  "On peut basculer l'état de 2")

// ==== Tableau associatif (Hash) de Mootools
//
// MooTools propose l'objet [[http://mootools.net/docs/Native/Hash|Hash]]
// * Il utilise extensivement la fonction [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Object/hasOwnProperty|hasOwnProperty]]

var possible = $H({1:true,3:true});
fireunit.ok(
  (possible.getLength() === 2),
  "On a deux éléments");


// ** Fin des tests

fireunit.testDone();