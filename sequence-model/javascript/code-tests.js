// = Tests unitaires (Modèle)


// ** La fonction retourne toujours 1
//
// Les affiramtions doivent êtres positives
fireunit.ok(
  (une_fonction_ret_1() === 1),
  "La fonction retourne toujours 1");

// ** Un test qui compare deux chaines
//
// Permets de tester de résultats complexes
fireunit.compare(
  "chaîne un", "chaîne deux",
  "Les deux chaînes sont égales");

// ** Fin des tests
fireunit.testDone();