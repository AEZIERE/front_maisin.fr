import React, { useEffect, useState } from "react";
import "./FormMissingInfo.scss";
import { useAppDispatch, useAppSelector } from "../../hook";

interface Props {
	type: string;
}

const FormMissingInfo: React.FC<Props> = ({ type }) => {
	const refBloc = React.useRef<HTMLDivElement>(null);
	const refButton = React.useRef<HTMLButtonElement>(null);

	const dataReponse = useAppSelector((state) => state.dataResponse);
	const dispatch = useAppDispatch();

	const [list, setList] = useState<string[]>([]);

	const list_material = ["PVC", "Bois", "Alu", "Acier"];
	const list_room = ["Salon", "Chambre", "Cuisine", "Salle de bain"];
	const list_worktype = ["Installation", "Remplacement"];
	const [selectedValues, setSelectedValues] = useState<string>("");
	const [otherValue, setOtherValue] = useState<string>("");

	const handleCheckboxChange = (event: { target: { value: any; checked: any } }) => {
		const value = event.target.value;
		const isChecked = event.target.checked;

		if (isChecked) {
			setOtherValue("");
			setSelectedValues(value);
		} else {
			setSelectedValues("");
		}
	};
	const handleOtherChange = (event: { target: { value: any; checked: any } }) => {
		const value = event.target.value;
		setSelectedValues(value);
		setOtherValue(value);
	};

	const handleSubmit = () => {
		console.log(selectedValues);
		const data = { ...dataReponse };
		data[type] = selectedValues;
		dispatch({
			type: "dataResponse/setData",
			payload: data,
		});
	};

	useEffect(() => {
		if (type !== null) {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "flex";
			}
		}
	}, [type]);

	useEffect(() => {
		if (type.length === 0) return;
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
			if (selectedValues != "") {
				button.classList.remove("buttonData");
				button.classList.add("buttonData--ready");
			} else {
				button.classList.remove("buttonData--ready");
				button.classList.add("buttonData");
			}
		}
	}, [selectedValues]);

	return (
		<div id="container-form-missing-info" ref={refBloc}>
			<div className="top-bloc">
				{list.map((item: string, index) => (
					<div key={index}>
						<input type="checkbox" value={item} checked={selectedValues.includes(item)} onChange={handleCheckboxChange} />
						<label htmlFor="">{item}</label>
					</div>
				))}
			</div>
			<div className="bottom-bloc">
				<label htmlFor="">Autre : </label>
				<input type="text" placeholder="" onChange={handleOtherChange} value={otherValue} />
			</div>
			<button id="ValideData" ref={refButton} className="buttonData" type="submit" onClick={handleSubmit}>
				Confirmer
			</button>
		</div>
	);
};

export default FormMissingInfo;
