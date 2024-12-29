import Markdown from "react-markdown";
import useAutoScroll from "@/hooks/useAutoScroll";
import Spinner from "@/components/chat/Spinner";
import errorIcon from "@/assets/images/error.svg";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function ChatMessages({ messages, isLoading }: any) {
    const scrollContentRef = useAutoScroll(isLoading);

    return (
        <div ref={scrollContentRef} className="grow space-y-4">
            {messages.map(
                ({ role, content, loading, error }: any, idx: number) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
                            role === "user" ? "bg-primary-blue/10" : ""
                        }`}
                    >
                        {role === "user" && (
                            <Avatar
                                className="h-[26px] w-[26px] shrink-0"
                                style={{
                                    backgroundColor: "white",
                                    color: "gray",
                                }}
                                icon={<UserOutlined />}
                            />
                        )}
                        <div>
                            <div className="markdown-container">
                                {loading && !content ? (
                                    <Spinner />
                                ) : role === "assistant" ? (
                                    <Markdown>{content}</Markdown>
                                ) : (
                                    <div className="whitespace-pre-line">
                                        {content}
                                    </div>
                                )}
                            </div>
                            {error && (
                                <div
                                    className={`flex items-center gap-1 text-sm text-error-red ${
                                        content && "mt-2"
                                    }`}
                                >
                                    <img
                                        className="h-5 w-5"
                                        src={errorIcon}
                                        alt="error"
                                    />
                                    <span>Error generating the response</span>
                                </div>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ChatMessages;
