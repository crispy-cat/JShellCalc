// JShellCalc v1.2
// by crispycat

var Operations = {
	Addition: {
		names: ["addition", "add", "plus", "sum"],
		operands: ["left", "right"],
		func: function(operands) {
			return operands.left + operands.right;
		}
	},

	Subtraction: {
		names: ["subtraction", "sub", "minus", "difference", "diff"],
		operands: ["left", "right"],
		func: function(operands) {
			return operands.left - operands.right;
		}
	},

	Multiplication: {
		names: ["multiplication", "mul", "times", "product"],
		operands: ["left", "right"],
		func: function(operands) {
			return operands.left * operands.right;
		}
	},

	Division: {
		names: ["division", "div", "quotient", "quot"],
		operands: ["dividend", "divisor"],
		func: function(operands) {
			return operands.dividend / operands.divisor;
		}
	},

	Modulo: {
		names: ["modulo", "mod", "remainder", "rem"],
		operands: ["dividend", "divisor"],
		func: function(operands) {
			return operands.dividend % operands.divisor;
		}
	},

	Exponentiation: {
		names: ["exponentiation", "exp", "power", "pow"],
		operands: ["base", "power"],
		func: function(operands) {
			return operands.base ** operands.power;
		}
	},

	Root: {
		names: ["root", "radical"],
		operands: ["x", "base"],
		func: function(operands) {
			if (operands.base < 2) throw "Base must be >= 2";
			return operands.x ** (1 / operands.base);
		}
	},

	SquareRoot: {
		names: ["squareroot", "sqrt"],
		operands: ["x"],
		func: function(operands) {
			return operands.x ** 0.5;
		}
	},

	Logarithm: {
		names: ["logarithm", "log"],
		operands: ["x", "base"],
		func: function(operands) {
			return Math.log(operands.x) / Math.log(operands.base);
		}
	},

	NaturalLogarithm: {
		names: ["naturallogarithm", "naturallog", "ln"],
		operands: ["x"],
		func: function(operands) {
			return Math.log(operands.x);
		}
	},

	Floor: {
		names: ["floor", "truncate", "trunc"],
		operands: ["x"],
		func: function(operands) {
			return Math.floor(operands.x);
		}
	},

	Ceiling: {
		names: ["ceiling", "ceil"],
		operands: ["x"],
		func: function(operands) {
			return Math.ceil(operands.x);
		}
	},

	Round: {
		names: ["round"],
		operands: ["x"],
		func: function(operands) {
			return Math.round(operands.x);
		}
	},

	AbsoluteValue: {
		names: ["absolutevalue", "abs"],
		operands: ["x"],
		func: function(operands) {
			return Math.abs(operands.x);
		}
	},

	Value: {
		names: ["value", "val"],
		operands: ["x"],
		func: function(operands) {
			return operands.x;
		}
	},

	Sign: {
		names: ["sign"],
		operands: ["x"],
		func: function(operands) {
			return Math.sign(operands.x);
		}
	},

	Negate: {
		names: ["negate", "neg"],
		operands: ["x"],
		func: function(operands) {
			return -(operands.x);
		}
	},

	Sine: {
		names: ["sine", "sin"],
		operands: ["x"],
		func: function(operands) {
			return Math.sin(operands.x);
		}
	},

	Cosine: {
		names: ["cosine", "cos"],
		operands: ["x"],
		func: function(operands) {
			return Math.cos(operands.x);
		}
	},

	Tangent: {
		names: ["tangent", "tan"],
		operands: ["x"],
		func: function(operands) {
			return Math.tan(operands.x);
		}
	},

	Cotangent: {
		names: ["cotangent", "cot"],
		operands: ["x"],
		func: function(operands) {
			return 1 / Math.tan(operands.x);
		}
	},

	Secant: {
		names: ["secant", "sec"],
		operands: ["x"],
		func: function(operands) {
			return 1 / Math.cos(operands.x);
		}
	},

	Cosecant: {
		names: ["cosecant", "csc"],
		operands: ["x"],
		func: function(operands) {
			return 1 / Math.sin(operands.x);
		}
	},

	DegreesToRadians: {
		names: ["degreestoradians", "rad"],
		operands: ["x"],
		func: function(operands) {
			return Math.PI * operands.x / 180;
		}
	},

	RadiansToDegrees: {
		names: ["radianstodegrees", "deg"],
		operands: ["x"],
		func: function(operands) {
			return operands.x * 180 / Math.PI;
		}
	},

	Random: {
		names: ["random", "rnd"],
		operands: ["min", "max"],
		func: function(operands) {
			if (operands.min > operands.max) {
				var _ = operands.min;
				operands.min = operands.max;
				operands.max = _;
			}
			return Math.random() * (operands.max - operands.min) + operands.min;
		}
	},

	Memory: {
		names: ["memory", "mem"],
		operands: ["value"],
		func: function(operands) {
			Constants.memory = operands.value;
			return `Stored value ${Constants.memory}`;
		}
	},
};

