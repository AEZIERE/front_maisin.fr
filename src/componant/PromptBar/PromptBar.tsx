import React, { useEffect, useState, useRef } from "react";
import "./PromptBar.scss";

interface Props {
	setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const PromptBar: React.FC<Props> = ({ setPrompt }) => {
	const [valueInput, setValueInput] = useState("");
	const startButtonRef = useRef<HTMLButtonElement>(null);
	const clearButtonRef = useRef<HTMLButtonElement>(null);

	const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
	};

	const handlePromptSubmit = () => {
		setPrompt(valueInput);
	};

	const handlePromptClear = () => {
		setPrompt("");
		setValueInput("");
	};

	useEffect(() => {
		const startButton = startButtonRef.current;
		const clearButton = clearButtonRef.current;

		if (startButton && clearButton) {
			if (valueInput !== "") {
				startButton.classList.remove("processing-results");
				startButton.classList.add("processing-results--ready");

				clearButton.classList.remove("clear-results");
				clearButton.classList.add("clear-results--ready");
			} else {
				startButton.classList.remove("processing-results--ready");
				startButton.classList.add("processing-results");

				clearButton.classList.remove("clear-results--ready");
				clearButton.classList.add("clear-results");
			}
		}
	}, [valueInput]);

	return (
		<div className="form-container">
			<div className="form">
				<div>
					<input
						id="search"
						type="text"
						className="input"
						placeholder="search..."
						value={valueInput}
						onChange={(e) => handlePromptChange(e)}
					/>
					<button id="clear" ref={clearButtonRef} className="clear-results" type="button" onClick={handlePromptClear}>
						Clear
					</button>
				</div>
				<button id="start" ref={startButtonRef} className="processing-results" type="button" onClick={handlePromptSubmit}>
					Processing
				</button>
			</div>
		</div>
	);
};

export default PromptBar;
