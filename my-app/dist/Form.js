"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _validator = _interopRequireDefault(require("./module/validator.js"));
require("./Form.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Form(_ref) {
  let {
    onSubmitSuccess
  } = _ref;
  const [formData, setFormData] = (0, _react.useState)({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    city: '',
    postalCode: ''
  });
  const [errors, setErrors] = (0, _react.useState)({});
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);

  // Validation en temps réel pour chaque champ
  const validateField = (0, _react.useCallback)((name, value) => {
    const newErrors = _objectSpread({}, errors);
    try {
      switch (name) {
        case 'firstName':
        case 'lastName':
          if (!value.trim()) {
            newErrors[name] = 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres';
          } else {
            const identity = {
              name: "".concat(formData.firstName, " ").concat(formData.lastName).trim() || value
            };
            (0, _validator.default)({
              birth: new Date('2000-01-01')
            }, '75001', 'Paris', identity, 'test@test.com');
            delete newErrors[name];
          }
          break;
        case 'email':
          if (!value.trim()) {
            newErrors[name] = 'Email invalide';
          } else {
            (0, _validator.default)({
              birth: new Date('2000-01-01')
            }, '75001', 'Paris', {
              name: 'Test'
            }, value);
            delete newErrors[name];
          }
          break;
        case 'dob':
          if (!value) {
            newErrors[name] = 'Vous devez avoir au moins 18 ans';
          } else {
            const age = {
              birth: new Date(value)
            };
            (0, _validator.default)(age, '75001', 'Paris', {
              name: 'Test'
            }, 'test@test.com');
            delete newErrors[name];
          }
          break;
        case 'city':
          if (!value.trim()) {
            newErrors[name] = 'Veuillez saisir une ville valide';
          } else {
            (0, _validator.default)({
              birth: new Date('2000-01-01')
            }, '75001', value, {
              name: 'Test'
            }, 'test@test.com');
            delete newErrors[name];
          }
          break;
        case 'postalCode':
          if (!value.trim()) {
            newErrors[name] = 'Veuillez entrer un code postal valide (5 chiffres)';
          } else {
            (0, _validator.default)({
              birth: new Date('2000-01-01')
            }, value, 'Paris', {
              name: 'Test'
            }, 'test@test.com');
            delete newErrors[name];
          }
          break;
        default:
          break;
      }
    } catch (error) {
      switch (name) {
        case 'firstName':
        case 'lastName':
          newErrors[name] = 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres';
          break;
        case 'email':
          newErrors[name] = 'Email invalide';
          break;
        case 'dob':
          newErrors[name] = 'Vous devez avoir au moins 18 ans';
          break;
        case 'city':
          newErrors[name] = 'Veuillez saisir une ville valide';
          break;
        case 'postalCode':
          newErrors[name] = 'Veuillez entrer un code postal valide (5 chiffres)';
          break;
        default:
          newErrors[name] = 'Erreur de validation';
      }
    }
    setErrors(newErrors);
  }, [formData.firstName, formData.lastName, errors]);

  // Validation complète du formulaire
  const isFormValid = (0, _react.useCallback)(() => {
    return Object.keys(errors).length === 0 && formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.dob && formData.city.trim() && /^\d{5}$/.test(formData.postalCode);
  }, [formData, errors]);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [name]: value
    }));

    // Validation temps réel
    validateField(name, value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const age = {
        birth: new Date(formData.dob)
      };
      const identity = {
        name: "".concat(formData.firstName, " ").concat(formData.lastName).trim()
      };
      (0, _validator.default)(age, formData.postalCode, formData.city, identity, formData.email);
      const userData = _objectSpread(_objectSpread({}, formData), {}, {
        fullName: identity.name,
        timestamp: Date.now()
      });
      onSubmitSuccess(userData);

      // Reset formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        city: '',
        postalCode: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Erreur finale:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "form-container",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      onSubmit: handleSubmit,
      className: "form",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "firstName",
          children: "Pr\xE9nom :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          id: "firstName",
          name: "firstName",
          value: formData.firstName,
          onChange: handleChange,
          className: errors.firstName ? 'error' : ''
        }), errors.firstName && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "firstName",
          className: "error-label",
          children: errors.firstName
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "lastName",
          children: "Nom de famille :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          id: "lastName",
          name: "lastName",
          value: formData.lastName,
          onChange: handleChange,
          className: errors.lastName ? 'error' : ''
        }), errors.lastName && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "lastName",
          className: "error-label",
          children: errors.lastName
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "email",
          children: "Email :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleChange,
          className: errors.email ? 'error' : ''
        }), errors.email && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "email",
          className: "error-label",
          children: errors.email
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "dob",
          children: "Date de naissance :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          id: "dob",
          name: "dob",
          value: formData.dob,
          onChange: handleChange,
          max: new Date().toISOString().split('T')[0],
          className: errors.dob ? 'error' : ''
        }), errors.dob && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "dob",
          className: "error-label",
          children: errors.dob
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "city",
          children: "Ville :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          id: "city",
          name: "city",
          value: formData.city,
          onChange: handleChange,
          className: errors.city ? 'error' : ''
        }), errors.city && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "city",
          className: "error-label",
          children: errors.city
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "postalCode",
          children: "Code postal :"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          id: "postalCode",
          name: "postalCode",
          value: formData.postalCode,
          onChange: handleChange,
          maxLength: "5",
          className: errors.postalCode ? 'error' : ''
        }), errors.postalCode && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "postalCode",
          className: "error-label",
          children: errors.postalCode
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "submit",
        className: "Home-button",
        disabled: !isFormValid() || isSubmitting,
        children: isSubmitting ? 'Enregistrement...' : 'S\'inscrire'
      })]
    })
  });
}
var _default = exports.default = Form;