import React, { useEffect, useRef, useState } from "react";
import '../assets/css/weatherbox.css';
import { 
    initWeatherWidget, 
    marioJump, 
    convertTemp, 
    makeSnow, 
    makeRain, 
    setWeatherBackground,
    cardClear
  } from '../assets/css/WeatherBox.js';

  const WeatherBox = () => {
    const containerRef = useRef(null);
    const [weatherData, setWeatherData] = useState(null);

    const scalerRef = useRef(null);
    const contentRef = useRef(null);


    //************************날씨 데이터를 가져오는 부분************************
    const getCurrentLocation=()=>{
        navigator.geolocation.getCurrentPosition(
          (position)=>{
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          getWeatherByCurrentLocation(lat, lon)
        },
        (error) => {
            console.error("Error getting location:", error);
            // 에러 처리: 기본 위치 사용 또는 사용자에게 알림
            }    
        )  
    }
      //api 가져오기
      const getWeatherByCurrentLocation = async (lat, lon) => {
          // 환경 변수에서 API 키와 URL 가져오기
          const apiKey = import.meta.env.VITE_API_KEY;
          const apiUrl = import.meta.env.VITE_API_URL;

          // URL 생성
          let url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
          try {
          let response = await fetch(url);
          let data = await response.json();
          setWeatherData(data);  // 여기서 상태를 업데이트합니다.
          console.log(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      useEffect(()=>{
        getCurrentLocation();
      },[]);

      //**********************************************************************


      useEffect(() => {
        if (weatherData && containerRef.current) {
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp + 273.15; // 섭씨를 켈빈으로 변환
            const weatherDescription = weatherData.weather[0].main.toLowerCase();

            // 현재 시간과 일출/일몰 시간을 이용해 낮/밤 여부 결정
            const currentTime = new Date().getTime() / 1000;

            //currentTime > weatherData.sys.sunrise: 현재 시간이 일출 시간보다 늦은지 확인
            //currentTime < weatherData.sys.sunset: 현재 시간이 일몰 시간보다 이른지 확인
            //&&: 두 조건을 모두 만족해야 함 (AND 연산)
            //? 1 : 0: 삼항 연산자. 조건이 참이면 1, 거짓이면 0을 반환
            const dayOrNight = currentTime > weatherData.sys.sunrise && currentTime < weatherData.sys.sunset ? 1 : 0;

            //날씨 위젯 초기화
            initWeatherWidget(containerRef, cityName, temperature, weatherDescription);

            //cardClear 함수 호출. 낮/밤 여부에 따라 배경 변경
            cardClear(containerRef.current, dayOrNight);

            // 버튼에 이벤트 리스너 추가
            //"querySelector": DOM 특정요소에 접근하기 위한 메서드
            const brickBtn = containerRef.current.querySelector('#brick-btn');
            const marioBtn = containerRef.current.querySelector('#mario-btn');
            
            
            let showCelsius = true;
            
            if (brickBtn && marioBtn) {
                const handleClick = () => {
                    marioJump(containerRef.current);
                    showCelsius  = convertTemp(containerRef.current, temperature, showCelsius);
                };
                
                brickBtn.addEventListener('click', handleClick);
                marioBtn.addEventListener('click', handleClick);
                
                // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
                return () => {
                    if (brickBtn && marioBtn) {
                        brickBtn.removeEventListener('click', handleClick);
                        marioBtn.removeEventListener('click', handleClick);
                    }
                };
            }
        }
    }, [weatherData]);

      //************************위젯 창크기 조절시 비율 유지용 useEffect************************
      useEffect(() => {
          function resize() {
              if (!scalerRef.current || !contentRef.current) return;
              const parentWidth = scalerRef.current.offsetWidth;
              const parentHeight = scalerRef.current.offsetHeight;
              const contentWidth = 380;
              const contentHeight = 460;
              const scale = Math.min(parentWidth / contentWidth, parentHeight / contentHeight);
              contentRef.current.style.transform = `scale(${scale})`;
          }
          resize();
          window.addEventListener("resize", resize);
          return () => window.removeEventListener("resize", resize);
      }, []);

    return (
        <div className="weather-widget-container" ref={containerRef}> {/* 리액트에선 상위 부모요소가 필수적으로 있어야 하므로 하나의 부모 요소로 감싸기 */}
            <div className="container box-temperature">
                <div className="displayed-data">
                    <p className="temperature"></p>
                    <p className="cityg"></p>
                </div>
                <canvas id="particle"></canvas>
                <div className="box-btn">
                    <button type="button" id="brick-btn" className="btn brick-btn"></button>
                </div>
                <button type="button" id="mario-btn" className="btn mario-btn"></button>
            </div>
            {/*<div className="container box-footer">
                <footer><p>© 2016 ErreC • All Rights Reserved</p></footer>
            </div>*/}
        </div>
    );
};

export default WeatherBox;