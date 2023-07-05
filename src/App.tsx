import React, { useEffect, useState } from "react";
import PromptBar from "./componant/PromptBar/PromptBar";
import DisplayResponse from "./componant/DisplayResponse/DisplayResponse";
import "./App.scss";
import FormMissingInfo from "./componant/FormMissingInfo/FormMissingInfo";

import { useAppSelector, useAppDispatch } from "./hook";
function App() {
	const [prompt, setPrompt] = useState("");
	const [paramsMissingInfo, setParamsMissingInfo] = useState([]);

	const dataReponse = useAppSelector((state) => state.dataResponse);
	const dispatch = useAppDispatch();

	/* 	useEffect(() => {
    ici call api avec prompt
		dispatch({
			type: "dataResponse/setData",
			payload: {
				salespack: "salespack",
				category: "category",
				material: "Missing Info",
				room: "room",
				worktype: "worktype",
			},
		});
	}, []); */

	useEffect(() => {
		console.log(prompt);

		const keys = Object.keys(dataReponse);

		if (prompt !== "") {
			const params = keys.filter((key: string) => dataReponse[key] === "Missing Info");
			setParamsMissingInfo(params);
		}
	}, [prompt, dataReponse]);

	return (
		<div id="container">
			<PromptBar setPrompt={setPrompt} />
			<div id="container-resultat">
				{prompt !== "" && dataReponse.salespack !== "" && <DisplayResponse data={dataReponse} />}

				{paramsMissingInfo.map((param: string) => (
					<FormMissingInfo key={param} type={param} />
				))}
			</div>
		</div>
	);
}

export default App;
