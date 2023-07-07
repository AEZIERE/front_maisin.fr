import React, { useEffect, useState, useRef } from "react";
import "./FormMissingInfo.scss";
import { useAppDispatch, useAppSelector } from "../../hook";

interface Props {
	type: string;
}

const FormMissingInfo: React.FC<Props> = ({ type }) => {
	const refBloc = useRef<HTMLDivElement>(null);
	const refButton = useRef<HTMLButtonElement>(null);

	const dataReponse = useAppSelector((state) => state.dataResponse);
	const dispatch = useAppDispatch();

	const [list, setList] = useState<string[]>([]);
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [otherValue, setOtherValue] = useState<string>("");

	const list_material = ["PVC", "Bois", "Metal/Alu"];
	const list_room = ["Salon", "Chambre", "Cuisine", "Salle de bain"];
	const list_worktype = ["Installation", "Remplacement"];

	const [sentence, setSentence] = useState<string>("");

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const isChecked = event.target.checked;

		if (isChecked) {
			setOtherValue("");
			setSelectedValues([value]);
		} else {
			setSelectedValues([]);
		}
	};

	const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSelectedValues([value]);
		setOtherValue(value);
	};

	const handleSubmit = () => {
		if (selectedValues.length === 0) return;
		const data = { ...dataReponse };
		data[type] = { name: selectedValues[0], score: 100 };
		dispatch({
			type: "dataResponse/setData",
			payload: data,
		});
	};

	useEffect(() => {
		if (type !== "") {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "flex";
			}
		}
	}, [type]);

	useEffect(() => {
		let list: string[] = [];
		switch (type) {
			case "material":
				list = list_material;
				break;
			case "room":
				list = list_room;
				break;
			case "worktype":
				list = list_worktype;
				break;
			default:
				break;
		}
		setList(list);
	}, [type]);

	useEffect(() => {
		const button = refButton.current;

		if (button) {
			const buttonClass = "buttonData";
			const buttonReadyClass = "buttonData--ready";

			button.classList.toggle(buttonReadyClass, selectedValues.length > 0);
			button.classList.toggle(buttonClass, selectedValues.length === 0);
		}
	}, [selectedValues]);

	useEffect(() => {
		if (type === "material") {
			setSentence(`Avez-vous une préférence en terme de matériau pour votre ${dataReponse.category.name} ?`);
		} else if (type === "worktype") {
			setSentence("Quel type de travaux souhaitez-vous réaliser ?");
		} else if (type === "room") {
			setSentence("Dans quelle pièce souhaitez-vous réaliser vos travaux ?");
		}
	}, [otherValue]);

	return (
		<>
			<div className="bloc">
				<span>{sentence}</span>

				<div className="container-checks">
					{list.map((item: string, index) => (
						<div key={index}>
							<input
								type="checkbox"
								value={item}
								checked={selectedValues.includes(item)}
								onChange={handleCheckboxChange}
							/>
							<label htmlFor="">{item}</label>
						</div>
					))}
					<div className="other-solution">
						<label htmlFor="">Autre:</label>
						<input type="text" placeholder="Autre option" onChange={handleOtherChange} value={otherValue} />
					</div>
				</div>
				<button id="ValideData" ref={refButton} className="buttonData" type="submit" onClick={handleSubmit}>
					Confirmer votre choix
				</button>
			</div>
		</>
	);
};

export default FormMissingInfo;
