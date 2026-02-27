"use strict";

var _react = require("@testing-library/react");
var _reactRouterDom = require("react-router-dom");
var _Register = _interopRequireDefault(require("./Register"));
var api = _interopRequireWildcard(require("../api"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('../api');
const mockPostUser = api.PostUser;
const fillForm = async () => {
  await _react.fireEvent.change(_react.screen.getByLabelText(/Prénom/i), {
    target: {
      value: 'Marie'
    }
  });
  await _react.fireEvent.change(_react.screen.getByLabelText(/Nom de famille/i), {
    target: {
      value: 'Martin'
    }
  });
  await _react.fireEvent.change(_react.screen.getByLabelText(/Email/i), {
    target: {
      value: 'marie@test.fr'
    }
  });
  await _react.fireEvent.change(_react.screen.getByLabelText(/Date de naissance/i), {
    target: {
      value: '1990-01-01'
    }
  });
  await _react.fireEvent.change(_react.screen.getByLabelText(/Ville/i), {
    target: {
      value: 'Paris'
    }
  });
  await _react.fireEvent.change(_react.screen.getByLabelText(/Code postal/i), {
    target: {
      value: '75000'
    }
  });
};
const testErrorCase = async (error, expectedMessage) => {
  mockPostUser.mockRejectedValueOnce(error);
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
  }));
  await fillForm();
  _react.fireEvent.click(_react.screen.getByRole('button', {
    name: /S'inscrire/i
  }));
  await (0, _react.waitFor)(() => {
    const errorAlert = _react.screen.getAllByText(new RegExp(expectedMessage))[0];
    expect(errorAlert).toBeInTheDocument();
  });
};
describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    (0, _react.cleanup)();
  });
  it('affiche formulaire avec tous les champs', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
    }));
    expect(_react.screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(_react.screen.getByLabelText(/Nom de famille/i)).toBeInTheDocument();
    expect(_react.screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(_react.screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
    expect(_react.screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(_react.screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
    expect(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    })).toBeInTheDocument();
  });
  it('désactive bouton si formulaire vide', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
    }));
    expect(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    })).toBeDisabled();
  });
  it('active bouton après remplissage formulaire', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
    }));
    await fillForm();
    expect(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    })).not.toBeDisabled();
  });
  it('soumet données correctes via PostUser', async () => {
    const mockResponse = {
      id: 1,
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie@test.fr'
    };
    mockPostUser.mockResolvedValue(mockResponse);
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
    }));
    await fillForm();
    _react.fireEvent.click(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    }));
    await (0, _react.waitFor)(() => {
      expect(mockPostUser).toHaveBeenCalledWith({
        firstName: 'Marie',
        lastName: 'Martin',
        email: 'marie@test.fr',
        dob: '1990-01-01',
        city: 'Paris',
        postalCode: '75000'
      });
    });
  });
  describe('Error Handling', () => {
    it('affiche erreur HTTP 400', async () => {
      await testErrorCase({
        response: {
          status: 400,
          data: {
            message: 'Email invalide ou déjà utilisé'
          }
        }
      }, 'Email invalide ou déjà utilisé');
    });
    it('affiche erreur HTTP 500', async () => {
      await testErrorCase({
        response: {
          status: 500
        }
      }, 'Erreur serveur, veuillez réessayez plus tard');
    });
    it('affiche erreur réseau ERR_NETWORK', async () => {
      await testErrorCase({
        code: 'ERR_NETWORK'
      }, 'Problème de connexion. Vérifiez votre réseau');
    });
    it('utilise message erreur custom (err.message)', async () => {
      await testErrorCase(new Error('Erreur personnalisée'), 'Erreur personnalisée');
    });
    it('console.error est appelé', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockPostUser.mockRejectedValueOnce(new Error('Une erreur est survenue'));
      (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {})
      }));
      await fillForm();
      _react.fireEvent.click(_react.screen.getByRole('button', {
        name: /S'inscrire/i
      }));
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});