export const buildCustomConfig = function ({
    userContext,
}: {
    userContext: any;
}) {
    if (userContext) {
        return {
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    type: "slider",
                    start: 0,
                    end: 100,
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 0,
                    end: 100,
                },
            ],
        };
    } else {
        return {};
    }
};
