# Annuaire Utilisateurs React

**Application React avec routing, localStorage et tests complets (Jest + Cypress)**

## Technologies
  - React 
  - Jest
  - Cypress
  - Github Pages


## Fonctionnalités

- Inscription utilisateurs (formulaire validé)
- Liste utilisateurs (localStorage)
- Routing React (HashRouter GitHub Pages)
- Tests unitaires et d'intégrations Jest 
- Tests E2E Cypress
- Déploiement GitHub Pages

## Démarrage rapide

```bash
# Clone + install
git clone https://github.com/chloe-leonard337/projet_test.git
cd projet_test/my-app
npm install

# Développement
npm start
Ouvrez http://localhost:3000

## 📋 Tests complets

# Unitaires et intégration
npm run test

# Cypress E2E
npm run cypress

# Exécuter tous les tests
npm run test:all

## **MOCKS EXPLIQUÉS**
Utilisation de mocks pour leurs rapidité et leur fiabilité

### **1. Mock axios (Appels API)**

**Problème :** Les composants appellent `jsonplaceholder.typicode.com`

**Solution :** Remplacer axios par un faux qui retourne des données contrôlées

**Pourquoi c'est utile :**
- Tests **10x plus rapides** (pas d'attente réseau)
- **Même résultat** à chaque exécution
- Teste **TOUS les cas** (succès + erreurs 400/500)

### **2. Mock erreurs HTTP réalistes**

**Problème :** `Register.js` doit gérer 400, 500, réseau KO

**Solution :** Simuler `{response: {status: 400}}` → affiche "Email invalide"

**Cas testés :**
Succès → "Utilisateur créé !"
400 → "Email invalide ou déjà utilisé"
500 → "Erreur serveur"
Réseau KO → "Problème de connexion"


## Build & Déploiement

# Build de production
npm run build

# Deploiement github pages automatique
npm run deploy









