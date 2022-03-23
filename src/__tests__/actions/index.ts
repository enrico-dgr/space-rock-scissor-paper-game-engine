import {
	findMatchesByPlayerId,
	findMatchToPlay,
	phaseIsEnded,
} from "../../utils";
import { playBotMatches, playMatch, scrumblePlayers } from "../../actions";
import { create, createMatches, createPlayers } from "../../constructors";
import { Game, Match, Move } from "../../types";
import { getRound } from "../../constants";

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

		expect(match?.currentRound).toBe(2);

		const FIRST_ROUND = {
			moveOne: "paper",
			moveTwo: "rock",
			winnerId: match?.playerOne.id,
		};

		expect(match?.rounds.length).toBe(2);

		expect(match?.rounds).toContainEqual(getRound());

		expect(match?.rounds).toContainEqual(FIRST_ROUND);

		gameInstance = playMatch("scissors", "rock", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(1);

		expect(match?.playerTwo.matchScore).toBe(1);

		expect(match?.phase).toBe(1);

		expect(match?.currentRound).toBe(3);

		const SECOND_ROUND = {
			moveOne: "scissors",
			moveTwo: "rock",
			winnerId: match?.playerTwo.id,
		};

		expect(match?.rounds.length).toBe(3);

		expect(match?.rounds).toContainEqual(getRound());

		expect(match?.rounds).toContainEqual(FIRST_ROUND);

		expect(match?.rounds).toContainEqual(SECOND_ROUND);

		gameInstance = playMatch("scissors", "rock", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(1);

		expect(match?.playerTwo.matchScore).toBe(2);

		expect(match?.phase).toBe(1);

		expect(match?.currentRound).toBe(4);

		const THIRD_ROUND = {
			moveOne: "scissors",
			moveTwo: "rock",
			winnerId: match?.playerTwo.id,
		};

		expect(match?.rounds.length).toBe(4);

		expect(match?.rounds).toContainEqual(getRound());

		expect(match?.rounds).toContainEqual(FIRST_ROUND);

		expect(match?.rounds).toContainEqual(SECOND_ROUND);

		expect(match?.rounds).toContainEqual(THIRD_ROUND);

		gameInstance = playMatch("scissors", "paper", 21, gameInstance);
		match = findMatchToPlay(21, gameInstance);

		expect(match !== undefined).toBeTruthy();

		expect(match?.playerOne.matchScore).toBe(2);

		expect(match?.playerTwo.matchScore).toBe(2);

		expect(match?.phase).toBe(1);

		expect(match?.currentRound).toBe(5);

		const FOURTH_ROUND = {
			moveOne: "scissors",
			moveTwo: "paper",
			winnerId: match?.playerOne.id,
		};

		expect(match?.rounds.length).toBe(5);

		expect(match?.rounds).toContainEqual(getRound());

		expect(match?.rounds).toContainEqual(FIRST_ROUND);

		expect(match?.rounds).toContainEqual(SECOND_ROUND);

		expect(match?.rounds).toContainEqual(THIRD_ROUND);

		expect(match?.rounds).toContainEqual(FOURTH_ROUND);

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

		expect(match?.currentRound).toBe(5);

		const FIFTH_ROUND = {
			moveOne: "scissors",
			moveTwo: "paper",
			winnerId: match?.playerOne.id,
		};

		expect(match?.rounds.length).toBe(5);

		expect(match?.rounds).toContainEqual(FIRST_ROUND);

		expect(match?.rounds).toContainEqual(SECOND_ROUND);

		expect(match?.rounds).toContainEqual(THIRD_ROUND);

		expect(match?.rounds).toContainEqual(FOURTH_ROUND);

		expect(match?.rounds).toContainEqual(FIFTH_ROUND);
	});

	it("Play bot matches", () => {
		let botGame = create({ playerNum: 16, maxMatchVictories: 4 });
		botGame = createPlayers(
			[
				{
					name: "Enrico",
					id: 89,
				},
			],
			botGame
		);
		botGame.players = scrumblePlayers(botGame.players);
		botGame = createMatches(botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();

		botGame = playBotMatches(botGame);

		let match = findMatchToPlay(89, botGame);

		expect(match !== undefined).toBeTruthy();

		let moveOne: Move | null = null;
		let moveTwo: Move | null = null;
		if (match?.playerOne.id === 89) {
			moveOne = "scissors";
			moveTwo = "paper";
		} else {
			moveOne = "paper";
			moveTwo = "scissors";
		}

		botGame = playMatch(moveOne, moveTwo, 89, botGame);
		botGame = playMatch(moveOne, moveTwo, 89, botGame);
		botGame = playMatch(moveOne, moveTwo, 89, botGame);
		botGame = playMatch(moveOne, moveTwo, 89, botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();

		botGame = playBotMatches(botGame);

		console.log(botGame.matches);
		expect(findMatchToPlay(89, botGame) !== undefined).toBeTruthy();
	});
});
