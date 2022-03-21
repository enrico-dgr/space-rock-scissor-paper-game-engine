import { Game } from "src/types";

export const noMatchToPlay = (game: Game) =>
	game.matches.findIndex((m) => m.winnerId === null) < 0;

export const noPhaseToStart = (game: Game) => game.phase === game.phaseTot;
