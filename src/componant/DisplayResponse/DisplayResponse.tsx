import React, { useEffect } from "react";
import "./DisplayResponse.scss";

interface Props {
	data: {
		salespack: string;
		category: string;
		material: string;
		room: string | null;
		worktype: string | null;
	};
}

const DisplayResponse: React.FC<Props> = ({ data }) => {
	const refBloc = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data !== null) {
			const bloc = refBloc.current;
			if (bloc) {
				bloc.style.display = "flex";
			}
		}
	}, [data]);
	return (
		<div id="BlocDisplay" ref={refBloc}>
			<h2>Resutlat du Model</h2>
			<span>salespack : {data.salespack}</span>
			<span>category : {data.category}</span>
			<span>material : {data.material}</span>
			{data.room && <span>room : {data.room}</span>}
			{data.worktype && <span>worktype : {data.worktype}</span>}
		</div>
	);
};

export default DisplayResponse;
