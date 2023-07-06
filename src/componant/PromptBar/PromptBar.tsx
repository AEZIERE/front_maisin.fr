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

	const handlePromptClear = () => {
		dispatch({
			type: "dataResponse/setData",
			payload: {
				salespack: "",
				category: "",
				material: "",
				room: null,
				worktype: null,
			},
		});
		setMyPrompt("");
		setValueInput("");
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
						placeholder="search..."
						value={valueInput}
						onChange={handlePromptChange}
					/>
					<button id="clear" ref={clearButtonRef} className="clear-results" type="button" onClick={handlePromptClear}>
						Clear
					</button>
				</div>
				<button
					id="start"
					ref={startButtonRef}
					className="processing-results"
					type="button"
					onClick={handlePromptSubmit}
				>
					Faire la demande
				</button>
			</div>
		</div>
	);
};

export default PromptBar;
