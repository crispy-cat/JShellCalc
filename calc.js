// JShellCalc v1.1
// by crispycat

var Operations = {
	Addition: {
		names: ["addition", "add", "plus", "sum"],
		values: ["left", "right"],
		func: function(values) {
			return values.left + values.right;
		}
	},

	Subtraction: {
		names: ["subtraction", "sub", "minus", "difference", "diff"],
		values: ["left", "right"],
		func: function(values) {
			return values.left - values.right;
		}
	},

	Multiplication: {
		names: ["multiplication", "mul", "times", "product"],
		values: ["left", "right"],
		func: function(values) {
			return values.left * values.right;
		}
	},

	Division: {
		names: ["division", "div", "quotient", "quot"],
		values: ["dividend", "divisor"],
		func: function(values) {
			return values.dividend / values.divisor;
		}
	},

	Modulo: {
		names: ["modulo", "mod", "remainder", "rem"],
		values: ["dividend", "divisor"],
		func: function(values) {
			return values.dividend % values.divisor;
		}
	},

	Exponentiation: {
		names: ["exponentiation", "exp", "power", "pow"],
		values: ["base", "power"],
		func: function(values) {
			return values.base ** values.power;
		}
	},

	Root: {
		names: ["root", "radical"],
		values: ["x", "base"],
		func: function(values) {
			if (values.base < 2) throw "Base must be >= 2";
			return values.x ** (1 / valuse.base);
		}
	},

	SquareRoot: {
		names: ["squareroot", "sqrt"],
		values: ["x"],
		func: function(values) {
			return values.x ** 0.5;
		}
	},

	Logarithm: {
		names: ["logarithm", "log"],
		values: ["x", "base"],
		func: function(values) {
			return Math.log(values.x) / Math.log(values.base);
		}
	},

	NaturalLogarithm: {
		names: ["naturallogarithm", "naturallog", "ln"],
		values: ["x"],
		func: function(values) {
			return Math.log(values.x);
		}
	},

	Floor: {
		names: ["floor", "truncate", "trunc"],
		values: ["x"],
		func: function(values) {
			return Math.floor(values.x);
		}
	},

	Ceiling: {
		names: ["ceiling", "ceil"],
		values: ["x"],
		func: function(values) {
			return Math.ceil(values.x);
		}
	},

	Round: {
		names: ["round"],
		values: ["x"],
		func: function(values) {
			return Math.round(values.x);
		}
	},

	AbsoluteValue: {
		names: ["absolutevalue", "abs"],
		values: ["x"],
		func: function(values) {
			return Math.abs(values.x);
		}
	},

	Value: {
		names: ["value", "val"],
		values: ["x"],
		func: function(values) {
			return values.x;
		}
	},

	Sign: {
		names: ["sign"],
		values: ["x"],
		func: function(values) {
			return Math.sign(values.x);
		}
	},

	Negate: {
		names: ["negate", "neg"],
		values: ["x"],
		func: function(values) {
			return -(values.x);
		}
	},

	Sine: {
		names: ["sine", "sin"],
		values: ["x"],
		func: function(values) {
			return Math.sin(values.x);
		}
	},

	Cosine: {
		names: ["cosine", "cos"],
		values: ["x"],
		func: function(values) {
			return Math.cos(values.x);
		}
	},

	Tangent: {
		names: ["tangent", "tan"],
		values: ["x"],
		func: function(values) {
			return Math.tan(values.x);
		}
	},

	Cotangent: {
		names: ["cotangent", "cot"],
		values: ["x"],
		func: function(values) {
			return 1 / Math.tan(values.x);
		}
	},

	Secant: {
		names: ["secant", "sec"],
		values: ["x"],
		func: function(values) {
			return 1 / Math.cos(values.x);
		}
	},

	Cosecant: {
		names: ["cosecant", "csc"],
		values: ["x"],
		func: function(values) {
			return 1 / Math.sin(values.x);
		}
	},

	DegreesToRadians: {
		names: ["degreestoradians", "rad"],
		values: ["x"],
		func: function(values) {
			return Math.PI * values.x / 180;
		}
	},

	RadiansToDegrees: {
		names: ["radianstodegrees", "deg"],
		values: ["x"],
		func: function(values) {
			return values.x * 180 / Math.PI;
		}
	},

	Random: {
		names: ["random", "rnd"],
		values: ["min", "max"],
		func: function(values) {
			if (values.min > values.max) {
				var _ = values.min;
				values.min = values.max;
				values.max = _;
			}
			return Math.random() * (values.max - values.min) + values.min;
		}
	}
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
	lastop: 0
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

console.log("[JShellCalc v1.1 by crispycat]\nType 'list' for available operations or 'constants' for available constants.\n");

while (true) {
	var choice = prompt("Please select an operation or press [Ctrl]+[C] to exit: ").toLowerCase();
	switch (choice) {
		case "list":
		case "operations":
		case "ops":
			console.log(bar("Available operations"));
			for (var o in Operations) console.log(`+ ${Operations[o].names[0]}(${Operations[o].values.join(", ")})`);
			console.log(bar(null, true));
			break;
		case "constants":
		case "consts":
			console.log(bar("Available constants"));
			console.log("Note: 'lastop' is not really a constant; it is the result of the last operation")
			for (var c in Constants) console.log(`+ '${c}': ${Constants[c]}`);
			console.log(bar(null, true));
			break;
		default:
			var op = null;
			for (var o in Operations)
				for (var n in Operations[o].names)
					if (Operations[o].names[n] == choice) op = Operations[o];

			if (op) {
				var values = {};
				var sbreak = false;
				for (var v in op.values) {
					var vc = prompt(`Please enter value '${op.values[v]}': `).toLowerCase();
					if (parseFloat(vc)) {
						values[op.values[v]] = parseFloat(vc);
					} else {
						for (var c in Constants)
							if (c == vc) vc = Constants[c];

						if (parseFloat(vc)) {
							values[op.values[v]] = vc;
						} else {
							console.log(`Input Error: '${vc}' is not a valid number or constant!`);
							sbreak = true;
							break;
						}
					}
				}

				if (sbreak) break;

				console.log(bar("Result"));
				console.log(`> ${op.names[0]}(${joinobj(values, ", ")})`);
				try {
					Constants.lastop = op.func(values);
					console.log(`\t= ${Constants.lastop}`);
				} catch (e) {
					console.log(`Error: ${e}`);
				}
				console.log(bar(null, true));
			} else {
				console.log(`Operation ${choice} does not exist! Type 'list' for available operations.`);
			}
	}
}
