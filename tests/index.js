import dist from "../dist";

/**
 *
 * @param { any } input
 * @param { () => undefined } functionName
 * @param { any } expectedResult
 */
const test = (input, functionName, expectedResult) => {
	const res = functionName(input);

	console.log("input: ", input);
	console.log("functionName: ", functionName.name);
	console.log("output: ", res);
	console.log("expectedResult: ", expectedResult);
	console.log("------");

	return expectedResult;
};
const inputCreate = { playerNum: 2, maxMatchVictories: 2 };
dist.create(inputCreate);
test(inputCreate, dist.create, {});
