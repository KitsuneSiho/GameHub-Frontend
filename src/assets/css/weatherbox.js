// WeatherBox.js
// 날씨 효과 및 배경을 설정하기 위한 유틸리티 함수들

// 현재 시간이 낮인지 밤인지 판단
export const isDayTime = (sunrise, sunset) => {
    const currentTime = new Date().getTime() / 1000;
    return currentTime > sunrise && currentTime < sunset;
  };
  
  // 온도 변환 (섭씨 <-> 화씨)
  export const convertTemperature = (kelvin, isCelsius) => {
    if (isCelsius) {
      // 켈빈 -> 섭씨
      return Math.round(kelvin - 273.15) + "°C";
    } else {
      // 켈빈 -> 화씨
      return Math.round((kelvin * 9) / 5 - 459.67) + "°F";
    }
  };
  
  // 날씨 상태에 따른 배경색 얻기
  export const getBackgroundColor = (weatherType, isDayTime) => {
    switch (weatherType) {
      case "clear":
        return isDayTime ? "#5C94FC" : "#090F1B";
      case "clouds":
        return isDayTime ? "#5C94FC" : "#090F1B";
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return isDayTime ? "#1528A2" : "#020514";
      case "snow":
        return isDayTime ? "#2142FF" : "#060E39";
      case "atmosphere":
        return isDayTime ? "#C6D3D8" : "#828C8F";
      default:
        return isDayTime ? "#5C94FC" : "#090F1B";
    }
  };
  
  // 날씨 아이콘 유형 결정
  export const getWeatherIconType = (weatherType) => {
    switch (weatherType.toLowerCase()) {
      case "clear":
        return "clear";
      case "clouds":
        return "clouds";
      case "rain":
        return "rain";
      case "drizzle":
        return "drizzle";
      case "thunderstorm":
        return "thunderstorm";
      case "snow":
        return "snow";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
        return "atmosphere";
      default:
        return "clouds";
    }
  };
  
  // 눈 애니메이션을 위한 Canvas 설정 (React에서 사용하기 위해 수정됨)
  export const setupSnowCanvas = (canvasRef) => {
    if (!canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    canvas.width = w;
    canvas.height = h;
    
    const rate = 50;
    const arc = 500;
    let time = 0;
    const size = 2;
    const speed = 10;
    const lights = [];
    const colors = ['#eee'];
    
    // 눈송이 초기화
    for (let i = 0; i < arc; i++) {
      lights[i] = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        toX: Math.random() * 5 + 1,
        toY: Math.random() * 5 + 1,
        c: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * size
      };
    }
    
    // 눈송이 애니메이션
    const animateSnow = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < arc; i++) {
        const li = lights[i];
        
        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.fill();
        
        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);
        
        if (li.x > w) li.x = 0;
        if (li.y > h) li.y = 0;
        if (li.x < 0) li.x = w;
        if (li.y < 0) li.y = h;
      }
      
      if (time < speed) {
        time++;
      }
      
      return requestAnimationFrame(animateSnow);
    };
    
    // 애니메이션 시작
    return animateSnow();
  };
  
  // 비 애니메이션을 위한 Canvas 설정 (React에서 사용하기 위해 수정됨)
  export const setupRainCanvas = (canvasRef, dropSizeFactor = 20) => {
    if (!canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    canvas.width = w;
    canvas.height = h;
    
    const num = 300;
    const raindrops = [];
    
    // 빗방울 초기화
    for (let i = 0; i < num; i++) {
      raindrops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        w: 1,
        h: Math.random() * dropSizeFactor,
        s: Math.random() * 10 + 3
      });
    }
    
    // 빗방울 애니메이션
    const animateRain = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < num; i++) {
        ctx.fillStyle = 'rgba(158, 202, 255, 1.0)';
        ctx.fillRect(raindrops[i].x, raindrops[i].y, raindrops[i].w, raindrops[i].h);
        
        // 빗방울 이동
        raindrops[i].y += raindrops[i].s;
        if (raindrops[i].y >= h) {
          raindrops[i].y = -raindrops[i].h;
        }
      }
      
      return requestAnimationFrame(animateRain);
    };
    
    // 애니메이션 시작
    return animateRain();
  };