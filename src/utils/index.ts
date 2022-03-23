import { MOVES } from "../constants";
import { Game, Match } from "../types";

/**
 *
 * @param playerId
 * @param gameInstance
 * @returns The instance of the match or undefined
 */
export const findMatchToPlay = (
	playerId: number,
	gameInstance: Game
): Match | undefined =>
	gameInstance.matches.find(
		(m) =>
			(m.playerOne.id === playerId || m.playerTwo.id === playerId) &&
			m.winnerId === null
	);

export const findIndexMatchToPlay = (
	playerId: number,
	gameInstance: Game
): number =>
	gameInstance.matches.findIndex(
		(m) =>
			(m.playerOne.id === playerId || m.playerTwo.id === playerId) &&
			m.winnerId === null
	);

/**
 *
 * @param playerId
 * @param gameInstance
 * @returns The instance of the match or undefined
 */
export const findMatchesByPlayerId = (
	playerId: number,
	gameInstance: Game
): Match[] =>
	gameInstance.matches.filter(
		(m) => m.playerOne.id === playerId || m.playerTwo.id === playerId
	);

/**
 *
 * @param playerId
 * @param otherPlayerId
 * @param gameInstance
 * @returns The instance of the match or undefined
 */
export const findMatch = (
	playerId: number,
	otherPlayerId: number,
	gameInstance: Game
): Match | undefined =>
	gameInstance.matches.find(
		(m) =>
			(m.playerOne.id === playerId || m.playerTwo.id === playerId) &&
			(m.playerOne.id === otherPlayerId || m.playerTwo.id === otherPlayerId)
	);

export const getRandomMove = () => MOVES[Math.floor(Math.random() * 3)];

export const phaseIsEnded = (gameInstance: Game): boolean =>
	gameInstance.matches.findIndex((m) => m.winnerId === null) > -1;
