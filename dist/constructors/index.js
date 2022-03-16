"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createPlayers = exports.createMatches = exports.create = void 0;

var _types = _interopRequireWildcard(require("../types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param { {} }
 * @returns { Game }
 */
var create = function create(_ref) {
  var playerNum = _ref.playerNum,
      maxMatchVictories = _ref.maxMatchVictories;
  return {
    matches: [],
    maxMatchVictories: maxMatchVictories,
    players: [],
    playerNum: playerNum
  };
};
/**
 * @param { string[] } names
 * @param { Game } gameInstance
 * @returns { Game }
 */


exports.create = create;

var createPlayers = function createPlayers(names, gameInstance) {
  /**
   * @type { Player[] }
   */
  var players = []; // add humans

  var max = Math.max(names.length, gameInstance.playerNum);

  for (var i = 0; i < max; i++) {
    players.push({
      name: names[i],
      score: 0,
      type: "human"
    });
  } // add bots


  var numOfBots = gameInstance.playerNum - names.length;

  for (var j = 0; j < numOfBots; j++) {
    players.push({
      name: "Bot".concat(j + 1),
      score: 0,
      type: "bot"
    });
  }

  return _objectSpread(_objectSpread({}, gameInstance), {}, {
    players: players
  });
};
/**
 * @param { Game } gameInstance
 * @return { Game }
 */


exports.createPlayers = createPlayers;

var createMatches = function createMatches(gameInstance) {
  var newInstance = _objectSpread({}, gameInstance);

  for (var i = 0; i < newInstance.players.length; i += 2) {
    newInstance.matches.push({
      playerOne: _objectSpread(_objectSpread({}, newInstance.players[i]), {}, {
        matchScore: 0
      }),
      playerTwo: _objectSpread(_objectSpread({}, newInstance.players[i + 1]), {}, {
        matchScore: 0
      }),
      round: 0,
      winner: ""
    });
  }

  return newInstance;
};

exports.createMatches = createMatches;
var _default = {
  create: create,
  createPlayers: createPlayers,
  createMatches: createMatches
};
exports["default"] = _default;