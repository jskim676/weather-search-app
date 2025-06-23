import { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (!query.trim()) return;
        console.log('검색어:', query);
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
                placeholder="지역을 입력하세요"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchBar;
