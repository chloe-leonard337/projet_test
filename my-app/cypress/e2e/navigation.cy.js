describe('Tests E2E Navigation',  () => {

    it('Scénario classique', () => {

        //intercepte la requete GET pour la liste des utilisateurs
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
            statusCode: 200,
            body: [
                {
                    id: 16,
                    name: 'Test2 test',
                    dateBirth: '2000-01-01',
                    email: 'test2@test.fr',
                    address: {city: 'Angers'},
                    postalCode: '49100'
                },
                {
                    id: 15,
                    name: 'Test test',
                    dateBirth: '2000-01-01',
                    email: 'test@test.fr',
                    address: {city: 'Angers'},
                    postalCode: '49000'
                }
            ],

<<<<<<< HEAD
 
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
=======
>>>>>>> 41db64e (Activite mocks)
        });

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
        
        //intercepte la requete POST pour l'utilisateur créé
        cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
            statusCode: 201,
            body: {
                utilisateurs: [
                    {
                        id: 15,
                        name: 'Test test',
                        dateBirth: '2000-01-01',
                        email: 'test@test.fr',
                        address: {city: 'Angers'},
                        postalCode: '49000'
                    }
                ],
            },
        });

        cy.get('button').contains('S\'inscrire').should('not.be.disabled').click();

        // Toast succès 
        cy.contains('Inscription réussie').should('be.visible');
        cy.wait(2500); 

        // Verifie que l'utilisateur apparait 
        cy.contains('Test').should('be.visible');
        cy.contains('Test2').should('be.visible');        
        
    });

    it('Scénario Erreur 400', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
            statusCode: 200,
            body: [
                {
                    id: 16,
                    name: 'Test2 test',
                    dateBirth: '2000-01-01',
                    email: 'test2@test.fr',
                    address: { city: 'Angers' },
                    postalCode: '49100',
                },
                {
                    id: 15,
                    name: 'Test test',
                    dateBirth: '2000-01-01',
                    email: 'test@test.fr',
                    address: { city: 'Angers' },
                    postalCode: '49000',
                },
            ],
        }).as('getUsers');

        // Genere une erreur
        cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
            statusCode: 400,
            body: { message: 'Email déjà utilisé' },
        }).as('postUser');

        cy.visit('http://localhost:3000/');
        cy.wait('@getUsers'); // verifie que la liste est chargée

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

        // Verifie que le POST n’est pas parti
        cy.get('@postUser.all').should('have.length', 0);

        // Retour à la home pour vérifier que la liste n’a pas changé
        cy.visit('http://localhost:3000/');
        cy.wait('@getUsers');

        cy.contains('Test').should('be.visible');
        cy.contains('Test2').should('be.visible');
        // aucun nouveau nom comme "Jean" par exemple
        cy.contains('Jean').should('not.exist');
    });

    it('Crash Serveur - Erreur 500', () => {

        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
        statusCode: 200,
        body: [],
        }).as('getUsers');

        cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
        statusCode: 500,
        body: { 
            message: 'Erreur interne du serveur',
            error: 'INTERNAL_SERVER_ERROR'
        }
        }).as('postUserCrash');

        cy.visit('http://localhost:3000/');
        cy.wait('@getUsers');
        cy.contains('nouvelle inscription').click();

        // Formulaire valide mais serveur down
        cy.get('#firstName').type('Paul');
        cy.get('#lastName').type(' Durand');
        cy.get('#dob').type('1985-05-15');
        cy.get('#email').type('paul@test.fr');
        cy.get('#city').type('Lyon');
        cy.get('#postalCode').type('69001');

        cy.get('button').contains("S'inscrire").click();
        cy.wait('@postUserCrash');

        // App ne plante PAS - alerte utilisateur
        cy.contains('Erreur serveur, veuillez réessayez plus tard.').should('be.visible');
        
        // Pas de toast succès
        cy.contains('Inscription réussie').should('not.exist');
    });
});
