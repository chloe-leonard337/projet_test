import { validateForm } from "./validator";

/**
 * @function validateForm
 * Tests unitaires pour la fonction validateForm
 */
describe('validateForm', () => {
    it('should return true if all parameters are valid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
    it('should throw an error if user is under 18 years old', () => {
        const age = { birth: new Date("01/01/2015") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('user should be at least 18 years old');
    });
    it('should throw an error if postal code is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '7500A';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('postal code is invalid');
    });
    it('should validate correct postal code', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
    it('should throw an error if identity is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé123'
        };
        const email = 'chloe@example.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('identity is invalid');
    });
    it('should validate correct identity', () => {
        const age = { birth: new Date('2000-01-01') };
        const postalCode = '75001';
        const identity = { name: 'Chloé' };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
    it('should throw an error if email is invalid', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = 'chloeexample.com';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('email is invalid');
    });
    it('should throw an error if email is empty', () => {
        const age = { birth: new Date("01/01/2000") };
        const postalCode = '75001';
        const identity = {
            name: 'Chloé'
        };
        const email = '';
        expect(() => validateForm(age, postalCode, identity, email)).toThrow('email is invalid');
    });
    it('should validate correct email', () => {
        const age = { birth: new Date('2000-01-01') };
        const postalCode = '75001';
        const identity = { name: 'Chloé' };
        const email = 'chloe@example.com';
        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
    it('should validate all parameters are valid', () => {
        const age = { birth: new Date('2000-01-01') };
        const postalCode = '75001';
        const identity = { name: 'Chloé' };
        const email = 'chloe@example.com';

        expect(validateForm(age, postalCode, identity, email)).toBe(true);
    });
});