export type GridCoord = { x: number; y: number };

export const convertToGrid = (lat: number, lon: number): GridCoord => {
    const RE = 6371.00877; // 지구 반경 (km)
    const GRID = 5.0; // 격자 간격 (km)
    const SLAT1 = 30.0; // 투영 위도1
    const SLAT2 = 60.0; // 투영 위도2
    const OLON = 126.0; // 기준 경도
    const OLAT = 38.0; // 기준 위도
    const XO = 43; // 기준 x좌표
    const YO = 136; // 기준 y좌표

    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    const r = (re * sf) / Math.pow(ra, sn);

    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const x = Math.floor(r * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);

    return { x, y };
};
