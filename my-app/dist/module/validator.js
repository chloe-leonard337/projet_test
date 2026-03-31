"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.validateForm = validateForm;
var _module = require("./module");
/**
 * 
 * @param {number} age 
 * @param {number} postalCode 
 * @param {string} city
 * @param {string} identity 
 * @param {string} email 
 * @returns boolean true if all parameters are valid, false otherwise
 * 
 * Cette fonction valide les paramètres d'un formulaire en vérifiant l'âge, le code postal, l'identité et l'email.
 */

function validateForm(age, postalCode, city, identity, email) {
  try {
    const ageValue = (0, _module.calculateAge)(age);
    if (ageValue < 18) {
      throw new Error('user should be at least 18 years old');
    }
  } catch (error) {
    throw new Error('user should be at least 18 years old');
  }
  try {
    (0, _module.validatePostalCode)(postalCode);
  } catch (error) {
    throw new Error('postal code is invalid');
  }
  try {
    (0, _module.validateCity)(city);
  } catch (error) {
    throw new Error('city is invalid');
  }
  try {
    (0, _module.verifyIdentity)(identity);
  } catch (error) {
    throw new Error('identity is invalid');
  }
  try {
    (0, _module.verifyEmail)(email);
  } catch (error) {
    throw new Error('email is invalid');
  }
  return true;
}
var _default = exports.default = validateForm;