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
    UI 그리는거야 어렵지 않으니까..     
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

    <img width="120" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/7a0570f1-9e0e-4bab-955c-50544f4bcdab">



- 후기