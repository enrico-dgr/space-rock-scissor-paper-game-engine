/**
 * @typedef { 'rock' | 'scissors' | 'paper' } Move
 */

/**
 * @typedef { {
 *  name: string;
 *  score: number;
 *  type: "human" | "bot"
 * } } Player
 */

/**
 * @typedef { { matchScore: number; } } MatchPlayerInfo
 */

/**
 * @typedef { {
 *  playerOne: Player & MatchPlayerInfo;
 *  playerTwo: Player & MatchPlayerInfo;
 *  round: number;
 *  winner: string;
 * } } Match
 */

/**
 * @typedef { {
 *  matches: Match[];
 *  maxMatchVictories: number;
 *  players: Player[];
 *  playerNum: 2 | 4 | 8 | 16;
 * } } Game
 */
