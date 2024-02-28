---
title: "React로 마우스, 키보드 조작이 가능한 Joystick 만들기"
excerpt: "라이브러리를 사용하지 않고 만들어보는 조이스틱"

categories:
  - React
tags:
  - [Software, Developer, Software Developer, React]

toc: true
toc_sticky: true
 
date: 2024-02-14
last_modified_at: 2024-02-14
---

## 라이브러리를 사용하지 않고 만들어보는 조이스틱

### 라이브러리 있는데 굳이 직접 만든 이유
라이브러리 적용해서 스타일이나 내가 원하는 기능 찾는 것과 직접 만드는 것 중에 어떤게 더 복잡하고 오래걸릴지를 비교해봤는데, 직접 만드는게 나중에 관리하기도 편하고 내부 api 를 연결하기도 편할 것 같았다. 하지만 가장 큰 이유는 단순히 재밌어 보였기 때문이다. 히히    
(개고생 할줄은 몰랐음)     

### 구현
이걸 혼자할수는 없었다. 내 짝꿍 GPT의 도움을 많이 받았다.    
하.지.만. GPT도 많이 틀렸다. 그래서 내가 따로 검색하고 계산하고 이런 고생도하면서 만들었다.

1. Joystick 그리기     
    시작은 또 그냥 대뜸 GPT한테 요청한다.     
    <img width="374" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/20c3643a-5272-487f-b329-2a7c8cc55232">
        
    그럼 대충 코드를 짜주는데 마음에 들지 않아서 내가 대충 짜봤다.    
    UI 그리는거야 어렵지 않으니까..(?)     
    ```tsx
    const [position, setPosition] = useState({ x: 18, y: 18 }); // 대충 중앙에 맞춰 준다. 

    return (
      <JoystickContainer >
        <JoystickStick x={position.x} y={position.y} /> // position을 업데이트 해주고 해당 업데이트된 포지션을 따라서 조시스틱의 움직임을 구현해줄 예정.
      </JoystickContainer>
    );

    // css
    const JoystickContainer = styled.div`
      position: relative;
      width: 85px;
      height: 85px;
      background-color: #2C2C2C;
      border-radius: 50%;
      overflow: hidden;
    `;

    const JoystickStick = styled.div<{ x: number; y: number }>`
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: radial-gradient(circle at 25px 25px, #444444, #141414);
      transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
      transition: transform 0.2s;
      z-index: 3;
    `;
    ```

    이렇게 하면 아래와 같은 이미지 처럼 ui가 그려진다.

    <img width="120" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/7a0570f1-9e0e-4bab-955c-50544f4bcdab">

1. 이벤트 추가하기    
    마우스 + 키보드 조작이 가능하도록 해야한다.
    - **마우스 이벤트 추가**
      ```tsx
      const [isDragging, setIsDragging] = useState(false);

      const handleMouseDown = () => {
        setIsDragging(true);
      };

      const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();

        if (isDragging) {
          const containerRect = joystickRef.current?.getBoundingClientRect();
          if (containerRect) {
            const x = event.clientX - containerRect.left - 25; // 조이스틱 중앙 정렬
            const y = event.clientY - containerRect.top - 25; // 조이스틱 중앙 정렬
            moveJoystick(x, y)
          }
        } 
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        resetJoystick()
      };

      const handleMouseLeave = () => {
        if (isDragging) {
          setIsDragging(false);
          resetJoystick();
        }
      };

      const resetJoystick = () => {
        setPosition({ x: 18, y: 18 });
      };

      <JoystickContainer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <JoystickStick x={position.x} y={position.y} />
      </ JoystickContainer>
      ```
    
    - **키보드 이벤트 추가**
      ```tsx
      const [isPressKey, setIsPressKey] = useState(false);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (isDragging) return; 

        if (!isPressKey) setIsPressKey(true);

        switch (event.key) {
          case 'ArrowUp':
            moveJoystickByKeyboard(position.x, 0);
            break;
          case 'ArrowDown':
            moveJoystickByKeyboard(position.x, 35);
            break;
          case 'ArrowLeft':
            moveJoystickByKeyboard(0, position.y);
            break;
          case 'ArrowRight':
            moveJoystickByKeyboard(35, position.y);
            break;
          default:
            break;
        }
      };

      const handleKeyUp = () => {
        if (!isDragging) {
          resetJoystick();
        }

        setIsPressKey(false);
      };

      const moveJoystickByKeyboard = (targetX: number, targetY: number) => {
        const updatePosition = () => {
          const dx = targetX - position.x;
          const dy = targetY - position.y;
          setPosition({x: position.x += dx, y: position.y += dy})
          
          updateDirection(position.x, position.y);

          // 조이스틱이 영역 끝쪽에 닿으면 업데이트 중지
          if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            setPosition({ x: targetX, y: targetY });
            updateDirection(targetX, targetY);
          } else {
            requestAnimationFrame(updatePosition);
          }
        };

        updatePosition();
      };
      ```

1. 이벤트에 따른 방향 업데이트 함수
    ```tsx
    const updateDirection = (x: number, y: number) => {
      if (!isControlOn) return;
      
      let direction = '';

      if (x > 9 && x <= 26.5 && y > -17.5 && y <= 9) { // x: 18, y: 0
        direction = 'front';
      } else if (x > -17.5 && x <= 9 && y > -17.5 && y <= 9) { // x: 0, y: 0
        direction = 'frontLeft';
      } else if (x > 26.5 && y > -17.5 && y <= 9) { // x: 35, y: 0
        direction = 'frontRight';
      } else if (x > 9 && x <= 26.5 && y > 26.5) { // x: 18, y: 35
        direction = 'back';
      } else if (x > -17.5 && x <= 9 && y > 26.5) { // x: 0, y: 35
        direction = 'backLeft';
      } else if (x > 26.5 && y > 26.5) { // x: 35, y: 35
        direction = 'backRight';
      } else if (x > -17.5 && x <= 9 && y > 9 && y <= 26.5) { // x: 0 y: 18
        direction = 'left';
      } else if ((x > 26.5) && (y > 9 && y <= 26.5)) { // x: 35, y: 18
        direction = 'right';
      }

      setArrowDirection(direction)
      onChange(direction);
    };
    ```


- 후기