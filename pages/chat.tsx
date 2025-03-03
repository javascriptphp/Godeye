import React from "react";
import Layout from "@/components/Layout";
import Chatbot from "@/components/chat/Chatbot";

function ChatPage() {
    const render = () => {
        return (
            <Layout>
                <div className="flex flex-col min-h-full w-full max-w-3xl mx-auto px-4">
                    <header className="sticky top-0 shrink-0 z-20">
                        <div className="flex flex-col h-full w-full gap-1 pt-4 pb-2">
                            <h1 className="text-[1.65rem] font-custom">
                                Godchat
                            </h1>
                        </div>
                    </header>
                    <Chatbot />
                </div>
            </Layout>
        );
    };

    return render();
}

export default ChatPage;
