import { calculateAge, verifyIdentity, validatePostalCode,verifyEmail } from "./module";

/**
 * 
 * @param {number} age 
 * @param {number} postalCode 
 * @param {string} identity 
 * @param {string} email 
 * @returns boolean true if all parameters are valid, false otherwise
 * 
 * Cette fonction valide les paramètres d'un formulaire en vérifiant l'âge, le code postal, l'identité et l'email.
 */

function validateForm(age, postalCode, identity, email) {

    try {
        const ageValue = calculateAge(age);
        if (ageValue < 18) {
            throw new Error('user should be at least 18 years old');
        }
    } catch (error) {
        throw new Error('user should be at least 18 years old');
    }


    try {
        validatePostalCode(postalCode);
    } catch (error) {
        throw new Error('postal code is invalid');
    }

    try {
        verifyIdentity(identity);
    } catch (error) {
        throw new Error('identity is invalid');
    }

    try {
        verifyEmail(email);
    } catch (error) {
        throw new Error('email is invalid');
    }

    
    return true;
}

export { validateForm }