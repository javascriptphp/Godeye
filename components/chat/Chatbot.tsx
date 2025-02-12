import { useState } from "react";
import { useImmer } from "use-immer";
import { message } from "antd";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { getChatResponseSSE } from "@/service";
import { useTranslation } from "react-i18next";
import { isLoginValid } from "@/utils/auth";

function Chatbot() {
    const [messages, setMessages] = useImmer([]);
    const [newMessage, setNewMessage] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();

    const isLoading = (
        messages.length && (messages[messages.length - 1] as any)
    ).loading;

    async function submitNewMessage() {
        if (!isLoginValid()) {
            messageApi.error(t("signInAlert"));
            return;
        }

        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage || isLoading) return;

        setMessages((draft: any) => [
            ...draft,
            { role: "user", content: trimmedMessage },
            { role: "assistant", content: "", sources: [], loading: true },
        ]);
        setNewMessage("");

        try {
            await getChatResponseSSE(trimmedMessage, (data: any) => {
                setMessages((draft: any) => {
                    draft[draft.length - 1].content += data.data.bot_text;
                });
                if (data.data.is_completion) {
                    setMessages((draft: any) => {
                        draft[draft.length - 1].loading = false;
                    });
                }
            });
        } catch (err) {
            setMessages((draft: any) => {
                draft[draft.length - 1].loading = false;
                draft[draft.length - 1].error = true;
            });
        }
    }

    return (
        <div className="relative grow flex flex-col gap-6 pt-6">
            {contextHolder}
            {messages.length === 0 && (
                <div className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2">
                    <p>👋 Welcome!</p>
                    {/* <p>
                        I am powered by the latest technology reports from
                        leading institutions like the World Bank, the World
                        Economic Forum, McKinsey, Deloitte and the OECD.
                    </p> */}
                    <p>{t("chatGPTDescription")}</p>
                </div>
            )}
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput
                newMessage={newMessage}
                isLoading={isLoading}
                setNewMessage={setNewMessage}
                submitNewMessage={submitNewMessage}
            />
        </div>
    );
}

export default Chatbot;
