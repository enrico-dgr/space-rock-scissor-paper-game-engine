import * as _types from "../types";

/**
 * @param { {} }
 * @returns { Game }
 */
export const create = ({ playerNum, maxMatchVictories }) => ({
	matches: [],
	maxMatchVictories,
	players: [],
	playerNum,
});

/**
 * @param { string[] } names
 * @param { Game } gameInstance
 * @returns { Game }
 */
export const createPlayers = (names, gameInstance) => {
	/**
	 * @type { Player[] }
	 */
	const players = [];

	// add humans
	const max = Math.max(names.length, gameInstance.playerNum);
	for (let i = 0; i < max; i++) {
		players.push({
			name: names[i],
			score: 0,
			type: "human",
		});
	}

	// add bots
	const numOfBots = gameInstance.playerNum - names.length;
	for (let j = 0; j < numOfBots; j++) {
		players.push({
			name: `Bot${j + 1}`,
			score: 0,
			type: "bot",
		});
	}

	return {
		...gameInstance,
		players,
	};
};

/**
 * @param { Game } gameInstance
 * @return { Game }
 */
export const createMatches = (gameInstance) => {
	const newInstance = { ...gameInstance };

	for (let i = 0; i < newInstance.players.length; i += 2) {
		newInstance.matches.push({
			playerOne: {
				...newInstance.players[i],
				matchScore: 0,
			},
			playerTwo: {
				...newInstance.players[i + 1],
				matchScore: 0,
			},
			round: 0,
			winner: "",
		});
	}

	return newInstance;
};
