"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _Form = _interopRequireDefault(require("../Form"));
require("./Home.css");
var _api = require("../api");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Register() {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [error, setError] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(false);
  const handleSubmitSuccess = async userData => {
    setLoading(true);
    setError(null);
    try {
      await (0, _api.PostUser)(userData);
      _reactToastify.toast.success('Inscription réussie !');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      var _err$response, _err$response2;
      console.error('Erreur inscription:', err);
      let errorMessage = 'Une erreur est survenue';
      if (((_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 400) {
        var _err$response$data;
        errorMessage = ((_err$response$data = err.response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.message) || 'Email invalide ou déjà utilisé';
      } else if (((_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status) === 500) {
        errorMessage = 'Erreur serveur, veuillez réessayez plus tard.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Problème de connexion. Vérifiez votre réseau.';
      } else {
        errorMessage = err.message || 'Erreur inattendue';
      }
      setError(errorMessage);
      _reactToastify.toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("header", {
      className: "Home-header",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: "Ajouter un nouvel utilisateur"
      })
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "error-alert",
      style: {
        color: 'red',
        padding: '1rem',
        background: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        marginBottom: '1rem'
      },
      children: ["\u274C ", error]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {
      onSubmitSuccess: handleSubmitSuccess,
      loading: loading
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light"
    })]
  });
}
var _default = exports.default = Register;