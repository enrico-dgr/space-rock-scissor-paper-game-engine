"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playMatch = exports["default"] = void 0;

var _types = _interopRequireWildcard(require("../types"));

var _constructors = require("../constructors");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @param { Player[] } players
 */
var scrumble = function scrumble(players) {
  var newPlayers = _toConsumableArray(players);

  for (var i = newPlayers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = newPlayers[i];
    newPlayers[i] = newPlayers[j];
    newPlayers[j] = temp;
  }

  return newPlayers;
};
/**
 * @param { Move } moveOne
 * @param { Move } moveTwo
 * @return { [ number, number ] } A tuple containing respectively
 * the results of player one and player two.
 */


var evaluateRound = function evaluateRound(moveOne, moveTwo) {
  if (moveOne === moveTwo) {
    return [0, 0];
  }

  if (moveOne === "rock" && moveTwo === "scissors" || moveOne === "scissors" && moveTwo === "paper" || moveOne === "paper" && moveTwo === "rock") {
    return [1, 0];
  }

  return [0, 1];
};
/**
 * @param { Move } moveOne
 * @param { Move } moveTwo
 * @param { string } withPlayerName
 * @param { Game } gameInstance
 */


var playMatch = function playMatch(moveOne, moveTwo, withPlayerName, gameInstance) {
  // find the match to play
  var matchIndex = gameInstance.matches.findIndex(function (match) {
    return (match.playerOne.name === withPlayerName || match.playerTwo.name === withPlayerName) && match.winner !== "";
  });

  if (matchIndex < 0) {
    return gameInstance;
  }

  var newInstance = _objectSpread({}, gameInstance);

  var result = evaluateRound(moveOne, moveTwo); // update match scores

  var scoreOne = newInstance.matches[matchIndex].playerOne.matchScore += result[0];
  var scoreTwo = newInstance.matches[matchIndex].playerTwo.matchScore += result[1]; // look if someone won the match

  if (newInstance.maxMatchVictories === scoreOne) {
    newInstance.matches[matchIndex].winner = newInstance.matches[matchIndex].playerOne.name;
  } else if (newInstance.maxMatchVictories === scoreTwo) {
    newInstance.matches[matchIndex].winner = newInstance.matches[matchIndex].playerTwo.name;
  }

  return newInstance;
};

exports.playMatch = playMatch;
var _default = {
  playMatch: playMatch
};
exports["default"] = _default;