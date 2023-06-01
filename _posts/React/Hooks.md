---
title: "함수 컴포넌트의 Hooks"
excerpt: "리액트를 다루는 기술 스터디 #7-2 - Hooks"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks]

toc: true
toc_sticky: true
 
date: 2023-05-10
last_modified_at: 2023-05-20
---

#### useReducer
- 다양한 상태를 다양한 상황에 따라서 다른 값으로 업데이트 해줄 수 있는 hook
- 현재 상태와 업데이트 행위를 담은 함수를 전달받고 새로운 상태를 반환
- 기본 형태
  ```js
  [state, dispatch] = useReducer({reducer 함수}, {초기 state 값})
  ```
  - state(상태 값)
  - dispatch    
    액션을 발생시키는 함수
    dispatch(action) 등의 형태로 사용함
  - reducer 함수     
    따로 정의 한 함수의 이름을 전달해줌
  - 초기 state 값
    초기 state 값을 지정하는 곳
    형태는 자율

#### useMemo
- 컴포넌트 내부에서 발생하는 연산을 최적화 해줄 수 있음
- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고 특정 값이 바뀌지 않았다면 이전 연산 값을 다시 사용함
- 기본 형태
  ```js
  const cachedValue = useMemo(calculateValue, dependencies)
  ```
- TODO: 예제 코드 쓰기
- 예제 화면
  ![화면-기록-2023-05-11-오후-7 16 31](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/7e4184bb-ea74-400d-80e6-6bb3f9a2ef38)


#### useRef
- 
- 

- 매 렌더링마다 리셋되는 일반 변수와 달리 리렌더링 시에도 정보를 유지할 수 있음
- state 변수와 달리 ref 값을 변경해도 리렌더링을 일으키지 않음
  - 스크린에서 유지하고자 하는 정보를 다룰때 적절함
- 공유되는 바깥 변수(variables outside)와 달리 로컬로 동작함

##### 주의
- state와 다르게 ref.current 값을 쉽게 변경할 수 있다. 하지만 만약 state 처럼 고정해야한다면 ref를 변형시키지 말아야 한다.
- ref.current 값을 변경해도 해당 컴포넌트의 리렌더링은 일어나지 않는다. ref는 순수 자바스크립트 객체라서 리액트에서 ref의 변화를 감지할 수 없기 때문이다.
- 초기렌더링 외에는 렌더링 되는 동안 ref.current를 읽거나 쓰게되면 해당 컴포넌트는 예측하기 어렵게 되기 때문에 읽거나 쓰지 말아야 한다.
- 리액트가 스트릭 모드에서는 정확한 렌더링을 돕기 위해서 컴포넌트를 두 번 콜한다.(development 모드만 해당하며 production은 해당하지 않는다.) 따라서 모든 ref는 두 번 생성되지만 하나는 버려진다. 만약 함수를 순수하게 잘 작성했다면 이런 특징은 아무런 영향을 끼치지 못할 것이다.

##### 예시
- ref를 이용한 Web Api 이용
  ```jsx
  import { useRef } from 'react';

  const Ref = () => {
    // Referencing a value with a ref
    // Ref는 초기값을 가진 current 속성만을 returen 함
    // 다음 렌더링에서도 같은 값을 return 함, ref는 state 처럼 변경하거나 읽어올 수 있지만 ref를 변경한다고 해서 리렌더링이 일어나지는 않음
    const intervalRef = useRef(0);

    const handleStartClick = () => {
      const intervalId = setInterval(() => {
        console.log('seted interval');
      }, 300);
      intervalRef.current = intervalId;
    };

    const handleStopClick = () => {
      const intervalId = intervalRef.current;
      clearInterval(intervalId);
    };

    return (
      <div>
        <hr />
        <h3>useRef</h3>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </div>
    );
  };

  export default Ref;

  ```
  - 결과 화면
    ![ref setInterval](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/a5ae42d3-7de9-4b7f-a328-2c4d845f9981)

