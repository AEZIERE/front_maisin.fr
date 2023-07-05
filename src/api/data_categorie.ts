import { useQuery } from "react-query";
import axios from "axios";


export const useAxiosApi= () => {
	return axios.create({
		baseURL: import.meta.env.VITE_API_COMMUNE,
		responseType: "json",
	});
};

export const useGetDataScolaire = ({
    prompte,
	isEnable = true,
}: {
	prompte: string;
	isEnable: boolean;
}) => {
	const api = useAxiosApi();
	return useQuery<[]>(
		["useGetDataScolaire", prompte],
		async () => {
			const { data } = await api.get(`data/scolaire/all?code=${prompte}`);
			return data;
		},
		{ enabled: isEnable }
	);
};