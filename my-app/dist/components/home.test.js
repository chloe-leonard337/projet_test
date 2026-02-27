"use strict";

var _react = require("@testing-library/react");
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("./Home"));
var api = _interopRequireWildcard(require("../api"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('../api');
const mockGetUsers = api.GetUsers;
const mockUsers = [{
  id: 1,
  name: 'Marie Martin',
  email: 'marie@test.fr',
  dob: '1990-01-01',
  username: 'mariemartin',
  address: {
    city: 'Angers'
  },
  postalCode: '49100'
}];
describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockGetUsers.mockResolvedValue({
      users: mockUsers,
      countUsers: 1
    });
  });
  afterEach(() => {
    (0, _react.cleanup)();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  it('affiche le titre principal', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    expect(_react.screen.getByText('Bienvenue sur votre annuaire !')).toBeInTheDocument();
  });
  it('affiche le lien nouvelle inscription', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    expect(_react.screen.getByRole('link', {
      name: /nouvelle inscription/i
    })).toBeInTheDocument();
  });
  it('useEffect console.log(saved, saved.length)', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => {
      expect(mockGetUsers).toHaveBeenCalledTimes(1);
    });
    expect(consoleSpy).toHaveBeenCalledWith({
      users: mockUsers,
      countUsers: 1
    }, 1);
    consoleSpy.mockRestore();
  });
  it('useEffect setLocalUsers + setLocalCount', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText('Liste des inscrits (1)')).toBeInTheDocument();
      expect(_react.screen.getByText('mariemartin')).toBeInTheDocument();
    });
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });
  it('setInterval toutes les 2s', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
    jest.advanceTimersByTime(2000);
    await (0, _react.waitFor)(() => expect(mockGetUsers).toHaveBeenCalledTimes(2));
    jest.advanceTimersByTime(2000);
    await (0, _react.waitFor)(() => expect(mockGetUsers).toHaveBeenCalledTimes(3));
  });
  it('clearInterval au démontage', async () => {
    const {
      unmount
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
    unmount();
    jest.advanceTimersByTime(4000);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });
  it('calcule âge depuis dob', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => _react.screen.getByText('Liste des inscrits (1)'));
    expect(_react.screen.getByText('36')).toBeInTheDocument();
  });
  it('affiche "Aucun inscrit" si vide', async () => {
    mockGetUsers.mockResolvedValueOnce({
      users: [],
      countUsers: 0
    });
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    expect(_react.screen.getByText('Aucun inscrit pour le moment')).toBeInTheDocument();
  });
  it('gère erreur API', async () => {
    mockGetUsers.mockRejectedValueOnce(new Error('API down'));
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText('Aucun inscrit pour le moment')).toBeInTheDocument();
    }, {
      timeout: 3000
    });
  });
  it('tableau avec TOUS les en-têtes', async () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => _react.screen.getByText('Liste des inscrits (1)'));
    expect(_react.screen.getByRole('columnheader', {
      name: 'Pseudo'
    })).toBeInTheDocument();
    expect(_react.screen.getByRole('columnheader', {
      name: 'Nom'
    })).toBeInTheDocument();
    expect(_react.screen.getByRole('columnheader', {
      name: 'Email'
    })).toBeInTheDocument();
    expect(_react.screen.getByRole('columnheader', {
      name: 'Âge'
    })).toBeInTheDocument();
    expect(_react.screen.getByRole('columnheader', {
      name: 'Ville'
    })).toBeInTheDocument();
    expect(_react.screen.getByRole('columnheader', {
      name: 'CP'
    })).toBeInTheDocument();
  });
  it('map localUsers avec key=user.timestamp', async () => {
    const userWithTimestamp = _objectSpread(_objectSpread({}, mockUsers[0]), {}, {
      timestamp: Date.now()
    });
    mockGetUsers.mockResolvedValue({
      users: [userWithTimestamp],
      countUsers: 1
    });
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
    }));
    await (0, _react.waitFor)(() => expect(_react.screen.getByText('mariemartin')).toBeInTheDocument());
  });
});