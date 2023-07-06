import { useQuery } from "react-query";
import axios from "axios";

export const useAxiosApi = () => {
	return axios.create({
		baseURL: "base de url, ce qui est commun a tout les requete",
		responseType: "json",
	});
};

export const useGetResponse = ({ prompte, isEnable = true }: { prompte: string; isEnable: boolean }) => {
	const api = useAxiosApi();
	return useQuery<[]>(
		["useGetResponse", prompte],
		async () => {
			const { data } = await api.get(`/blab/labla/blabla/${prompte}`);
			return data;
		},
		{ enabled: isEnable }
	);
};
