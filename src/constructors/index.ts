import { noPhaseToStart } from "../validators";
import { Game, Player } from "../types";

export const create = ({
	playerNum,
	maxMatchVictories,
}: Pick<Game, "playerNum" | "maxMatchVictories">): Game => ({
	matches: [],
	maxMatchVictories,
	phase: 0,
	phaseTot: Math.sqrt(playerNum),
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
	const max = Math.max(players.length, gameInstance.playerNum);
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
			id: -j + 1,
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

	newInstance.phase++;

	const playersInGame = newInstance.players.filter(
		(player_) => player_.state === "playing"
	);

	for (let i = 0; i < playersInGame.length; i += 2) {
		newInstance.matches.push({
			playerOne: {
				...newInstance.players[i],
				matchScore: 0,
			},
			playerTwo: {
				...newInstance.players[i + 1],
				matchScore: 0,
			},
			phase: newInstance.phase,
			round: 0,
			winnerId: null,
		});
	}

	return newInstance;
};
