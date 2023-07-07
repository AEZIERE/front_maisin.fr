import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DataResponse = {
	salespack: {
		name: string;
		score: number | null;
		is_implemented: boolean;
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
	tag: {
		name: string | null;
		value: boolean | null;
	};
	[key: string]: string | null | Object;
};

// Define a type for the slice state
export interface Data {
	salespack: {
		name: string;
		score: number | null;
		is_implemented: boolean;
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
	tag: {
		name: string | null;
		value: boolean | null;
	};
	[key: string]: string | null | Object;
}

// Define the initial state using that type
const initialState: Data = {
	salespack: {
		name: "",
		score: 0.0,
		is_implemented: false,
	},
	category: {
		name: "",
		score: 0.0,
	},
	material: {
		name: "",
		score: 0.0,
	},
	room: {
		name: "",
		score: 0.0,
	},
	worktype: {
		name: "",
		score: 0.0,
	},
	tag: {
		name: "",
		value: false,
	},
};

export const dataResponseSlider = createSlice({
	name: "dataResponse",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<Data>) => {
			// TODO :  revoir
			state.salespack = action.payload.salespack;
			state.category = action.payload.category;
			state.material = action.payload.material;
			state.room = action.payload.room;
			state.worktype = action.payload.worktype;
			state.tag = action.payload.tag;
		},
	},
});

export const { setData } = dataResponseSlider.actions;

export default dataResponseSlider.reducer;
