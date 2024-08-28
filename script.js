const { useState } = React;

        const Calculator = () => {
            const [input, setInput] = useState("0");
            const [formula, setFormula] = useState("");
            const [lastValue, setLastValue] = useState(null);
            const [evaluated, setEvaluated] = useState(false);

            const handleClear = () => {
                setInput("0");
                setFormula("");
                setLastValue(null);
                setEvaluated(false);
            };

            const handleNumber = (value) => {
                if (evaluated) {
                    setInput(value);
                    setFormula(value);
                    setEvaluated(false);
                } else {
                    setInput(input === "0" ? value : input + value);
                    setFormula(formula + value);
                }
            };

            const handleDecimal = () => {
                if (evaluated) {
                    setInput("0.");
                    setFormula("0.");
                    setEvaluated(false);
                } else if (!input.includes(".")) {
                    setInput(input + ".");
                    setFormula(formula + ".");
                }
            };

            const handleOperator = (value) => {
                if (evaluated) {
                    setFormula(lastValue + value);
                    setInput(value);
                    setEvaluated(false);
                } else {
                    if (/[+\-*/]$/.test(formula)) {
                        if (value === "-") {
                            if (/[+\-*/]$/.test(formula.slice(-2, -1))) {
                                // If there are two consecutive operators already, replace both with the current one
                                setFormula(formula.slice(0, -2) + value);
                            } else {
                                // Allow a minus after an operator for negative numbers
                                setFormula(formula + value);
                            }
                        } else {
                            // Replace the last operator with the new one
                            setFormula(formula.replace(/[+\-*/]+$/, value));
                        }
                    } else {
                        // Append operator if not replacing
                        setFormula(formula + value);
                    }
                    setInput(value);
                }
            };

            const handleEqual = () => {
                let result;
                try {
                    result = eval(formula.replace(/--/g, "+"));
                } catch (error) {
                    result = "Error";
                }
                setInput(result.toString());
                setLastValue(result.toString());
                setFormula(result.toString());
                setEvaluated(true);
            };

            return (
                <div className="calculator">
                    <div id="display" className="display">{input}</div>
                    <button id="clear" onClick={handleClear}>AC</button>
                    <button id="divide" onClick={() => handleOperator("/")}>/</button>
                    <button id="multiply" onClick={() => handleOperator("*")}>*</button>
                    <button id="subtract" onClick={() => handleOperator("-")}>-</button>
                    <button id="add" onClick={() => handleOperator("+")}>+</button>
                    <button id="seven" onClick={() => handleNumber("7")}>7</button>
                    <button id="eight" onClick={() => handleNumber("8")}>8</button>
                    <button id="nine" onClick={() => handleNumber("9")}>9</button>
                    <button id="four" onClick={() => handleNumber("4")}>4</button>
                    <button id="five" onClick={() => handleNumber("5")}>5</button>
                    <button id="six" onClick={() => handleNumber("6")}>6</button>
                    <button id="one" onClick={() => handleNumber("1")}>1</button>
                    <button id="two" onClick={() => handleNumber("2")}>2</button>
                    <button id="three" onClick={() => handleNumber("3")}>3</button>
                    <button id="zero" onClick={() => handleNumber("0")}>0</button>
                    <button id="decimal" onClick={handleDecimal}>.</button>
                    <button id="equals" className="equals" onClick={handleEqual}>=</button>
                </div>
            );
        };

        ReactDOM.render(<Calculator />, document.getElementById("root"));