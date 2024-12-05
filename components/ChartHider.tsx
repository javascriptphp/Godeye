import React from "react";

function ChartHider({ text }: { text: string }) {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5em",
                color: "#333",
                zIndex: 1,
            }}
        >
            {text}
        </div>
    );
}

export default ChartHider;
