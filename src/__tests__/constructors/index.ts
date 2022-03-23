import { playBotMatches, scrumblePlayers } from "../../actions";
import { phaseIsEnded, checkPhaseStateAndUpdate } from "../../utils";
import { create, createMatches, createPlayers } from "../../constructors";
import { Game } from "../../types";

describe("Constructors", () => {
	let gameInstance: Game;

	let playerNum: Game["playerNum"];
	let maxMatchVictories: number;

	it("Create game instance - playerNum: 2", () => {
		playerNum = 2;
		maxMatchVictories = 3;
		gameInstance = create({ playerNum, maxMatchVictories });

		expect(gameInstance).toEqual({
			matches: [],
			maxMatchVictories,
			phase: 0,
			phaseTot: 1,
			players: [],
			playerNum,
			winnerId: null,
		});
	});

	it("Create game instance - playerNum: 16", () => {
		playerNum = 16;
		maxMatchVictories = 3;
		gameInstance = create({ playerNum, maxMatchVictories });

		expect(gameInstance).toEqual({
			matches: [],
			maxMatchVictories,
			phase: 0,
			phaseTot: 4,
			players: [],
			playerNum,
			winnerId: null,
		});
	});

	it("Create game instance - playerNum: 8", () => {
		playerNum = 8;
		maxMatchVictories = 3;
		gameInstance = create({ playerNum, maxMatchVictories });

		expect(gameInstance).toEqual({
			matches: [],
			maxMatchVictories,
			phase: 0,
			phaseTot: 3,
			players: [],
			playerNum,
			winnerId: null,
		});
	});

	it("Create players", () => {
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

		expect(gameInstance.players.length).toBe(8);

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

	it("Create matches", () => {
		gameInstance = createMatches(gameInstance);

		expect(gameInstance.matches).toContainEqual({
			playerOne: {
				name: gameInstance.players[0].name,
				type: gameInstance.players[0].type,
				id: gameInstance.players[0].id,
				matchScore: 0,
			},
			playerTwo: {
				name: gameInstance.players[1].name,
				type: gameInstance.players[1].type,
				id: gameInstance.players[1].id,
				matchScore: 0,
			},
			phase: 1,
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
		expect(gameInstance.matches).toContainEqual({
			playerOne: {
				name: gameInstance.players[2].name,
				type: gameInstance.players[2].type,
				id: gameInstance.players[2].id,
				matchScore: 0,
			},
			playerTwo: {
				name: gameInstance.players[3].name,
				type: gameInstance.players[3].type,
				id: gameInstance.players[3].id,
				matchScore: 0,
			},
			phase: 1,
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
		expect(gameInstance.matches).toContainEqual({
			playerOne: {
				name: gameInstance.players[4].name,
				type: gameInstance.players[4].type,
				id: gameInstance.players[4].id,
				matchScore: 0,
			},
			playerTwo: {
				name: gameInstance.players[5].name,
				type: gameInstance.players[5].type,
				id: gameInstance.players[5].id,
				matchScore: 0,
			},
			phase: 1,
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
		expect(gameInstance.matches).toContainEqual({
			playerOne: {
				name: gameInstance.players[6].name,
				type: gameInstance.players[6].type,
				id: gameInstance.players[6].id,
				matchScore: 0,
			},
			playerTwo: {
				name: gameInstance.players[7].name,
				type: gameInstance.players[7].type,
				id: gameInstance.players[7].id,
				matchScore: 0,
			},
			phase: 1,
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
	});

	it("Game phases", () => {
		let botGame = create({ playerNum: 16, maxMatchVictories: 4 });
		botGame = createPlayers([], botGame);
		botGame.players = scrumblePlayers(botGame.players);
		botGame = createMatches(botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();
		expect(botGame.phase).toBe(1);

		botGame = playBotMatches(botGame);
		botGame = checkPhaseStateAndUpdate(botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();
		expect(botGame.phase).toBe(2);

		botGame = playBotMatches(botGame);
		botGame = checkPhaseStateAndUpdate(botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();
		expect(botGame.phase).toBe(3);

		botGame = playBotMatches(botGame);
		botGame = checkPhaseStateAndUpdate(botGame);

		expect(phaseIsEnded(botGame)).toBeFalsy();
		expect(botGame.phase).toBe(4);

		botGame = playBotMatches(botGame);
		botGame = checkPhaseStateAndUpdate(botGame);

		expect(phaseIsEnded(botGame)).toBeTruthy();
		expect(botGame.phase).toBe(4);
	});
});
