import { NextApiRequest, NextApiResponse } from "next";
import { SERVER_HOST } from "@/service/axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // 设置 SSE 相关的响应头
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (res.socket) {
        res.socket.setTimeout(0);
        res.socket.setNoDelay(true);
        res.socket.setKeepAlive(true);
    }

    res.flushHeaders();

    const { user_text, email, device_id } = req.query;

    const params = new URLSearchParams({
        user_text: user_text as string,
        ...(email && { email: email as string }),
        ...(device_id && { device_id: device_id as string }),
    });

    try {
        const response = await fetch(
            `${SERVER_HOST}/api/chatbot/generate_response?${params.toString()}`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        // 获取响应的 reader
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error("Failed to get response reader");
        }

        // 读取和转发数据流
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }

            // 将数据块发送到客户端
            const text = new TextDecoder().decode(value);
            res.write(text);

            (res as any).flush();
        }

        res.end();
    } catch (error) {
        console.error("Error in SSE handler:", error);
        res.status(500).end("Internal Server Error");
    }
}
