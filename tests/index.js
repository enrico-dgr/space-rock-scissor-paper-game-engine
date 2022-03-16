const dist = require("../dist").default;

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
