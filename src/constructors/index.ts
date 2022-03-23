import { noPhaseToStart } from "../validators";
import { Game, Player } from "../types";

export const create = ({
	playerNum,
	maxMatchVictories,
}: Pick<Game, "playerNum" | "maxMatchVictories">): Game => ({
	matches: [],
	maxMatchVictories,
	phase: 0,
	phaseTot: Math.log2(playerNum),
	players: [],
	playerNum,
	winnerId: null,
});

export const createPlayers = (
	players: Pick<Player, "id" | "name">[],
	gameInstance: Game
): Game => {
	const playersAll: Player[] = [];

	// add humans
	const max = Math.min(players.length, gameInstance.playerNum);
	for (let i = 0; i < max; i++) {
		playersAll.push({
			...players[i],
			score: 0,
			state: "playing",
			type: "human",
		});
	}

	// add bots
	const numOfBots = gameInstance.playerNum - players.length;
	for (let j = 0; j < numOfBots; j++) {
		playersAll.push({
			id: -j - 1,
			name: `Bot${j + 1}`,
			score: 0,
			state: "playing",
			type: "bot",
		});
	}

	return {
		...gameInstance,
		players: playersAll,
	};
};

export const createMatches = (gameInstance: Game): Game => {
	if (noPhaseToStart(gameInstance)) {
		return gameInstance;
	}

	const newInstance = { ...gameInstance };

	// each creation of matches is equal to the begin of a phase
	newInstance.phase++;

	const playersInGame = newInstance.players
		.filter((player_) => player_.state === "playing")
		.map((player_) => ({
			name: player_.name,
			id: player_.id,
			type: player_.type,
		}));

	for (let i = 0; i < playersInGame.length; i += 2) {
		newInstance.matches.push({
			playerOne: {
				...playersInGame[i],
				matchScore: 0,
			},
			playerTwo: {
				...playersInGame[i + 1],
				matchScore: 0,
			},
			phase: newInstance.phase,
			currentRound: 1,
			rounds: [
				{
					moveOne: null,
					moveTwo: null,
					winnerId: null,
				},
			],
			winnerId: null,
		});
	}

	return newInstance;
};
