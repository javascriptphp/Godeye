import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/service/handler";

const url = "/api/chatbot/clear_history";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    return apiHandler(req, res, url);
}
