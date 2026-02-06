import { validateForm } from "./validator";

/**
 * @function validateForm
 * Tests unitaires pour la fonction validateForm
 */

describe('validateForm', () => {

    // Tous les paramètres sont valides
    it('should return true if all parameters are valid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
    
    // L'utilisateur a moins de 18 ans
    it('should throw an error if user is under 18 years old', () => {
        const age = { birth: new Date("01/01/2015") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('user should be at least 18 years old');
    });

    // L'utilisateur a exactement 18 ans
    it('should validate if user is exactly 18 years old', () => {
        const age = { birth: new Date(new Date().setFullYear(new Date().getFullYear() - 18)) };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });

    // L'utilisateur a plus de 18 ans
    it('should validate if user is over 18 years old', () => {
        const age = { birth: new Date("01/01/1990") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });

    // Le code postal est invalide
    it('should throw an error if postal code is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '7500A';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('postal code is invalid');
    });

    // Le code postal est vide
    it('should throw an error if postal code is empty', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('postal code is invalid');
    });

    // Le code postal est valide
    it('should validate correct postal code', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });

    // L'identité est invalide
    it('should throw an error if identity is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé123'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('identity is invalid');
    });

    // L'identité est vide
    it('should throw an error if identity is empty', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: ''
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('identity is invalid');
    });

    // L'identité est valide
    it('should validate correct identity', () => {
        const age = { birth: new Date('2000-01-01') };
        const postalCode = '75001';
        const identity = { name: 'Chloé' };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });

    // L'email est invalide
    it('should throw an error if email is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloeexample.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('email is invalid');
    });

    // L'email est vide
    it('should throw an error if email is empty', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = '';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('email is invalid');
    });

    // L'email est valide
    it('should validate correct email', () => {
        const age = { birth: new Date('2000-01-01') };
        const postalCode = '75001';
        const identity = { name: 'Chloé' };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });

});