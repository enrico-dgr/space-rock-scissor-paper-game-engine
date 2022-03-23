import { Move, Round } from "../types";

export const MOVES: Move[] = ["paper", "rock", "scissors"];

export const getRound = (): Round => ({
	moveOne: null,
	moveTwo: null,
	winnerId: null,
});