Constants = {
	pi: Math.PI,
	halfpi: Math.PI / 2,
	quartpi: Math.PI / 4,
	e: Math.E,
	halfe: Math.E / 2,
	quarte: Math.E / 4,
	sqrt2: Math.SQRT2,
	sqrthalf: Math.SQRT1_2,
	sqrtquart: Math.sqrt(0.25),
	sqrtpi: Math.sqrt(Math.PI),
	ln2: Math.LN2,
	ln10: Math.LN10,
	log2e: Math.LOG2E,
	log10e: Math.LOG10E,
	inf: 1 / 0,
	neginf: -1 / 0,
	lastop: 0,
	memory: 0
};

var prompt = require("prompt-sync")({sigint: true});

function bar(text, newline) {
	if (text) return `=[${text}]${"=".repeat(77 - text.length)}${(newline) ? "\n" : ""}`;
	else return `${"=".repeat(80)}${(newline) ? "\n" : ""}`;
}

function joinobj(obj, sep) {
	var str = "";
	for (var m in obj) str += obj[m] + (sep || ",");
	return (str.length == 0) ? "" : str.substring(0, str.length - sep.length);
}

console.log("[JShellCalc v1.2 by crispycat]\nType 'list' for available operations or 'constants' for available constants.\nSyntax: <operator> [operands...]");

while (true) {
	var choice = prompt("Please type a command or press [Ctrl]+[C] to exit: ").toLowerCase();
	switch (choice) {
		case "list":
		case "operations":
		case "ops":
			console.log(bar("Available operations"));
			for (var o in Operations) console.log(`+ ${Operations[o].names[0]}(${Operations[o].operands.join(", ")})`);
			console.log(bar(null, true));
			break;
		case "constants":
		case "consts":
			console.log(bar("Available constants"));
			console.log("Note: 'lastop' is not really a constant; it is the result of the last operation.\n'memory' can be written to using the 'memory' operation.");
			for (var c in Constants) console.log(`+ '${c}': ${Constants[c]}`);
			console.log(bar(null, true));
			break;
		default:
			choice = choice.replace(/[, \(\)]/g, "!").split("!").filter((v) => { return v != ""; });
			var op = choice.shift();
			for (var o in Operations)
				for (var n in Operations[o].names)
					if (Operations[o].names[n] == op) op = Operations[o];

			if (typeof op == "object") {
				var operands = {};
				var sbreak = false;
				for (var v in op.operands) {
					var vc = choice.shift();
					if (!isNaN(parseFloat(vc))) {
						operands[op.operands[v]] = parseFloat(vc);
					} else {
						for (var c in Constants)
							if (c == vc) vc = Constants[c];

						if (!isNaN(parseFloat(vc))) {
							operands[op.operands[v]] = vc;
						} else {
							console.log(`Input Error: '${vc}' is not a valid number or constant!`);
							sbreak = true;
							break;
						}
					}
				}

				if (sbreak) break;

				console.log(bar("Result"));
				console.log(`> ${op.names[0]}(${joinobj(operands, ", ")})`);
				try {
					Constants.lastop = op.func(operands);
					console.log(`\t= ${Constants.lastop}`);
					if (op.names[0] == "memory") Constants.lastop = Constants.memory;
				} catch (e) {
					console.log(`Error: ${e}`);
				}
				console.log(bar(null, true));
			} else {
				console.log(`Operation '${op}' does not exist! Type 'list' for available operations.`);
			}
	}
}
