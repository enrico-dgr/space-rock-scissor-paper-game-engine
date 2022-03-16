import * as _types from "../types";
import { createMatches } from "../constructors";

/**
 * @param { Player[] } players
 */
const scrumble = (players) => {
	const newPlayers = [...players];

	for (let i = newPlayers.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = newPlayers[i];
		newPlayers[i] = newPlayers[j];
		newPlayers[j] = temp;
	}

	return newPlayers;
};

/**
 * @param { Game } gameInstance
 */
export const start = (gameInstance) => createMatches(gameInstance);

/**
 * @param { Move } moveOne
 * @param { Move } moveTwo
 * @return { [ number, number ] } A tuple containing respectively
 * the results of player one and player two.
 */
const evaluateRound = (moveOne, moveTwo) => {
	if (moveOne === moveTwo) {
		return [0, 0];
	}

	if (
		(moveOne === "rock" && moveTwo === "scissors") ||
		(moveOne === "scissors" && moveTwo === "paper") ||
		(moveOne === "paper" && moveTwo === "rock")
	) {
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
export const playMatch = (moveOne, moveTwo, withPlayerName, gameInstance) => {
	// find the match to play
	const matchIndex = gameInstance.matches.findIndex(
		(match) =>
			(match.playerOne.name === withPlayerName ||
				match.playerTwo.name === withPlayerName) &&
			match.winner !== ""
	);

	if (matchIndex < 0) {
		return gameInstance;
	}

	const newInstance = { ...gameInstance };
	const result = evaluateRound(moveOne, moveTwo);

	// update match scores
	const scoreOne = (newInstance.matches[matchIndex].playerOne.matchScore +=
		result[0]);
	const scoreTwo = (newInstance.matches[matchIndex].playerTwo.matchScore +=
		result[1]);

	// look if someone won the match
	if (newInstance.maxMatchVictories === scoreOne) {
		newInstance.matches[matchIndex].winner =
			newInstance.matches[matchIndex].playerOne.name;
	} else if (newInstance.maxMatchVictories === scoreTwo) {
		newInstance.matches[matchIndex].winner =
			newInstance.matches[matchIndex].playerTwo.name;
	}

	return newInstance;
};
