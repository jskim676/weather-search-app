import type { KMAItem } from '../types/kma';
import type { ParsedWeather } from '../types/weather';

export const parseUltraSrtFcst = (items: KMAItem[]): ParsedWeather => {
    const map = new Map<string, string>();

    for (const item of items) {
        if (!map.has(item.category)) {
            map.set(item.category, item.fcstValue);
        }
    }

    return {
        temperature: Number(map.get('T1H') || 0),
        humidity: Number(map.get('REH') || 0),
        sky: parseSky(map.get('SKY')),
        precipitation: parsePty(map.get('PTY')),
        windSpeed: Number(map.get('WSD') || 0),
    };
};

const parseSky = (value?: string) => {
    switch (value) {
        case '1':
            return '맑음';
        case '3':
            return '구름 많음';
        case '4':
            return '흐림';
        default:
            return '정보 없음';
    }
};

const parsePty = (value?: string) => {
    switch (value) {
        case '0':
            return '비는 오지 않아요';
        case '1':
            return '비가 내리고 있어요';
        case '2':
            return '진눈깨비가 와요';
        case '3':
            return '눈이 내려요';
        case '5':
            return '이슬비가 내려요';
        case '6':
            return '가랑비와 눈발이 섞여요';
        case '7':
            return '눈발이 날려요';
        default:
            return '날씨 정보를 불러올 수 없어요';
    }
};
