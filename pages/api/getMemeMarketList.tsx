import { NextApiRequest, NextApiResponse } from "next";
import { memeApiHandler } from "@/service/handler";

const url = "/api/rootdata/market_meme";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return memeApiHandler(req, res, url);
}
