import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";
import {SERVER_HOST} from "@/utils/axios";

const url = "/api/data/history/sell/before-three-months-ago";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const {method, body} = req;

	try {
		const response = await axios({method: method, url: SERVER_HOST+url, responseType: 'json', data: body});
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
}

