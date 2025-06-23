import { useState } from 'react';
import { getCoordinatesByAddress } from '../api/kakao';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;
        const result = await getCoordinatesByAddress(query);
        if (result) {
            console.log('위도:', result.lat, '경도:', result.lon);
        } else {
            alert('지역을 찾을 수 없습니다.');
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="지역을 입력하세요 (예: 서울 강남구)"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchBar;
