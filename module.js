/**
 * Calculates the age of a person based on their birth date.
 * 
 * @param {object} p An object representing a person, implementing a birth Date parameter. 
 * @returns {number} The age of the person in years.
 */

function calculateAge(p) {
    if (p === undefined) {
        throw new Error('missing param p');
    }
    if (typeof p !== 'object' || p === null) {
        throw new Error('param p should be an object');
    }
    if (!p.hasOwnProperty('birth')) {
        throw new Error('object p should have a birth parameter');
    }
    if (!(p.birth instanceof Date)) {
        throw new Error('birth parameter should be a Date object');
    }
    if (isNaN(p.birth.getTime())) {
        throw new Error('birth date is invalid');
    }
    if (p.birth.getTime() > Date.now()) {
        throw new Error('birth date is in the future');
    }
    let DateDiff = new Date(Date.now() - p.birth.getTime());
    let age = Math.abs(DateDiff.getUTCFullYear() - 1970);
    return age;
}

/**
 * 
 * @param {number} postalCode 
 * @returns {boolean} true if postal code is valid, false otherwise
 * 
 */
function validatePostalCode(postalCode) {
    if (!postalCode || postalCode.length === 0) {
        throw new Error('postal code should not be empty');
    }
    if (postalCode.length !== 5) {
        throw new Error('postal code should have 5 digits');
    }
    if (!/^\d{5}$/.test(postalCode)) {
        throw new Error('postal code should be a 5-digit number');
    }
    return true;
}



function verifyIdentity(identity) {
    // Le paramètre identity doit être défini
    if (identity === undefined) {
        throw new Error('missing param identity');
    }
    // Le paramètre identity doit être un objet non null
    if (typeof identity !== 'object' || identity === null) {
        throw new Error('param identity should be an object');
    }
    // Le paramètre name doit être présent
    if (!identity.hasOwnProperty('name')) {
        throw new Error('object identity should have a name parameter');
    }
    // Le nom doit être une chaîne de caractères
    if (typeof identity.name !== 'string') {
        throw new Error('name parameter should be a string');
    }
    //protection contre les attaques XSS
    if (identity.name.match(/<script.*?>.*?<\/script>/i)) {
        throw new Error('name parameter should not contain script tags');
    }
    // ni chiffre ni caractère spécial (sauf exceptions)
    if (identity.name.match(/[^a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ\s'-]/)) {
        throw new Error('name parameter should not contain numbers or special characters');
    }
    return true;
}


function verifyEmail(email) {
    if (email === undefined) {
        throw new Error('missing param email');
    }
    if (typeof email !== 'string') {
        throw new Error('param email should be a string');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('email parameter should be a valid email address');
    }
    return true;
}

export { calculateAge, validatePostalCode, verifyIdentity, verifyEmail };