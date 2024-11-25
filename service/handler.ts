import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { message } from "antd";
import axiosInstance, { MEME_SERVER_HOST } from "@/service/axios";

export const apiHandler = async function (
    req: NextApiRequest,
    res: NextApiResponse,
    url: string
): Promise<void> {
    const { method, body, headers } = req;
    try {
        const response = await axiosInstance({
            method,
            url,
            headers,
            data: body,
        });
        const cookies = response.headers["set-cookie"] as string[];
        res.setHeader("Set-Cookie", cookies);
        res.status(response.status).json(response.data);
    } catch (error: any) {
        message.error(error);
    }
};

export const memeApiHandler = async function (
    req: NextApiRequest,
    res: NextApiResponse,
    url: string
): Promise<void> {
    const { method, body, headers } = req;
    try {
        const response = await axios({
            method,
            url: `${MEME_SERVER_HOST}${url}`,
            headers,
            data: body,
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        message.error(error);
    }
};
