import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/service/handler";

const url = "/api/data/history/buy/before-three-months-ago";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return apiHandler(req, res, url);
}
