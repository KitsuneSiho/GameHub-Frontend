// Assets are property of Nintendo!

// 위젯 초기화 함수
export const initWeatherWidget = (containerRef, cityName, temperature, weatherDescription) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // 현재 시간 기준 낮/밤 설정
    const currentTime = new Date().getTime() / 1000;
    const dayOrNight = true; // 기본값은 낮으로 설정
    
    // 날씨 배경 설정
    setWeatherBackground(container, weatherDescription, dayOrNight);
    
    // 버튼과 도시, 온도 설정
    setTimeout(() => {
      const brickBtn = container.querySelector('#brick-btn');
      if (brickBtn) {
        brickBtn.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716211/weather%20machine/btn-temp-f.png\')';
      }
    }, 500);
    
    // 도시 이름과 온도 표시
    const cityElem = container.querySelector('.cityg');
    const tempElem = container.querySelector('.temperature');
    
    if (cityElem) cityElem.textContent = cityName;
    if (tempElem) tempElem.textContent = Math.round(temperature - 273.15) + "°C";
    
    return { container, cityElem, tempElem };
  };
  
  // 마리오 점프 애니메이션
  /* export const marioJump = (container) => {
    if (!container) return;
    
    const marioBtn = container.querySelector('#mario-btn');
    const brickBtn = container.querySelector('#brick-btn');
    
    if (marioBtn) {
      // 마리오 점프 이미지로 변경
      // marioBtn.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/mario-jump.png\')';
      marioBtn.style.backgroundImage = 'url("/assets/images/mario-jump.png")';

      
      // 일정 시간 후 원래 이미지로 복귀
      setTimeout(() => {
        // marioBtn.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/mario-stand.png\')';
        marioBtn.style.backgroundImage = 'url("/assets/images/mario-stand.png")';

      }, 350);
    }
    
    if (brickBtn) {
      // 벽돌 효과 (React에서는 애니메이션으로 구현 필요)
      setTimeout(() => {
        // 벽돌 애니메이션 (React에서 별도 구현 필요)
      }, 100);
    }
  }; */

  export const marioJump = (container) => {
  if (!container) return;

  const marioBtn = container.querySelector('.mario-btn');
    console.log('Selected element:', marioBtn); // 버튼 요소 확인
  const brickBtn = container.querySelector('.brick-btn');

    if (marioBtn) {
      // [✔ 변경됨] CSS 클래스 토글 방식으로 점프 이미지 변경
      marioBtn.classList.add('jumping');
      console.log('Class added:', marioBtn.classList); // 클래스 확인

      // 일정 시간 후 원래 이미지로 복원
      const jumpTimeout = setTimeout(() => {
        marioBtn.classList.remove('jumping');
        console.log('Class removed:', marioBtn.classList); // 제거 확인
      }, 350); // 복원 시간 설정

      // 컴포넌트 언마운트 시 타이머 클린업 추가
      return () => clearTimeout(jumpTimeout);
    }

  if (brickBtn) {
    brickBtn.classList.add('brick-hit');
    setTimeout(() => {
      brickBtn.classList.remove('brick-hit');
    }, 100);
  }
};
  
  // 온도 변환 (섭씨 <-> 화씨)
  export const convertTemp = (container, temperature, showCelsius) => {
    if (!container) return showCelsius;
    
    const tempElem = container.querySelector('.temperature');
    const brickBtn = container.querySelector('#brick-btn');
    
    if (!tempElem || !brickBtn) return showCelsius;
    
    if (showCelsius === false) {
      tempElem.textContent = Math.round(temperature - 273.15) + "°C";
      brickBtn.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716211/weather%20machine/btn-temp-f.png\')';
      return true;
    } else {
      tempElem.textContent = Math.round(temperature * 9 / 5 - 459.67) + "°F";
      brickBtn.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/btn-temp-c.png\')';
      return false;
    }
  };
  
  // 눈 효과 생성
  export const makeSnow = (canvasRef) => {
    if (!canvasRef || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    
    let rate = 50;
    let arc = 500;
    let time;
    let count;
    let size = 2;
    let speed = 10;
    let lights = [];
    let colors = ['#eee'];
    
    function init() {
      time = 0;
      count = 0;
      
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
    }
    
    function bubble() {
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < arc; i++) {
        let li = lights[i];
        
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
      
      requestAnimationFrame(bubble);
    }
    
    init();
    bubble();
  };
  
  // 비 효과 생성
  export const makeRain = (canvasRef, dropSizeFactor, interval) => {
    if (!canvasRef || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    canvas.width = W;
    canvas.height = H;
    
    const num = 300;
    const arr = [];
    
    for (let i = 0; i < num; i++) {
      arr.push({
        x: Math.random() * W,
        y: Math.random() * H,
        w: 1,
        h: Math.random() * dropSizeFactor,
        s: Math.random() * 10 + 3
      });
    }
    
    function raindrops() {
      ctx.clearRect(0, 0, W, H);
      
      for (let i = 0; i < num; i++) {
        ctx.fillStyle = 'rgba(158, 202, 255, 1.0)';
        ctx.fillRect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
      }
      
      makeItRain();
      
      requestAnimationFrame(raindrops);
    }
    
    function makeItRain() {
      for (let i = 0; i < num; i++) {
        arr[i].y += arr[i].s;
        if (arr[i].y >= H) {
          arr[i].y = -arr[i].h;
        }
      }
    }
    
    raindrops();
  };
  
  // 날씨 배경 설정
  export const setWeatherBackground = (container, description, dayOrNight) => {
    if (!container) return;
    
    switch (description.toLowerCase()) {
      case "thunderstorm":
        cardThunderstorm(container, dayOrNight);
        break;
      case "drizzle":
        cardDrizzle(container, dayOrNight);
        break;
      case "rain":
        cardRain(container, dayOrNight);
        break;
      case "snow":
        cardSnow(container, dayOrNight);
        break;
      case "atmosphere":
        cardAtmosphere(container, dayOrNight);
        break;
      case "clear":
        cardClear(container, dayOrNight);
        break;
      case "clouds":
        cardClouds(container, dayOrNight);
        break;
      case "extreme":
        cardExtreme(container, dayOrNight);
        break;
      case "additional":
        cardAdditional(container, dayOrNight);
        break;
      default:
        cardClear(container, dayOrNight);
    }
  };
  
  // 날씨 상태별 배경 설정 함수들
  function cardClear(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#5C94FC';
      
      const sunWrapper = document.createElement('div');
      sunWrapper.className = 'sun-wrapper';
      sunWrapper.innerHTML = '<div class="sun-inner"><img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716209/weather%20machine/sun-animated.gif\'></div>';
      
      const displayedData = container.querySelector('.displayed-data');
      if (displayedData) {
        displayedData.insertAdjacentElement('afterend', sunWrapper);
      }
    } else {
      container.style.backgroundColor = '#090F1B';
      
      const starElem = document.createElement('div');
      starElem.className = 'star';
      starElem.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716209/weather%20machine/star.png\'>';
      
      const displayedData = container.querySelector('.displayed-data');
      if (displayedData) {
        displayedData.insertAdjacentElement('afterend', starElem);
      }
    }
  }
  
  function cardThunderstorm(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      // 비구름 요소 추가
      for (let i = 1; i <= 4; i++) {
        const cloudRain = document.createElement('div');
        cloudRain.id = `cloud-rain-${i}`;
        cloudRain.className = 'cloud-rain';
        cloudRain.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-rain.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudRain);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#1528A2';
      container.style.animationName = 'thunderday';
    } else {
      container.style.backgroundColor = '#020514';
      container.style.animationName = 'thundernight';
    }
    
    // 캔버스가 있을 경우 비 효과 추가
    const canvas = container.querySelector('#particle');
    if (canvas) {
      makeRain({ current: canvas }, 25, 5);
    }
  }
  
  function cardSnow(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-snow.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      // 구름 요소 추가
      for (let i = 1; i <= 2; i++) {
        const cloudSimple = document.createElement('div');
        cloudSimple.id = `cloud-simple-${i}`;
        cloudSimple.className = 'cloud-simple';
        cloudSimple.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-simple.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudSimple);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#2142FF';
    } else {
      container.style.backgroundColor = '#060E39';
      
      const starElem = document.createElement('div');
      starElem.className = 'star';
      starElem.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/star.png\'>';
      
      if (displayedData) {
        displayedData.insertAdjacentElement('afterend', starElem);
      }
    }
    
    // 캔버스가 있을 경우 눈 효과 추가
    const canvas = container.querySelector('#particle');
    if (canvas) {
      makeSnow({ current: canvas });
    }
  }
  
  
  function cardClouds(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      // 구름 요소 추가
      for (let i = 1; i <= 4; i++) {
        const cloudDouble = document.createElement('div');
        cloudDouble.id = `cloud-double-${i}`;
        cloudDouble.className = 'cloud-double';
        cloudDouble.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-double.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudDouble);
      }
      
      for (let i = 1; i <= 2; i++) {
        const cloudSimple = document.createElement('div');
        cloudSimple.id = `cloud-simple-${i}`;
        cloudSimple.className = 'cloud-simple';
        cloudSimple.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-simple.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudSimple);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#5C94FC';
    } else {
      container.style.backgroundColor = '#090F1B';
    }
  }
  
  function cardDrizzle(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      const cloudRain = document.createElement('div');
      cloudRain.id = 'cloud-rain-2';
      cloudRain.className = 'cloud-rain';
      cloudRain.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-rain.png\'>';
      displayedData.insertAdjacentElement('afterend', cloudRain);
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#1528A2';
    } else {
      container.style.backgroundColor = '#020514';
    }
    
    // 캔버스가 있을 경우 비 효과 추가
    const canvas = container.querySelector('#particle');
    if (canvas) {
      makeRain({ current: canvas }, 5, 15);
    }
  }
  
  function cardRain(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      for (let i = 1; i <= 2; i++) {
        const cloudRain = document.createElement('div');
        cloudRain.id = `cloud-rain-${i}`;
        cloudRain.className = 'cloud-rain';
        cloudRain.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-rain.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudRain);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#1528A2';
    } else {
      container.style.backgroundColor = '#020514';
    }
    
    // 캔버스가 있을 경우 비 효과 추가
    const canvas = container.querySelector('#particle');
    if (canvas) {
      makeRain({ current: canvas }, 20, 10);
    }
  }
  
  function cardExtreme(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      for (let i = 1; i <= 4; i++) {
        const leafWrapper = document.createElement('div');
        leafWrapper.className = 'leaf-wrapper';
        
        const leafGreen = document.createElement('div');
        leafGreen.id = `leaf-green-${i}`;
        leafGreen.className = 'leaf-green';
        leafGreen.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/leaf-green.png\'>';
        
        leafWrapper.appendChild(leafGreen);
        displayedData.insertAdjacentElement('afterend', leafWrapper);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#5C94FC';
    } else {
      container.style.backgroundColor = '#090F1B';
    }
  }
  
  function cardAdditional(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    const displayedData = container.querySelector('.displayed-data');
    if (displayedData) {
      const leafWrapper = document.createElement('div');
      leafWrapper.className = 'leaf-wrapper';
      
      const leafGreen = document.createElement('div');
      leafGreen.id = 'leaf-green-1';
      leafGreen.className = 'leaf-green';
      leafGreen.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/leaf-green.png\'>';
      
      leafWrapper.appendChild(leafGreen);
      displayedData.insertAdjacentElement('afterend', leafWrapper);
      
      for (let i = 1; i <= 2; i++) {
        const cloudSimple = document.createElement('div');
        cloudSimple.id = `cloud-simple-${i}`;
        cloudSimple.className = 'cloud-simple';
        cloudSimple.innerHTML = '<img src=\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/cloud-simple.png\'>';
        displayedData.insertAdjacentElement('afterend', cloudSimple);
      }
    }
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#5C94FC';
    } else {
      container.style.backgroundColor = '#090F1B';
    }
  }
  
  function cardAtmosphere(container, dayOrNight) {
    container.style.backgroundImage = 'url(\'https://res.cloudinary.com/dt4qeehms/image/upload/v1476716210/weather%20machine/card-clear.png\')';
    
    if (dayOrNight == 1) {
      container.style.backgroundColor = '#C6D3D8';
    } else {
      container.style.backgroundColor = '#828C8F';
    }
  }