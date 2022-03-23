import { findIndexMatchToPlay } from "../utils";
import { Game, Move, Player, Round } from "../types";
import { ROUND } from "../constants";

/**
 * @param players
 * @return
 */
export const scrumblePlayers = (players: Player[]): Player[] => {
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
 * @param moveOne
 * @param moveTwo
 * @return A tuple containing respectively
 * the results of player one and player two.
 */
const evaluateRound = (moveOne: Move, moveTwo: Move): [number, number] => {
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
 * @param moveOne
 * @param moveTwo
 * @param playerId one of the two players' id
 * @param gameInstance
 */
export const playMatch = (
	moveOne: Move,
	moveTwo: Move,
	playerId: number,
	gameInstance: Game
) => {
	// find the match to play
	const matchIndex = findIndexMatchToPlay(playerId, gameInstance);

	if (matchIndex < 0) {
		return gameInstance;
	}

	const newInstance = { ...gameInstance };
	const result = evaluateRound(moveOne, moveTwo);
	const round: Round =
		newInstance.matches[matchIndex].rounds[
			newInstance.matches[matchIndex].rounds.length - 1
		];
	round.moveOne = moveOne;
	round.moveTwo = moveTwo;

	// set round winner
	if (result[0] === 1) {
		// playerOne wins the round
		round.winnerId = newInstance.matches[matchIndex].playerOne.id;
	} else if (result[1] === 1) {
		// playerTwo wins the round
		round.winnerId = newInstance.matches[matchIndex].playerTwo.id;
	} // else: draw

	// update match scores
	const scoreOne = (newInstance.matches[matchIndex].playerOne.matchScore +=
		result[0]);
	const scoreTwo = (newInstance.matches[matchIndex].playerTwo.matchScore +=
		result[1]);

	// look if someone won the match
	if (newInstance.maxMatchVictories === scoreOne) {
		// set winner
		newInstance.matches[matchIndex].winnerId =
			newInstance.matches[matchIndex].playerOne.id;
		// set loser
		const loser = newInstance.players.find(
			(player_) => player_.id === newInstance.matches[matchIndex].playerTwo.id
		);
		if (!!loser) loser.state = "lost";
	} else if (newInstance.maxMatchVictories === scoreTwo) {
		// set winner
		newInstance.matches[matchIndex].winnerId =
			newInstance.matches[matchIndex].playerTwo.id;
		// set loser
		const loser = newInstance.players.find(
			(player_) => player_.id === newInstance.matches[matchIndex].playerOne.id
		);
		if (!!loser) loser.state = "lost";
	} else {
		// another round
		newInstance.matches[matchIndex].rounds.push(ROUND);
		newInstance.matches[matchIndex].currentRound++;
	}

	// if someone won, add a point to personal score.
	if (!!newInstance.matches[matchIndex].winnerId) {
		const player = newInstance.players.find(
			(player_) => player_.id === newInstance.matches[matchIndex].winnerId
		);
		!!player && player.score++;
	}

	// if phases ended, set winner by last match winner
	if (newInstance.players.filter((pl) => pl.state !== "lost").length === 1) {
		newInstance.winnerId = newInstance.matches[matchIndex].winnerId;
	}

	return newInstance;
};
