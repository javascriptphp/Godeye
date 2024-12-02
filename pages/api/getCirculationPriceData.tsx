import { NextApiRequest, NextApiResponse } from "next";
import { exchangeApiHandler } from "@/service/handler";

const url = "/circulation-price";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return exchangeApiHandler(req, res, url);
}
