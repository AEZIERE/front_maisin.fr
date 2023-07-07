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

	const { data } = useGetResponse({ prompt: myPrompt, isEnable: myPrompt !== "" });

	useEffect(() => {
		console.log(data);
		if (data) {
			//remplacer les valeurs par les valeurs de l'api (data)
			dispatch({
				type: "dataResponse/setData",
				payload: data,
			});
			console.log(dataReponse);
			
		}
	}, [data]);

	useEffect(() => {
		console.log(myPrompt);
		if (myPrompt === "") {
			setParamsMissingInfo([]);
		}

		const keys = Object.keys(dataReponse);

		if (myPrompt !== "") {
			const params = keys.filter((key) => dataReponse[key]?.name === "Missing info");

			setParamsMissingInfo(params);
		}
	}, [myPrompt, dataReponse]);

	useEffect(() => {
		if (paramsMissingInfo.length > 0) {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "flex";
			}
		} else {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "none";
			}
		}
	}, [paramsMissingInfo]);

	return (
		<div id="container">
			<div className="header">Perfect matching test</div>
			<div className="container-action">
				<div className="content-left">
					{myPrompt !== "" && dataReponse.salespack.name !== "" && <DisplayResponse data={dataReponse} />}
				</div>
				<div className="content-right">
					<PromptBar setMyPrompt={setMyPrompt} />
					<div id="container-resultat">
						<div id="container-form-missing-info" ref={refBloc}>
							{paramsMissingInfo.length > 0 &&
								paramsMissingInfo.map((param: string) =>
									paramsMissingInfo.indexOf(param) == 0 ? <FormMissingInfo key={param} type={param} /> : null
								)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
