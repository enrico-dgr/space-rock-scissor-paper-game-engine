import { findMatchesByPlayerId, findMatchToPlay } from "../../utils";
import { playMatch, scrumblePlayers } from "../../actions";
import { create, createMatches, createPlayers } from "../../constructors";
import { Game, Match } from "../../types";

describe("Actions", () => {
	let playerNum: Game["playerNum"] = 8;
	let maxMatchVictories: number = 3;
	let gameInstance: Game = create({ playerNum, maxMatchVictories });

	it("Scrumble players", () => {
		gameInstance = createPlayers(
			[
				{
					name: "Enrico",
					id: 89,
				},
				{
					name: "Andonio",
					id: 21,
				},
				{
					name: "Emilio",
					id: 1900,
				},
			],
			gameInstance
		);

		gameInstance.players = scrumblePlayers(gameInstance.players);

		expect(gameInstance.players).toContainEqual({
			name: "Enrico",
			id: 89,
			score: 0,
			state: "playing",
			type: "human",
		});
		expect(gameInstance.players).toContainEqual({
			name: "Andonio",
			id: 21,
			score: 0,
			state: "playing",
			type: "human",
		});
		expect(gameInstance.players).toContainEqual({
			name: "Emilio",
			id: 1900,
			score: 0,
			state: "playing",
			type: "human",
		});
		expect(gameInstance.players).toContainEqual({
			id: -1,
			name: `Bot1`,
			score: 0,
			state: "playing",
			type: "bot",
		});
		expect(gameInstance.players).toContainEqual({
			id: -2,
			name: `Bot2`,
			score: 0,
			state: "playing",
			type: "bot",
		});
		expect(gameInstance.players).toContainEqual({
			id: -3,
			name: `Bot3`,
			score: 0,
			state: "playing",
			type: "bot",
		});
		expect(gameInstance.players).toContainEqual({
			id: -4,
			name: `Bot4`,
			score: 0,
			state: "playing",
			type: "bot",
		});
		expect(gameInstance.players).toContainEqual({
			id: -5,
			name: `Bot5`,
			score: 0,
			state: "playing",
			type: "bot",
		});
	});

	it("Play match", () => {
		let match: Match | undefined;

		gameInstance = createMatches(gameInstance);
		gameInstance = playMatch("paper", "rock", 21, gameInstance);

		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(1);

		expect(match?.playerTwo.matchScore).toBe(0);

		expect(match?.phase).toBe(1);

		expect(match?.round).toBe(1);

		gameInstance = playMatch("scissors", "rock", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(1);

		expect(match?.playerTwo.matchScore).toBe(1);

		expect(match?.phase).toBe(1);

		expect(match?.round).toBe(2);

		gameInstance = playMatch("scissors", "rock", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(1);

		expect(match?.playerTwo.matchScore).toBe(2);

		expect(match?.phase).toBe(1);

		expect(match?.round).toBe(3);

		gameInstance = playMatch("scissors", "paper", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(2);

		expect(match?.playerTwo.matchScore).toBe(2);

		expect(match?.phase).toBe(1);

		expect(match?.round).toBe(4);

		gameInstance = playMatch("scissors", "paper", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match).toBeUndefined();

		const matches = findMatchesByPlayerId(21, gameInstance);

		match = matches.length > 0 ? matches[0] : undefined;

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(3);

		expect(match?.playerTwo.matchScore).toBe(2);

		expect(typeof match?.winnerId === "number").toBeTruthy();

		expect(match?.phase).toBe(1);

		expect(match?.round).toBe(5);
	});
});
