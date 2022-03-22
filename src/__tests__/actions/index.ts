import { scrumblePlayers } from "../../actions";
import { create, createPlayers } from "../../constructors";
import { Game } from "../../types";

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
});
