import React from "react";
import { useTranslation } from "react-i18next";

interface ChartOverlayProps {
    children: React.ReactNode;
}

const ChartOverlay: React.FC<ChartOverlayProps> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <div style={{ position: "relative" }}>
            {children}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: "blur(15px)",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                    borderRadius: "8px",
                }}
            >
                <div
                    style={{
                        padding: "20px 40px",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontFamily: "YouSheBiaoTiHei",
                    }}
                >
                    <h3
                        style={{
                            color: "white",
                            margin: "0 0 10px 0",
                            fontSize: "24px",
                        }}
                    >
                        {t("comingSoon")}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ChartOverlay;
