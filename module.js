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

export { calculateAge };