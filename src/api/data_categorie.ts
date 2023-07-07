import { useQuery } from "react-query";
import axios from "axios";

export const useAxiosApi = () => {
	return axios.create({
		baseURL: "https://localhost:8001/",
		responseType: "json",
	});
};

export const useGetResponse = ({ prompte, isEnable = true }: { prompte: string; isEnable: boolean }) => {
	const api = useAxiosApi();
	return useQuery<[]>(
		["useGetResponse", prompte],
		async () => {
			const { data } = await api.get(`?prompt=${prompte}`);
			return data;
		},
		{ enabled: isEnable }
	);
};
