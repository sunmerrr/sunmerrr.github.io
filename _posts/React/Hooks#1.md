---
title: "함수 컴포넌트의 Hooks"
excerpt: "리액트를 다루는 기술 스터디 #7-1 - Hooks"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks]

toc: true
toc_sticky: true
 
date: 2023-05-08
last_modified_at: 2023-05-10
---

### 함수 컴포넌트에서 할 수 없었던 다양한 작업을 가능하게 해주는 Hooks
- 리액트 v16.8부터 도입됨
- 내장 함수들은 react로 부터 import 하면 사용 가능

#### useState
- 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해줘서 상태 관리를 가능하게 해줌
- 기본 형태
  ```js
  const [state, setState] = useState(initialState);
  ```
- 상태 설정 함수(setState)를 호출하면 컴포넌트는 상태 값을 업데이트하면서 해당 컴포넌트도 새로 리렌더링 함
- 사용
  - 업데이트 되는 상태값이 필요 할 때
  - 업데이트 이전의 값을 토대로 업데이트 되는 상태값이 필요 할 때
  - 초기값은 첫렌더링 이후 업데이트 되면 무시함
  - 이전에 렌더링에서의 내용을 저장해줌
  - 상태 설정 함수는 새로운 상태에 대해 리렌더링 이후에 반영. 그 전에 상태 값을 호출하면 새로운 상태 값이 아닌 기존의 상태 값을 반환 받음. 새로운 상태 값을 보고 싶다면 리렌더링 된 이후(스크린에 그려진 이후)에 상태값을 사용하면 됨.

- TODO: 아래 내용 정리
  <!-- Updating state based on the previous state 
  Suppose the age is 42. This handler calls setAge(age + 1) three times:

    ```js
    function handleClick() {
      setAge(age + 1); // setAge(42 + 1)
      setAge(age + 1); // setAge(42 + 1)
      setAge(age + 1); // setAge(42 + 1)
    }
    ```
  However, after one click, age will only be 43 rather than 45! This is because calling the set function does not update the age state variable in the already running code. So each setAge(age + 1) call becomes setAge(43).

  To solve this problem, you may pass an updater function to setAge instead of the next state:
    ```js
    function handleClick() {
      setAge(a => a + 1); // setAge(42 => 43)
      setAge(a => a + 1); // setAge(43 => 44)
      setAge(a => a + 1); // setAge(44 => 45)
    }
    ```

  Here, a => a + 1 is your updater function. It takes the pending state and calculates the next state from it.

  React puts your updater functions in a queue. Then, during the next render, it will call them in the same order:

  a => a + 1 will receive 42 as the pending state and return 43 as the next state.
  a => a + 1 will receive 43 as the pending state and return 44 as the next state.
  a => a + 1 will receive 44 as the pending state and return 45 as the next state.
  There are no other queued updates, so React will store 45 as the current state in the end.

  By convention, it’s common to name the pending state argument for the first letter of the state variable name, like a for age. However, you may also call it like prevAge or something else that you find clearer.

  React may call your updaters twice in development to verify that they are pure. -->

- 예제
  ```jsx
  import { useState } from 'react';

  const testFuntion = () => {
    console.log('initialize state');
  };
  const State = () => {
    const [number, setNumber] = useState(0);
    const [test, setTest] = useState(testFuntion);

    return (
      <div>
        <p>
          현재 숫자: <b>{number}</b>
        </p>
        <button onClick={() => setNumber(number + 1)}>+ 1</button>
        <button onClick={() => setNumber(number - 1)}>- 1</button>
        <br />
        <br />
        <br />
      </div>
    );
  };

  export default State;
  ```

#### useEffect
- 랜더링 이후에 실행됨
- 클래스형에서 componentDidMount와 componentDidUpdate를 합친 형태
- 기본 형태
  ```js
  useEffect(() => {
    {렌더링 완료}
    return {뒷정리}
  }, [의존 배열])
  ```
  - 렌더링 이후    
    렌더링 이후에 실행할 내용을 작성
  - 뒷정리(clean up)     
    언마운트 또는 업데이트 되기 직전에 실행할 내용을 return 뒤에 작성
  - 의존 배열(dependency array)    
    첫 렌더링 시에만 실행되게 하고 싶다면 빈 배열로 둠
    특정 값이 변할때마다 실행하고 싶다면 의존 배열에 해당 특정 값을 넣음
    배열 이라서 특정 값이 여러개여도 상관 없음

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

