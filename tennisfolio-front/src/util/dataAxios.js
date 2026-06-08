import axios from "axios";

export const axiosGet = async (path) => {
	const url = `http://localhost:4000${path}`;
	const res = await axios.get(url);
	return res.data;
};

export const axiosPost = async (path, data) => {
	const url = `http://localhost:4000${path}`;
	const res = await axios.post(url, data);
	return res.data;
};
