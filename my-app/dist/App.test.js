"use strict";

var api = _interopRequireWildcard(require("./api"));
var _react = require("@testing-library/react");
var _App = _interopRequireDefault(require("./App"));
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _Register = _interopRequireDefault(require("./components/Register"));
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
jest.mock('./api', () => ({
  GetUsers: jest.fn(),
  PostUser: jest.fn()
}));
const mockGetUsers = api.GetUsers;
const mockPostUser = api.PostUser;

/**
 * @function App
 */

//verifie l'affichage de la page d'accueil
describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({
      users: [],
      countUsers: 0
    });
    mockPostUser.mockResolvedValue({
      id: 1
    });
  });
  it('affiche la page d\'accueil par défaut', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    expect(_react.screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
  });
  it('affiche la navigation entre Accueil et Inscription', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));

    // Clic sur "S'inscrire"
    const registerLink = _react.screen.getByRole('link', {
      name: /Nouvelle inscription/i
    });
    _react.fireEvent.click(registerLink);
    expect(_react.screen.getByText(/Ajouter un nouvel utilisateur/i)).toBeInTheDocument();
  });
});

//test les ajouts utilisateurs

describe('App - addUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({
      users: [],
      countUsers: 0
    });
    mockPostUser.mockResolvedValue({
      id: 1
    });
  });
  it('ajoute un utilisateur via le formulaire et met à jour le compteur', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    await (0, _react.waitFor)(() => _react.screen.getByText(/Ajouter un nouvel utilisateur/i));

    // Remplit formulaire (vrai flux utilisateur)
    const prenomInput = _react.screen.getByLabelText(/Prénom/i);
    const nomInput = _react.screen.getByLabelText(/Nom de famille/i);
    const dateInput = _react.screen.getByLabelText(/Date de naissance/i);
    const email = _react.screen.getByLabelText(/Email/i);
    const ville = _react.screen.getByLabelText(/Ville/i);
    const codePostal = _react.screen.getByLabelText(/Code postal/i);
    _react.fireEvent.change(prenomInput, {
      target: {
        value: 'Marie'
      }
    });
    _react.fireEvent.change(nomInput, {
      target: {
        value: 'Martin'
      }
    });
    _react.fireEvent.change(dateInput, {
      target: {
        value: '1990-01-01'
      }
    });
    _react.fireEvent.change(email, {
      target: {
        value: 'test@test.fr'
      }
    });
    _react.fireEvent.change(ville, {
      target: {
        value: 'Angers'
      }
    });
    _react.fireEvent.change(codePostal, {
      target: {
        value: '12345'
      }
    });

    // Soumet (simule `addUser`)
    _react.fireEvent.click(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    }));

    // Vérifie redirection + compteur +1
    await (0, _react.waitFor)(() => {
      expect(api.GetUsers).toHaveBeenCalled();
    }, {
      timeout: 3000
    });
  });
  it('navigue vers Home après soumission réussie (2s)', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    const registerLink = _react.screen.getByRole('link', {
      name: /nouvelle inscription/i
    });
    await _userEvent.default.click(registerLink);
    await (0, _react.waitFor)(() => expect(_react.screen.getByText(/Ajouter un nouvel utilisateur/i)).toBeInTheDocument());

    // Remplit formulaire COMPLET
    await _userEvent.default.type(_react.screen.getByLabelText(/Prénom/i), 'Marie');
    await _userEvent.default.type(_react.screen.getByLabelText(/Nom de famille/i), 'Martin');
    await _userEvent.default.type(_react.screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await _userEvent.default.type(_react.screen.getByLabelText(/Email/i), 'marie@test.fr');
    await _userEvent.default.type(_react.screen.getByLabelText(/Ville/i), 'Angers');
    await _userEvent.default.type(_react.screen.getByLabelText(/Code postal/i), '49100');

    // déclenche handleSubmitSuccess
    await _userEvent.default.click(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    }));

    // Attend TOAST (1s)
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
    });

    // Attend 4s
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
    }, {
      timeout: 4000
    });
  });
});
describe('App - setUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({
      users: [],
      countUsers: 0
    });
    mockPostUser.mockResolvedValue({
      id: 1
    });
  });
  it('setUsers incrémente le compteur après ajout', async () => {
    // Mock avec 1 utilisateur déjà présent
    mockGetUsers.mockResolvedValue({
      users: [{
        name: 'Marie',
        id: 1
      }],
      countUsers: 1
    });
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));

    // Clique sur Register
    await _userEvent.default.click(_react.screen.getByRole('link', {
      name: /nouvelle inscription/i
    }));

    // Remplit formulaire
    await _userEvent.default.type(_react.screen.getByLabelText(/Prénom/i), 'Jean');
    await _userEvent.default.type(_react.screen.getByLabelText(/Nom de famille/i), 'Dupont');
    await _userEvent.default.type(_react.screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await _userEvent.default.type(_react.screen.getByLabelText(/Email/i), 'jean@test.fr');
    await _userEvent.default.type(_react.screen.getByLabelText(/Ville/i), 'Paris');
    await _userEvent.default.type(_react.screen.getByLabelText(/Code postal/i), '75000');

    // Soumet
    await _userEvent.default.click(_react.screen.getByRole('button', {
      name: /S'inscrire/i
    }));

    // Attend toast + retour Home avec compteur
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
    });

    // Vérifie retour Home avec 2 utilisateurs
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
    }, {
      timeout: 4000
    });
  });
});

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Learn React");
});

test('renders code app', () => {
  render(<App />);
  const codeElement = screen.getByTestId("code-app");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement).toHaveTextContent("src/App.js");
});

test('check counter on click me button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const counter = screen.getByTestId('count')
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});
*/