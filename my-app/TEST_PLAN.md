# PLAN DE TESTS - Formulaire d'inscription React

## 📋 **1. Contexte et objectifs**

**Auteur :** LEONARD Chloé  
**Date :** 13 février 2026  
**Projet :** Formulaire d'inscription avec validation temps réel  

**Objectifs des tests :**
- Atteindre **100% couverture de code** sur `Form.js` (actuel : 95.77%)
- Valider **validation temps réel** des 6 champs
- Séparer clairement **UT** (unitaires) vs **IT** (intégration)

---

###  Choix entre UT et IT

Les tests unitaires vérifient le fonctionnement de chaque fonction indépendantes. Ils sont donc principalement présents dans module/validator.test.js et module/module.test.js.
Pour tester le formulaire, j'ai choisi de réutiliser les fonctions qui ont été testés précédemment, j'ai donc pu me concentrer principalement sur la gestion et l'intégration des données. Pour cela, j'utilise des tests d'inégrations qui me permettent de vérifier le bon fonctionnement du formulaire (affichage d'erreurs si les valeurs entrées sont incorrectes, désactivation du bouton tant que des données ne sont pas correctes, vérification de l'incrémentation du compteur lorsqu'une inscription est compléter, ....)

---

### **📁 Tests Unitaires Module (module.test.js )**

| **Fonction** | **Cas couverts** |
|--------------|------------------|
| `calculateAge()` | Âge valide/invalide/futur/vide |
| `validatePostalCode()` | 5 chiffres/valide/invalide |
| `validateCity()` | Ville valide/vide/chiffres/script(XSS) |
| `verifyIdentity()` | Valid/invalid/script(XSS)/vide |
| `verifyEmail()` | Valide/invalide/vide/caractères spéciaux |
| `validateForm()` | Tous combos (âge/code/ville/identity/email) |

**Couverture UT Module : 100% fonctions métier**

---

### **📁 Tests Intégration (App.test.js - Inclus dans Form.test.js)**

| **Flux E2E** | **Cas couverts** | **Composants** |
|--------------|------------------|----------------|
| **Soumission complète** | App → Form → localStorage → `onSubmitSuccess` → Compteur | **App + Form** |
| **Persistance** | Données sauvées → Compteur persistant | **localStorage** |
| **Reset UI** | Champs vidés | **Form + App** |

---

### En résumé 

- TESTS UNITAIRES (Form.test.js) : 28 tests
   → Validation temps réel 6 champs (invalid/null)
   → Rendu UI + isFormValid() + soumission

- TESTS MODULE (module.test.js) : 40+ tests  
   → calculateAge, validatePostalCode, validateCity...
   → validateForm toutes combinaisons

- TESTS INTÉGRATION (App.test.js)
   → Flux intégration : Gestion du formulaire -> envoie dans le localStorage -> Incrémentation du compteur

**Couverture :95.77%**

---

## **4. Tests manquants (pour 100%)**

- Pour avoir 100% sur le Form.js, il manque principalement la correction des 2 tests en échecs (tests sur la gestion des valeurs vides pour la date de naissance et le mail)