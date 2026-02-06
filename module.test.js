import { calculateAge, validatePostalCode, verifyIdentity,verifyEmail } from './module.js';

let people20years;
beforeEach(() => {
    let date = new Date();
    people20years = {
        birth: new Date(date.setFullYear(date.getFullYear() - 20))
    };
});

/**
 * @function calculateAge
 * Tests unitaires pour la fonction calculateAge
 * La fonction doit retourner l'âge d'une personne en années, en fonction de sa date de naissance.

 */

/*
 * Les tests vérifient les cas suivants :
 * - L'âge correct est retourné pour une date de naissance valide.
 * - Une erreur est levée si le paramètre p est manquant.
 * - Une erreur est levée si le paramètre p n'est pas un objet.
 * - Une erreur est levée si l'objet p ne contient pas de paramètre birth.
 * - Une erreur est levée si le paramètre birth n'est pas un objet Date.
 * - Une erreur est levée si la date de naissance est invalide.
 * - Une erreur est levée si la date de naissance est dans le futur.
 * - L'âge correct est retourné pour une personne ayant exactement 20 ans.
 * - L'âge correct est retourné pour une personne ayant moins de 18 ans.
*/

describe('calculateAge Unit Test Suites', () => {

    // Age correct
    it('should return a correct age', () => {
        const chloe = {
            birth: new Date('08/17/2004')
        };
        expect(calculateAge(chloe)).toEqual(21)
    });

    // Paramètre p manquant
    it('should throw a "missing param p" error', () => {
        expect(() => calculateAge()).toThrow('missing param p');
    });

    // Paramètre p n'est pas un objet
    it('should thorw a "param p should be an object" error', () => {
        expect(() => calculateAge(42)).toThrow('param p should be an object');
        expect(() => calculateAge(null)).toThrow('param p should be an object');
    });

    // Paramètre birth manquant
    it('should throw a "object p should have a birth parameter" error', () => {
        const chloe = {};
        expect(() => calculateAge(chloe)).toThrow('object p should have a birth parameter');
    });

    // Paramètre birth n'est pas un objet Date
    it('should throw a "birth parameter should be a Date object" error', () => {
        const chloe = {
            birth: '08/17/2004'
        };
        expect(() => calculateAge(chloe)).toThrow('birth parameter should be a Date object');
    });

    // Date de naissance invalide
    it('should throw a "birth date is invalid" error', () => {
        const chloe = {
            birth: new Date('invalid date')
        };
        expect(() => calculateAge(chloe)).toThrow('birth date is invalid');
    });

    // Date de naissance dans le futur
    it('should throw a "birth date is in the future" error', () => {
        const chloe = {
            birth: new Date('08/17/3000')
        };
        expect(() => calculateAge(chloe)).toThrow('birth date is in the future');
    });

    // Exactement 20 ans
    it('should return a correct age', () => {
        expect(calculateAge(people20years)).toEqual(20);
    });

    
});

/**
 * @function validatePostalCode
 * Tests unitaires pour la validation du code postal
 */

/*
 * Le code postal doit être une chaîne de caractères composée de 5 chiffres
 * Les tests vérifient les cas suivants :
 * - La validation retourne true pour un code postal valide.
 * - La validation retourne une erreur pour un code postal invalide.
 * - La validation retourne true pour un code postal de 5 chiffres.
 * - La validation retourne une erreur pour un code postal de moins de 5 chiffres.
 * - La validation retourne une erreur pour un code postal de plus de 5 chiffres.
*/

describe('postal code validation', () => {

    // Le code postal est valide
    it('should return true if postal code is valid', () => {
        const postalCode = '75001';
        expect(validatePostalCode(postalCode)).toBe(true);
    });

    // Le code postal est invalide
    it('should return error if postal code is invalid', () => {
        const postalCode = '7500A';
        expect(() => validatePostalCode(postalCode)).toThrow('postal code should be a 5-digit number');
    });

    // Le code postal a 5 chiffres
    it('should return True if postal code has 5 digits', () => {
        const postalCode = '75001';
        expect(validatePostalCode(postalCode)).toBe(true);
    });

    // Le code postal a moins de 5 chiffres
    it('should return error if postal code has less than 5 digits', () => {
        const postalCode = '7500';
        expect(() => validatePostalCode(postalCode)).toThrow('postal code should have 5 digits');
    });

    // Le code postal a plus de 5 chiffres
    it('should return error if postal code has more than 5 digits', () => {
        const postalCode = '750001';
        expect(() => validatePostalCode(postalCode)).toThrow('postal code should have 5 digits');
    });

    // Le code postal est vide
    it('should return error if postal code is empty', () => {
        const postalCode = '';
        expect(() => validatePostalCode(postalCode)).toThrow('postal code should not be empty');
    });

});


