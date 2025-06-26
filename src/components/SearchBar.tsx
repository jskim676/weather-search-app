import { useState } from 'react';
import { getCoordinatesByAddress } from '../api/kakao';
import { convertToGrid } from '../utils/convertToGrid';
import { getWeatherFromKMA } from '../api/kma';
import './SearchBar.css';
import { parseUltraSrtFcst } from '../utils/parseUltraSrtFcst';
import type { ParsedWeather } from '../types/weather';

const SearchBar = () => {
    const [address, setAddress] = useState('');
    const [weather, setWeather] = useState<ParsedWeather | null>(null);

    const handleSearch = async () => {
        if (!address.trim()) return;

        const coords = await getCoordinatesByAddress(address);
        if (!coords) {
            alert('주소를 찾을 수 없습니다.');
            return;
        }

        const grid = convertToGrid(coords.lat, coords.lon);
        const rawItems = await getWeatherFromKMA(grid.x, grid.y);
        if (!rawItems) {
            alert('기상청 데이터를 불러올 수 없습니다.');
            return;
        }

        const parsed = parseUltraSrtFcst(rawItems);
        setWeather(parsed);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={address}
                placeholder="예: 서울 강남구"
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>검색</button>

            {weather && (
                <div className="weather-result">
                    <p>온도: {weather.temperature}℃</p>
                    <p>습도: {weather.humidity}%</p>
                    <p>하늘 상태: {weather.sky}</p>
                    <p>날씨 요약: {weather.precipitation}</p>
                    <p>풍속: {weather.windSpeed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
