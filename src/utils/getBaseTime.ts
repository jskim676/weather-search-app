export const getBaseDateTime = (): { baseDate: string; baseTime: string } => {
    const now = new Date();

    // 날짜
    const yyyy = now.getFullYear().toString();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const baseDate = `${yyyy}${mm}${dd}`;

    // 시간 (10분 기준으로 가장 최근 30분 단위 시간 선택)
    const hour = now.getHours();
    const minute = now.getMinutes();

    let baseTime: string;
    if (minute < 45) {
        baseTime = String(hour - 1).padStart(2, '0') + '30';
    } else {
        baseTime = String(hour).padStart(2, '0') + '30';
    }

    return { baseDate, baseTime };
};
