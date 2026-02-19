describe('Tests E2E Navigation', { testIsolation: false }, () => {

  it('Scénario classique', () => {
    // On commence sans utilisateur
    cy.clearLocalStorage('users');

    cy.visit('http://localhost:3000/');
    cy.contains('Bienvenue sur votre annuaire').should('be.visible');
    cy.window().its('localStorage').invoke('getItem', 'users')
    .then((usersStr) => {
        const users = JSON.parse(usersStr || '[]');
        expect(users).to.have.length(0);
    });
    cy.contains('Aucun inscrit').should('be.visible');
    
    // Navigation vers Formulaire
    cy.contains('nouvelle inscription').click();
    cy.url().should('include', '/register');
    cy.contains('Ajouter un nouvel utilisateur').should('be.visible');
    
    // Ajout utilisateur valide
    cy.get('#firstName').type('Marie');
    cy.get('#lastName').type('Martin');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');
    
    cy.get('button').contains('S\'inscrire').should('not.be.disabled').click();
    
    // Toast succès 
    cy.contains('Inscription réussie').should('be.visible');
    cy.wait(2500); 
    
    // Utilisateur visible
    cy.url().should('include', '/');
    cy.window().its('localStorage').invoke('getItem', 'users')
    .then((usersStr) => {
        const users = JSON.parse(usersStr || '[]');
        expect(users).to.have.length(1);
    });
    cy.contains('Marie').should('be.visible');
    cy.contains('Martin').should('be.visible');
  });

 
  it('Scénario Erreur', () => {

    // L'utilisateur de l'autre test existe toujours
    cy.window().its('localStorage').invoke('getItem', 'users')
    .then((usersStr) => {
        const users = JSON.parse(usersStr || '[]');
        expect(users).to.have.length(1);
    });

    // Navigation vers Formulaire
    cy.visit('http://localhost:3000/#/register');
    cy.contains('Ajouter un nouvel utilisateur').should('be.visible');
    
    // Tentative invalide : email déjà pris + champs vides
    cy.get('#firstName').type('Jean');
    cy.get('#email').type('marie@test.fr'); // Email DUPLIQUÉ !
    
    cy.get('button').contains('S\'inscrire').should('be.disabled');
      
    // TOUJOURS 1 utilisateur (pas incrémenté)
    cy.window().its('localStorage').invoke('getItem', 'users')
        .then((usersStr) => {
            const users = JSON.parse(usersStr || '[]');
            expect(users).to.have.length(1);
            expect(users[0].firstName).to.equal('Marie');
        });

  });
});
