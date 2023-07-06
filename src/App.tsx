import React, { useEffect, useRef, useState } from "react";
import PromptBar from "./componant/PromptBar/PromptBar";
import DisplayResponse from "./componant/DisplayResponse/DisplayResponse";
import "./App.scss";
import FormMissingInfo from "./componant/FormMissingInfo/FormMissingInfo";
import { useAppSelector, useAppDispatch } from "./hook";
import { DataResponse } from "./redux/data/data";
import { useGetResponse } from "./api/data_categorie";

function App() {
	const [myPrompt, setMyPrompt] = useState("");
	const [paramsMissingInfo, setParamsMissingInfo] = useState<string[]>([]);

	const dataReponse: DataResponse = useAppSelector((state) => state.dataResponse);
	const dispatch = useAppDispatch();
	const refBloc = useRef<HTMLDivElement>(null);

	//const { data } = useGetResponse({ prompte: myPrompt, isEnable: myPrompt !== "" });

	useEffect(() => {
		// if (!data) {
		// 	//remplacer les valeurs par les valeurs de l'api (data)
		// 	dispatch({
		// 		type: "dataResponse/setData",
		// 		payload: {
		// 			salespack: { name: "salespack", score: 0.0 },
		// 			category: { name: "salespack", score: 0.0 },
		// 			material: { name: "Missing Info", score: 0.0 },
		// 			room: { name: "Missing Info", score: 0.0 },
		// 			worktype: { name: null, score: 0.0 },
		// 		},
		// 	});
		// }
		//remplacer les valeurs par les valeurs de l'api (data)
		dispatch({
			type: "dataResponse/setData",
			payload: {
				salespack: { name: "salespack", score: 0.0 },
				category: { name: "salespack", score: 0.0 },
				material: { name: "Missing Info", score: 0.0 },
				room: { name: "Missing Info", score: 0.0 },
				worktype: { name: null, score: 0.0 },
			},
		});
	}, []);

	useEffect(() => {
		console.log(myPrompt);
		if (myPrompt === "") {
			setParamsMissingInfo([]);
		}

		const keys = Object.keys(dataReponse);

		if (myPrompt !== "") {
			const params = keys.filter((key) => dataReponse[key].name === "Missing Info");

			setParamsMissingInfo(params);
		}
	}, [myPrompt, dataReponse]);

	useEffect(() => {
		if (paramsMissingInfo.length > 0) {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "flex";
			}
		}
	}, [paramsMissingInfo]);

	return (
		<div id="container">
			<PromptBar setMyPrompt={setMyPrompt} />
			<div id="container-resultat">
				{myPrompt !== "" && dataReponse.salespack.name !== "" && <DisplayResponse data={dataReponse} />}
				<div id="container-form-missing-info" ref={refBloc}>
					{paramsMissingInfo.length > 0 &&
						paramsMissingInfo.map((param: string) => <FormMissingInfo key={param} type={param} />)}
				</div>
			</div>
		</div>
	);
}

export default App;