/**
 * @function verifyIdentity
 * Tests unitaires pour la fonction verifyIdentity
 *
 */

/*
 * La fonction doit vérifier l'identité d'une personne en fonction de son nom.
 * Le nom doit être une chaîne de caractères ne contenant pas de chiffres ou de caractères spéciaux (sauf les accents et les tirets).
 * Les tests vérifient les cas suivants :
 * - Une erreur est levée si le paramètre identity est manquant.
 * - Une erreur est levée si le paramètre identity n'est pas un objet.
 * - Une erreur est levée si l'objet identity ne contient pas de paramètre name.    
 * - Une erreur est levée si le paramètre name n'est pas une chaîne de caractères.
 * - Une erreur est levée si le paramètre name contient des chiffres ou des caractères spéciaux (sauf les accents et les tirets).
 * - Une erreur est levée si le paramètre name contient des balises de script (protection contre les attaques XSS).
 */

describe('verifyIdentity Unit Test Suites', () => {

    // Paramètre identity manquant
    it('should throw a "missing param identity" error', () => {
        expect(() => verifyIdentity()).toThrow('missing param identity');
    });

    // Paramètre identity n'est pas un objet
    it('should throw a "param identity should be an object" error', () => {
        expect(() => verifyIdentity(42)).toThrow('param identity should be an object');
        expect(() => verifyIdentity(null)).toThrow('param identity should be an object');
    });

    // Paramètre name est vide
    it('should throw an error if name is empty', () => {
        const identity = {
            name: ''
        };
        expect(() => verifyIdentity(identity)).toThrow('name parameter is empty');
    });

    // Paramètre name manquant
    it('should throw a "object identity should have a name parameter" error', () => {
        const identity = {};
        expect(() => verifyIdentity(identity)).toThrow('object identity should have a name parameter');
    });

    // Paramètre name n'est pas une chaîne de caractères
    it('should throw a "name parameter should be a string" error', () => {
        const identity = {
            name: 42
        };
        expect(() => verifyIdentity(identity)).toThrow('name parameter should be a string');
    });

    // Paramètre name contient des chiffres ou des caractères spéciaux
    it('should throw a "name parameter should not contain numbers or special characters" error', () => {
        const identity = {
            name: 'Chloé123'
        };
        expect(() => verifyIdentity(identity)).toThrow('name parameter should not contain numbers or special characters');
    });

    // Paramètre name ne contient pas de caractères spéciaux
    it('should return true if name contains only valid characters', () => {
        const identity = {
            name: 'Chloé'
        };
        expect(verifyIdentity(identity)).toBe(true);
    });

    // Paramètre name contient des balises de script
    it('should throw a "name parameter should not contain script tags" error', () => {
        const identity = {
            name: '<script>alert("XSS")</script>'
        };
        expect(() => verifyIdentity(identity)).toThrow('name parameter should not contain script tags');
    });

    // Tout est correct
    it('should return true if identity is valid', () => {
        const identity = {
            name: 'Chloé'
        };
        expect(verifyIdentity(identity)).toBe(true);
    });

});


describe('verify Email Unit Test Suites', () => {

    // Paramètre email manquant
    it('should throw a "missing param email" error', () => {
        expect(() => verifyEmail()).toThrow('missing param email');
    });

    // Paramètre email n'est pas une chaîne de caractères
    it('should throw a "param email should be a string" error', () => {
        expect(() => verifyEmail(42)).toThrow('param email should be a string');
        expect(() => verifyEmail(null)).toThrow('param email should be a string');
    });

    // Paramètre email n'est pas un email valide
    it('should throw a "email parameter should be a valid email address" error', () => {
        expect(() => verifyEmail('invalid email')).toThrow('email parameter should be a valid email address');
    }); 

    // Paramètre email est un email valide
    it('should return true if email is valid', () => {
        expect(verifyEmail('test@example.com')).toBe(true);
    });

    // Paramètre email est un email valide avec des caractères spéciaux
    it('should return true if email is valid with special characters', () => {
        expect(verifyEmail('test+tag@example.com')).toBe(true);
    });

    // Paramètre email est un email valide avec des sous-domaines
    it('should return true if email is valid with subdomains', () => {
        expect(verifyEmail('test@subdomain.example.com')).toBe(true);
    });

    it('should return error if email is invalid', () => {
        expect(() => verifyEmail('invalid email')).toThrow('email parameter should be a valid email address');
    });

    it('should return error if email is empty', () => {
        expect(() => verifyEmail('')).toThrow('email parameter should be a valid email address');
    });
    
});