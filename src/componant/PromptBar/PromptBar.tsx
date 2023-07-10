import React, { useEffect, useState, useRef } from "react";
import "./PromptBar.scss";
import { useAppDispatch } from "../../hook";

interface Props {
	setMyPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const PromptBar: React.FC<Props> = ({ setMyPrompt }) => {
	const dispatch = useAppDispatch();

	const [valueInput, setValueInput] = useState("");
	const startButtonRef = useRef<HTMLButtonElement>(null);
	const clearButtonRef = useRef<HTMLButtonElement>(null);

	const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
	};

	const handlePromptSubmit = () => {
		setMyPrompt(valueInput);
	};

	useEffect(() => {
		const startButton = startButtonRef.current;
		const clearButton = clearButtonRef.current;

		if (startButton && clearButton) {
			const processingClass = "processing-results";
			const processingReadyClass = "processing-results--ready";
			const clearClass = "clear-results";
			const clearReadyClass = "clear-results--ready";

			startButton.classList.toggle(processingReadyClass, valueInput !== "");
			startButton.classList.toggle(processingClass, valueInput === "");
			startButton.disabled = valueInput === "";

			clearButton.classList.toggle(clearReadyClass, valueInput !== "");
			clearButton.classList.toggle(clearClass, valueInput === "");
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
						placeholder="Décrivez votre projet..."
						value={valueInput}
						onChange={handlePromptChange}
					/>
					<button
						id="start"
						ref={startButtonRef}
						className="processing-results"
						type="button"
						onClick={handlePromptSubmit}
					>
						Envoyer
					</button>
				</div>
			</div>
		</div>
	);
};

export default PromptBar;
