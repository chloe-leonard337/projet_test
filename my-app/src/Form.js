import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import validateForm from './module/validator.js';
import './Form.css';

function Form({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    city: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);




  // Validation en temps réel pour chaque champ
  const validateField = useCallback((name, value) => {
    
    const errorMessages = {
      firstName: 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres',
      lastName: 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres',
      email: 'Email invalide',
      dob: 'Vous devez avoir au moins 18 ans',
      city: 'Veuillez saisir une ville valide',
      postalCode: 'Veuillez entrer un code postal valide (5 chiffres)'
    };
    const newErrors = { ...errors };

    try {
      switch (name) {
        case 'firstName':
        case 'lastName':
          if (!value.trim()) {
            newErrors[name] = 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres';
          } else {
            const identity = { name: `${formData.firstName} ${formData.lastName}`.trim() || value };
            validateForm(
              { birth: new Date('2000-01-01') }, 
              '75001', 
              'Paris', 
              identity, 
              'test@test.com'
            );
            delete newErrors[name];
          }
          break;

        case 'email':
          if (!value.trim()) {
            newErrors[name] = 'Email invalide';
          } else {
            validateForm(
              { birth: new Date('2000-01-01') }, 
              '75001', 
              'Paris', 
              { name: 'Test' }, 
              value
            );
            delete newErrors[name];
          }
          break;

        case 'dob':
          if (!value) {
            newErrors[name] = 'Vous devez avoir au moins 18 ans';
          } else {
            const age = { birth: new Date(value) };
            validateForm(age, '75001', 'Paris', { name: 'Test' }, 'test@test.com');
            delete newErrors[name];
          }
          break;

        case 'city':
          if (!value.trim()) {
            newErrors[name] = 'Veuillez saisir une ville valide';
          } else {
            validateForm(
              { birth: new Date('2000-01-01') }, 
              '75001', 
              value, 
              { name: 'Test' }, 
              'test@test.com'
            );
            delete newErrors[name];
          }
          break;

        case 'postalCode':
          if (!value.trim()) {
            newErrors[name] = 'Veuillez entrer un code postal valide (5 chiffres)';
          } else {
            validateForm(
              { birth: new Date('2000-01-01') }, 
              value, 
              'Paris', 
              { name: 'Test' }, 
              'test@test.com'
            );
            delete newErrors[name];
          }
          break;
        default:
          break;
      }
    } catch (error) {
        if (name === 'firstName' || name === 'lastName') {
            newErrors[name] = errorMessages[name];
        } else if (name === 'email') {
            newErrors[name] = errorMessages.email;
        } else if (name === 'dob') {
            newErrors[name] = errorMessages.dob;
        } else if (name === 'city') {
            newErrors[name] = errorMessages.city;
        } else if (name === 'postalCode') {
            newErrors[name] = errorMessages.postalCode;
        }
    }

    setErrors(newErrors);
  }, [formData.firstName, formData.lastName, errors, errorMessages]);

  // Validation complète du formulaire
  const isFormValid = useCallback(() => {
    return Object.keys(errors).length === 0 &&
           formData.firstName.trim() &&
           formData.lastName.trim() &&
           formData.email.trim() &&
           formData.dob &&
           formData.city.trim() &&
           /^\d{5}$/.test(formData.postalCode);
  }, [formData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation temps réel
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const age = { birth: new Date(formData.dob) };
      const identity = { name: `${formData.firstName} ${formData.lastName}`.trim() };
      validateForm(age, formData.postalCode, formData.city, identity, formData.email);

      // localStorage
      const userData = { 
        ...formData, 
        fullName: identity.name,
        timestamp: Date.now() 
      };
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      onSubmitSuccess(userData);
          
      // Toaster succès
      toast.success(' Inscription réussie !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    
      
      // Reset formulaire
      setFormData({
        firstName: '', lastName: '', email: '', dob: '', city: '', postalCode: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Erreur finale:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {/* Prénom */}
        <div className="form-field">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && (
            <label htmlFor="firstName" className="error-label">
              {errors.firstName}
            </label>
          )}
        </div>

        {/* Nom */}
        <div className="form-field">
          <label htmlFor="lastName">Nom de famille :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && (
            <label htmlFor="lastName" className="error-label">
              {errors.lastName}
            </label>
          )}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <label htmlFor="email" className="error-label">
              {errors.email}
            </label>
          )}
        </div>

        {/* Date de naissance */}
        <div className="form-field">
          <label htmlFor="dob">Date de naissance :</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={errors.dob ? 'error' : ''}
          />
          {errors.dob && (
            <label htmlFor="dob" className="error-label">
              {errors.dob}
            </label>
          )}
        </div>

        {/* Ville */}
        <div className="form-field">
          <label htmlFor="city">Ville :</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && (
            <label htmlFor="city" className="error-label">
              {errors.city}
            </label>
          )}
        </div>

        {/* Code postal */}
        <div className="form-field">
          <label htmlFor="postalCode">Code postal :</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            maxLength="5"
            className={errors.postalCode ? 'error' : ''}
          />
          {errors.postalCode && (
            <label htmlFor="postalCode" className="error-label">
              {errors.postalCode}
            </label>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
}

export default Form;
