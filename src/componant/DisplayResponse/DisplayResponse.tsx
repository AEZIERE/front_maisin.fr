import React, { useEffect } from "react";
import "./DisplayResponse.scss";

interface Props {
	data: {
		salespack: {
			name: string;
			score: number | null;
			is_implemented?: boolean;
		};
		category?: {
			name: string;
			score: number | null;
		};
		material?: {
			name: string;
			score: number | null;
		};
		room?: {
			name: string;
			score: number | null;
		};
		worktype?: {
			name: string;
			score: number | null;
		};
		tag?: {
			name: string;
			value: boolean | null;
		};
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
			<h2>Résultats du modèle</h2>
			<span>
				<b>Salespack : </b> {data.salespack.name} ( {data.salespack.score} )
			</span>
                    <span>
						<b>Category :</b> {data.category?.name} ( {data.category?.score} )
                    </span>
                    <span>
                        <b>Material :</b> {data.material?.name} ( {data.material?.score} )
                    </span>
                    {data.room?.name && (
                        <span>
                            <b>Room :</b> {data.room.name} ( {data.room.score} )
                        </span>
                    )}
                    {data.worktype?.name && (
                        <span>
                            <b>Worktype :</b>{data.worktype.name} ( {data.worktype.score} )
                        </span>
                    )}
                    {data.tag?.name && (
                        <span>
                            <b>Tag :</b>{data.tag.name} ( {data.tag.value?"True":"False"} )
                        </span>
                    )}
		</div>
	);
};

export default DisplayResponse;
