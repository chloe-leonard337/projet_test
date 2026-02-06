/**
 * Calculates the age of a person based on their birth date.
 * 
 * @param {object} p An object representing a person, implementing a birth Date parameter. 
 * @returns {number} The age of the person in years.
 */

function calculateAge(p) {
    let DateDiff = new Date(Date.now() - p.birth.getTime());
    let age = Math.abs(DateDiff.getUTCFullYear() - 1970);
    return age;
}

