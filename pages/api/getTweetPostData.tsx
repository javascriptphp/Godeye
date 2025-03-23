import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/service/handler";

const url = "/api/twitter/get_tweets";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return apiHandler(req, res, url);
}
