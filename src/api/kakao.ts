import axios from 'axios';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

type KakaoAddress = {
    x: string;
    y: string;
};

export const getCoordinatesByAddress = async (address: string) => {
    try {
        const response = await axios.get<{ documents: KakaoAddress[] }>(
            'https://dapi.kakao.com/v2/local/search/address.json',
            {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );

        const documents = response.data.documents;
        if (documents.length === 0) throw new Error('주소 결과 없음');

        const { x, y } = documents[0];
        return { lat: parseFloat(y), lon: parseFloat(x) };
    } catch (error) {
        console.error('Kakao 주소 검색 오류:', error);
        return null;
    }
};
