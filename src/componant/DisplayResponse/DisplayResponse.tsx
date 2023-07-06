import React, { useEffect } from "react";
import "./DisplayResponse.scss";

interface Props {
	data: {
		salespack: {
			name: string;
			score: number | null;
		};
		category: {
			name: string;
			score: number | null;
		};
		material: {
			name: string;
			score: number | null;
		};
		room: {
			name: string;
			score: number | null;
		};
		worktype: {
			name: string;
			score: number | null;
		};
		[key: string]: string | null | Object;
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
			<h2>Resultat du modèle</h2>
			<span>
				salespack : {data.salespack.name} ( {data.salespack.score} )
			</span>
			<span>
				category : {data.category.name} ( {data.category.score} )
			</span>
			<span>
				material : {data.material.name} ( {data.material.score} )
			</span>
			{data.room.name && (
				<span>
					room : {data.room.name} ( {data.room.score} )
				</span>
			)}
			{data.worktype.name && (
				<span>
					worktype : {data.worktype.name} ( {data.worktype.score} )
				</span>
			)}
		</div>
	);
};

export default DisplayResponse;
