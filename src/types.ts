export type Move = "rock" | "scissors" | "paper";

export type Player = {
	name: string;
	score: number;
	type: "human" | "bot";
};

type MatchPlayerInfo = {
	matchScore: number;
};

export type Match = {
	playerOne: Pick<Player, "name" | "type"> & MatchPlayerInfo;
	playerTwo: Pick<Player, "name" | "type"> & MatchPlayerInfo;
	round: number;
	winner: string;
};

export type Game = {
	matches: Match[];
	maxMatchVictories: number;
	players: Player[];
	playerNum: 2 | 4 | 8 | 16;
};
