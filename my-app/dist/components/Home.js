"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
require("react-toastify/dist/ReactToastify.css");
var _reactRouterDom = require("react-router-dom");
require("./Home.css");
var _api = require("../api");
var _jsxRuntime = require("react/jsx-runtime");
const Home = _ref => {
  let {
    users,
    userCount
  } = _ref;
  const [localUsers, setLocalUsers] = (0, _react.useState)([]);
  const [localCount, setLocalCount] = (0, _react.useState)(0);
  // Styles pour le tableau (à ajouter en haut du composant)
  const tableHeaderStyle = {
    padding: '8px 6px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.75em',
    borderRight: '1px solid rgba(255,255,255,0.2)'
  };
  const tableCellStyle = {
    padding: '8px',
    fontSize: '0.6em',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    verticalAlign: 'middle'
  };
  (0, _react.useEffect)(() => {
    const loadUsers = async () => {
      const saved = await (0, _api.GetUsers)();
      setLocalUsers(saved.users);
      setLocalCount(saved.countUsers);
      console.log(saved, saved.length);
    };
    loadUsers();
    const interval = setInterval(loadUsers, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "Home",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("header", {
      className: "Home-header",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: "Bienvenue sur votre annuaire !"
      })
    }), localUsers.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        margin: '20px 0',
        overflowX: 'auto'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
        style: {
          marginBottom: '15px',
          color: '#61dafb'
        },
        children: ["Liste des inscrits (", localCount, ")"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
        style: {
          width: '100%',
          borderCollapse: 'collapse',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
            style: {
              background: '#61dafb',
              color: '#282c34'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "Pseudo"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "Nom"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "Email"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "\xC2ge"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "Ville"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
              style: tableHeaderStyle,
              children: "CP"
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
          children: localUsers.map((user, index) => {
            const age = user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : 'N/A';
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
              style: {
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.05)'
                }
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: user.username
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: user.name
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  style: {
                    fontSize: '0.9em'
                  },
                  children: user.email
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: age
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
                  children: user.address.city
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                style: tableCellStyle,
                children: user.postalCode
              })]
            }, user.timestamp || index);
          })
        })]
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: {
        color: 'rgba(255,255,255,0.7)',
        fontStyle: 'italic'
      },
      children: "Aucun inscrit pour le moment"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
      className: "Home-button",
      to: "/register",
      children: "nouvelle inscription"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {})]
  });
};
var _default = exports.default = Home;