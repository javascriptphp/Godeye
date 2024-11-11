import { Typography } from "antd";
import { introductionWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const MetricIntroduction = ({ metric }: { metric: string }) => {
    const { t } = useTranslation();
    const tutorials = {
        buy: [
            {
                title: t("buyTitle"),
                paragraphs: [t("buyParagraph1"), t("buyParagraph2")],
            },
        ],
        sell: [
            {
                title: t("sellPrincipleTitle"),
                paragraphs: [t("sellPrincipleParagraph")],
            },
            {
                title: t("sellTutorialTitle"),
                paragraphs: [
                    t("sellTutorialParagraph1"),
                    t("sellTutorialParagraph2"),
                ],
            },
        ],
    } as {
        [key: string]: {
            title: string;
            paragraphs: string[];
        }[];
    };

    return (
        <Typography style={{ width: introductionWidth, margin: 0 }}>
            {tutorials[metric].map((tutorial, index) => {
                return (
                    <div key={index}>
                        <Title level={3} style={{ marginTop: 0 }}>
                            {tutorial.title}
                        </Title>
                        {tutorial.paragraphs.map((paragraph, index) => (
                            <Paragraph key={index}>{paragraph}</Paragraph>
                        ))}
                    </div>
                );
            })}
        </Typography>
    );
};
