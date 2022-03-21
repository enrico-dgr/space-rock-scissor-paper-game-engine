export type Move = "rock" | "scissors" | "paper";

export type Player = {
	id: number;
	name: string;
	score: number;
	state: "lost" | "playing" | "won";
	type: "human" | "bot";
};

type MatchPlayerInfo = {
	matchScore: number;
};

export type Match = {
	playerOne: Pick<Player, "name" | "id" | "type"> & MatchPlayerInfo;
	playerTwo: Pick<Player, "name" | "id" | "type"> & MatchPlayerInfo;
	phase: number;
	round: number;
	winnerId: number | null;
};

export type Game = {
	matches: Match[];
	maxMatchVictories: number;
	phase: number;
	phaseTot: number;
	players: Player[];
	playerNum: 2 | 4 | 8 | 16;
	winnerId: number | null;
};
