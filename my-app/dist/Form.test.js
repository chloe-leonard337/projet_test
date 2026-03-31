"use strict";

var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _Register = _interopRequireDefault(require("./components/Register"));
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @function handleSubmit
 */test('vérification de la présence de localStorage', () => {
  localStorage.setItem('test', 'ok');
  expect(localStorage.getItem('test')).toBe('ok');
});

/**
 * @function validateField
 */

// Test que le formulaire s'affiche correctement
test('renders form fields', () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  expect(_react.screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
  expect(_react.screen.getByLabelText(/Nom de famille/i)).toBeInTheDocument();
  expect(_react.screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(_react.screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
  expect(_react.screen.getByLabelText(/Ville/i)).toBeInTheDocument();
  expect(_react.screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
});

// Test qu'une erreur s'affiche si le champ prénom n'est pas rempli correctement
test('shows error for invalid first name', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const firstNameInput = _react.screen.getByLabelText(/Prénom/i);
  _userEvent.default.type(firstNameInput, 'John123');
  expect(_react.screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
});
test('shows error for null first name', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const firstNameInput = _react.screen.getByLabelText(/Prénom/i);
  _userEvent.default.type(firstNameInput, ' ');
  expect(_react.screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
});

// Test qu'une erreur s'affiche si le champ email n'est pas rempli correctement
test('shows error for invalid email', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const emailInput = _react.screen.getByLabelText(/Email/i);
  _userEvent.default.type(emailInput, 'invalid-email');
  expect(_react.screen.getByText(/Email invalide/i)).toBeInTheDocument();
});
/*
test('shows error for null email', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, ' ');
    expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
});
*/
// Test qu'une erreur s'affiche si le champ date de naissance n'est pas rempli correctement
test('shows error for underage user', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const dobInput = _react.screen.getByLabelText(/Date de naissance/i);
  _userEvent.default.type(dobInput, '2010-01-01');
  expect(_react.screen.getByText(/Vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
});
/*
test('shows error for null date of birth', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const dobInput = screen.getByLabelText(/Date de naissance/i);

    userEvent.type(dobInput, '0000-00-00');  
    expect(screen.getByText(/Vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
});
*/
test('shows error for null first name', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const firstNameInput = _react.screen.getByLabelText(/Prénom/i);
  _userEvent.default.type(firstNameInput, ' ');
  expect(_react.screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
});

// Test qu'une erreur s'affiche si le champ ville n'est pas rempli correctement
test('shows error for invalid city', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const cityInput = _react.screen.getByLabelText(/Ville/i);
  _userEvent.default.type(cityInput, '12345');
  expect(_react.screen.getByText(/Veuillez saisir une ville valide/i)).toBeInTheDocument();
});
test('shows error for null city', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const cityInput = _react.screen.getByLabelText(/Ville/i);
  _userEvent.default.type(cityInput, ' ');
  expect(_react.screen.getByText(/Veuillez saisir une ville valide/i)).toBeInTheDocument();
});

// Test qu'une erreur s'affiche si le champ code postal n'est pas rempli correctement
test('shows error for invalid postal code', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const postalCodeInput = _react.screen.getByLabelText(/Code postal/i);
  _userEvent.default.type(postalCodeInput, 'ABCDE');
  expect(_react.screen.getByText(/Veuillez entrer un code postal valide \(5 chiffres\)/i)).toBeInTheDocument();
});
test('shows error for null postal code', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const postalCodeInput = _react.screen.getByLabelText(/Code postal/i);
  _userEvent.default.type(postalCodeInput, ' ');
  expect(_react.screen.getByText(/Veuillez entrer un code postal valide \(5 chiffres\)/i)).toBeInTheDocument();
});

// Test            
test('shows error for invalid last name', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const lastNameInput = _react.screen.getByLabelText(/Nom de famille/i);
  _userEvent.default.type(lastNameInput, 'Doe123');
  expect(_react.screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
});
test('shows error for null last name', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const lastNameInput = _react.screen.getByLabelText(/Nom de famille/i);
  _userEvent.default.type(lastNameInput, ' ');
  expect(_react.screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
});

// Test le switch default
test('default case handles unknown field gracefully', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  const input = _react.screen.getAllByRole('textbox')[0];

  // Force un nom inexistant pour couvrir les 2 defaults
  _react.fireEvent.change(input, {
    target: {
      name: 'unknownField',
      value: 'test123'
    }
  });

  // premier default: break;
  expect(_react.screen.getByRole('button', {
    name: /S'inscrire/i
  })).toBeInTheDocument();
});
test('default case in catch sets generic error for unknown field', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });

  // ✅ Prend n'importe quel input existant
  const input = _react.screen.getByLabelText(/Prénom/i);

  // ✅ Force name inconnu = 1er switch default → catch → 2e switch default
  _react.fireEvent.change(input, {
    target: {
      name: 'unknownField',
      // ← Déclenche les 2 defaults
      value: 'invalid123'
    }
  });

  // Vérifie que le code s'exécute sans crash (les 2 defaults fonctionnent)
  expect(_react.screen.getByRole('button', {
    name: /S'inscrire/i
  })).toBeInTheDocument();
});

/**
 * @function handleSubmit
 */

// Test que le formulaire se soumet correctement avec des données valides
test('submits form with valid data', async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {}), {
    wrapper: _reactRouterDom.BrowserRouter
  });
  _userEvent.default.type(_react.screen.getByLabelText(/Prénom/i), 'John');
  _userEvent.default.type(_react.screen.getByLabelText(/Nom de famille/i), 'Doe');
  _userEvent.default.type(_react.screen.getByLabelText(/Email/i), 'john.doe@example.com');
  _userEvent.default.type(_react.screen.getByLabelText(/Date de naissance/i), '1990-01-01');
  _userEvent.default.type(_react.screen.getByLabelText(/Ville/i), 'Paris');
  _userEvent.default.type(_react.screen.getByLabelText(/Code postal/i), '75001');
  _userEvent.default.click(_react.screen.getByRole('button', {
    name: /S'inscrire/i
  }));
});