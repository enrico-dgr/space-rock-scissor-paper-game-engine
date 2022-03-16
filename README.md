# Space Rock Scissor Paper Game Engine

## Description

The game engine let create a game in steps:

1. Create game instance specifying number of players ( 2 - 4 - 8 - 16 )

2. Add players by specifying the names ( humans only. Missing players will be replaced by bots )

3. Set number of victories needed for a match

After data settings, you can start the game with the first two players.  
Players will play rounds until the needed score for a match is reached.
Every win will determine player's position in tournament.

## Usage

```js
import * as GE from "space-rock-scissor-paper-game-engine";
```
