describe('Tests E2E Navigation', () => {

    it('Scénario classique', () => {

       cy.visit('http://localhost:3000/');
        cy.contains('Bienvenue sur votre annuaire').should('be.visible');
        
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

        // Verifie que l'utilisateur apparait 
        cy.contains('Test').should('be.visible');
        cy.contains('Test2').should('be.visible');        
        
    });

    it('Scénario Erreur 400', () => {

        cy.visit('http://localhost:3000/');

        // Les 2 users initiaux sont affichés
        cy.contains('Test').should('be.visible');
        cy.contains('Test2').should('be.visible');

        cy.contains('nouvelle inscription').click();
        cy.url().should('include', '/register');
        cy.contains('Ajouter un nouvel utilisateur').should('be.visible');

        // Tentative invalide : email déjà pris + champs pas tous remplis
        cy.get('#firstName').type('Jean');
        cy.get('#email').type('test@test.fr'); // email existant dans la liste

        cy.get('button').contains("S'inscrire").should('be.disabled');

        // Retour à la home pour vérifier que la liste n’a pas changé
        cy.visit('http://localhost:3000/');

        cy.contains('Test').should('be.visible');
        cy.contains('Test2').should('be.visible');
        // aucun nouveau nom comme "Jean" par exemple
        cy.contains('Jean').should('not.exist');
    });

    it('Crash Serveur - Erreur 500', () => {

 
        cy.visit('http://localhost:3000/');
        cy.contains('nouvelle inscription').click();

        // Formulaire valide mais serveur down
        cy.get('#firstName').type('Paul');
        cy.get('#lastName').type(' Durand');
        cy.get('#dob').type('1985-05-15');
        cy.get('#email').type('paul@test.fr');
        cy.get('#city').type('Lyon');
        cy.get('#postalCode').type('69001');

        cy.get('button').contains("S'inscrire").click();

        // App ne plante PAS - alerte utilisateur
        cy.contains('Erreur serveur, veuillez réessayez plus tard.').should('be.visible');
        
        // Pas de toast succès
        cy.contains('Inscription réussie').should('not.exist');
    });
});
