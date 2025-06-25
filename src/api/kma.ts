import axios from 'axios';
import { getBaseDateTime } from '../utils/getBaseTime';
import type { KMAResponse } from '../types/kma';

const KMA_API_KEY = import.meta.env.VITE_KMA_API_KEY;

export const getWeatherFromKMA = async (x: number, y: number) => {
    const { baseDate, baseTime } = getBaseDateTime();

    try {
        const response = await axios.get<KMAResponse>(
            'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
            {
                params: {
                    serviceKey: KMA_API_KEY,
                    pageNo: 1,
                    numOfRows: 60,
                    dataType: 'JSON',
                    base_date: baseDate,
                    base_time: baseTime,
                    nx: x,
                    ny: y,
                },
            }
        );

        const items = response.data.response.body.items.item;
        return items;
    } catch (error) {
        console.error('기상청 초단기예보 요청 오류:', error);
        return null;
    }
};
