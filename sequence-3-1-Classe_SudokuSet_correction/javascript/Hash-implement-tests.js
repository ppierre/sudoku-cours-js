// = Tests unitaires (Hash modifiée)


// ** Création d'une instance de SudokuSet
//
// voir documentation de [[http://mootools.net/docs/Class/Class|MooTools:Class]]

s1 = new Hash();
fireunit.ok(
  (typeof s1 === "object"),
  "La création d'une instance de Hash donne bien un objet");

// ** Ajout d'un élément
//
// On utilise la méthode //set//
//
// * On passe le chiffre à ajouter
// * La fonction retourne l'objet lui-même

fireunit.ok(
  (s1.set(1) === s1),
  "L'ajout d'un élément retourne l'objet");

// ** On peut tester la présence d'un élément
//
// On utilise la méthode //has//
//
// * Retourne //true// pour un élément présent
// * Retourne //false// pour un élément absent

fireunit.ok(
  (s1.has(1) === true),
  "L'élément précédemment ajouté " +
  " (ici 1) est présent");

fireunit.ok(
  (s1.has(2) === false),
  "retourne false pour un élément absent (ici 2)");

// ** Retirer un élément
//
// On utilise la méthode //erase//
//
// * On passe le chiffre à retirer
// * La fonction retourne l'objet lui même
// * On peut retirer un élément absent

fireunit.ok(
  (s1.erase(1) === s1),
  "Retirer un élément retourne l'objet");

fireunit.ok(
  (s1.has(1) === false),
  "Retirer un élément le rend bien absent," +
  " (ici 1) has retourne false)");


// ** Ajout d'un élément déjà présent
//
// * L'ajout d'un élément déjà présent ne change rien (il reste présent).
// * On peut retirer en une fois un élément ajouter plusieurs fois.

s1.set(1);
s1.set(1);
fireunit.ok(
  (s1.has(1) === true),
  "Ajout d'un élément déjà présent");

s1.erase(1);
fireunit.ok(
  (s1.has(1) === false),
  "On peut retirer en une fois un élément ajouter plusieurs fois");

// ** Ajout de plusieurs éléments
//
// * En chaînant les appels à set
// * En passant un tableau au constructeur

fireunit.ok(
  (s1.set(1).set(4).set(3).set(6) === s1),
  "Ajout de plusieurs éléments par chaînage");

objet_test = {1:undefined, 4:undefined, 3:undefined, 6:undefined};
s2 = new Hash(objet_test);
fireunit.ok(
  (typeof s1 === "object"),
  "Création d'une instance de SudokuSet" +
  " avec un tableau d'éléments initiaux");

// ** Contôle les éléments ajouter
//
// //test_inclut(set,tableau)// :\\
// fonction utilitaire qui test si tous les éléments du tableau sont bien dans le //set//.

function test_inclut(set, objet) {
  return $H(objet).getKeys().every(function (key) {
    return set.has(key);
  });
}

fireunit.ok(
  test_inclut(s1, objet_test),
  "Les éléments ont bien été ajoutés par les appels de has");

fireunit.ok(
  test_inclut(s2, objet_test),
  "Les éléments ont bien été ajoutés " +
  " par le tableau initial passé au constructeur");

// ** Éléments sous forme de tableau sous forme de tableau
//
// * La méthode //getKeys// doit retourner un tableau
// * Le tableau n'est pas nécessairement trié ([[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Objets_globaux/Array/sort|Array:sort]])

function sort_num (array) {
  return array.sort(function (a, b) {
    return a - b;
  })
}

tableau_test_sort = sort_num($H(objet_test).getKeys());

fireunit.compare(
  sort_num(s1.getKeys()).toString(),
  tableau_test_sort.toString(),
  "getKeys, pour les éléments ajoutés par has");

fireunit.compare(
  sort_num(s2.getKeys()).toString(),
  tableau_test_sort.toString(),
  "getKeys, pour les éléments ajoutés " +
  " par le constructeur");

// ** Inclusiont d'un ensemble
//
// * Retourne true si : chaque élément de l'ensemble comparé doit être dans l'ensemble d'origine
// * Retourne false si un élément n'est pas présent

fireunit.ok(
  new Hash({2:undefined, 5:undefined, 3:undefined}).hasAllKeys(new Hash({3:undefined, 2:undefined})),
  "{2,3} est bien inclut dans {2,3,5}");

fireunit.ok(
  ! new Hash({1:undefined, 5:undefined, 3:undefined}).hasAllKeys(new Hash({3:undefined, 2:undefined})),
  "{2,3} n'est pas inclut dans {1,3,5}");

// ** Egualité d'ensemble
//
// ** Remarque :** on ne peut utiliser l'opérateur //==// car il test l'identité des objets est non leurs valeurs (voir [[https://developer.mozilla.org/fr/R%C3%A9f%C3%A9rence_de_JavaScript_1.5_Core/Op%C3%A9rateurs/Op%C3%A9rateurs_de_comparaison|Opérateurs de comparaison]])

fireunit.ok(
  new Hash({2:undefined, 5:undefined, 3:undefined}).equalKeys(new Hash({5:undefined, 2:undefined, 3:undefined})),
  "Les ensembles {2,5,3} et {5,2,3} son égal ");

fireunit.ok(
  ! new Hash({2:undefined, 5:undefined}).equalKeys(new Hash({5:undefined, 2:undefined, 3:undefined})),
  "Les ensembles {2,5} et {5,2,3} ne sont pas égaux");

fireunit.ok(
  ! new Hash({5:undefined, 2:undefined, 3:undefined}).equalKeys(new Hash({2:undefined, 5:undefined})),
  "Les ensembles {5,2,3} et {2,5} ne sont pas égaux");

// ** Opération d'ensemble : addition

fireunit.compare(
  "2,3,5",
  sort_num(new Hash({2:undefined, 5:undefined})
             .combine(new Hash({3:undefined, 5:undefined}))
             .getKeys()).toString(),
  "{2,5} combiné avec {3,5} donne : {2,3,5}");

// ** Opération d'ensemble : soustraction

fireunit.compare(
  "2,3",
  sort_num(new Hash({2:undefined, 5:undefined, 3:undefined})
             .removeKeys(new Hash({5:undefined, 4:undefined}))
             .getKeys()).toString(),
  "{2,5,3} retrancher par {5,4} donne : {2,3}");

// ** Opération d'ensemble : intersection

fireunit.compare(
  "2,5",
  sort_num(new Hash({2:undefined, 5:undefined, 3:undefined})
            .intersectKeys(new Hash({5:undefined, 2:undefined, 4:undefined}))
            .getKeys()).toString(),
  "l'intersection {2,5,3} et {5,2,4} donne : {2,5}");

// ** Copie d'un ensemble
//
// Doit retourner un objet
// * distinct
// * mais qui contiens les mêmes valeurs
// * changer les éléments d'un ne doit pas changer l'autre

s3 = new Hash({1:undefined, 3:undefined, 7:undefined});
s3_copy = $H(s3);

fireunit.ok(
  s3 !== s3_copy,
  "La copie d'un ensemble est un objet distinct");

fireunit.compare(
  sort_num(s3_copy.getKeys()).toString(),
  sort_num(s3.getKeys()).toString(),
  "les valeurs de la copie sont égales à celles de l'original");

s3.set(9);

fireunit.ok(
  !s3.equalKeys(s3_copy),
  "Changer la copie ne change pas l'original");
  
// ** Fin des tests

fireunit.testDone();