export type KMAItem = {
    category: string; // PTY, SKY, T1H 등
    fcstTime: string; // 예: '1530'
    fcstValue: string; // 예: '1', '맑음', '22.5' 등
};

export type KMAResponse = {
    response: {
        header: {
            resultCode: string;
            resultMsg: string;
        };
        body: {
            dataType: string;
            items: {
                item: KMAItem[];
            };
            pageNo: number;
            numOfRows: number;
            totalCount: number;
        };
    };
};
