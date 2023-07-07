import { useQuery } from "react-query";
import axios from "axios";


export const useAxiosApi = () => {
	return axios.create({
		baseURL: "http://127.0.0.1:8000/",
		responseType: "json",
	});
};

export const useGetResponse = ({ prompt, isEnable = true }: { prompt: string; isEnable: boolean }) => {
	const api = useAxiosApi();
	return useQuery<[]>(
		["useGetResponse", prompt],
		async () => {
			const { data } = await api.get(`?prompt=${prompt}`);
			return data;
		},
		{ enabled: isEnable }
	);
};
