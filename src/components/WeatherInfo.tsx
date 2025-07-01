import type { ParsedWeather } from '../types/weather';
import './WeatherInfo.css';

const WeatherInfo = ({ weather }: { weather: ParsedWeather }) => {
    return (
        <div className="weather-info">
            <h2>날씨 정보</h2>
            <p>온도: {weather.temperature}℃</p>
            <p>습도: {weather.humidity}%</p>
            <p>하늘 상태: {weather.sky}</p>
            <p>날씨 요약: {weather.precipitation}</p>
            <p>풍속: {weather.windSpeed} m/s</p>
        </div>
    );
};

export default WeatherInfo;
