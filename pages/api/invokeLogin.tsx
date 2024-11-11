import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/service";

const url = "/api/user/login";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return apiHandler(req, res, url);
}
