import { useState } from 'react';
import { getCoordinatesByAddress } from '../api/kakao';
import { convertToGrid } from '../utils/convertToGrid';
import { getWeatherFromKMA } from '../api/kma';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        const coords = await getCoordinatesByAddress(query);
        if (!coords) {
            console.warn('좌표를 찾을 수 없습니다.');
            return;
        }

        const grid = convertToGrid(coords.lat, coords.lon);
        console.log(`격자 좌표: x=${grid.x}, y=${grid.y}`);

        const kmaWeather = await getWeatherFromKMA(grid.x, grid.y);
        if (kmaWeather) {
            console.log('기상청 날씨:', kmaWeather);
        }
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
                placeholder="지역을 입력하세요 (예: 서울 강남구)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchBar;
