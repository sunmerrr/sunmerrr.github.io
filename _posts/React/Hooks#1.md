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
- 주의
  - 상태 설정 함수는 새로운 상태에 대해 리렌더링 이후에 반영됨. 그 전에 상태 값을 호출하면 새로운 상태 값이 아닌 기존의 상태 값을 반환 받음. 새로운 상태 값을 보고 싶다면 리렌더링 된 이후(스크린에 그려진 이후)에 상태값을 사용하면 됨.
    - 예시
      ```jsx
      import { useState } from 'react';

      const State = () => {
        const [number, setNumber] = useState(0);

        const handleClick = () => {
          setNumber(number + 1);
          console.log('state를 스크린에 그려지기 전에 호출함 = 효과 적용 안됨', number);
        };

        return (
          <div>
            <p>
              현재 숫자: <b>{number}</b>
            </p>
            {console.log('state를 스크린에 그려진 이후에 호출함 = 원하는 효과가 적용됨', number)}
            <button onClick={handleClick}>+ 1</button>
            <button onClick={() => setNumber(number - 1)}>- 1</button>
          </div>
        );
      };

      export default State;
      ```
    - 이렇게 된다는 것
      ![화면-기록-2023-05-15-오후-7 03 52](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/6ef300da-ffe8-41f1-8fcb-66e368e7aff9)
    - 만약 이미 함수가 돌아가고 있는데 또 상태 설정 함수를 업데이트 해준다면 그건 반영이 되지 않음
      ```jsx
      import { useState } from 'react';

      const State = () => {
        const [number, setNumber] = useState(0);

        const handleClick = () => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
          console.log('set 함수를 호출 시 함께 호출되는 콘솔 로그', number);
        };

        return (
          <div>
            <p>
              현재 숫자: <b>{number}</b>
            </p>
            {console.log('초기 렌더링과 리렌더링 시 함께 호출되는 콘솔 로그', number)}
            <button onClick={handleClick}>+ 1</button>
          </div>
        );
      };

      export default State;
      ```
    - 나는 분명 setNumber() 를 세번 콜 해서 버튼을 누를 때 마다 +3이 되도록 설정했는데 누를 때마다 +1만 적용된 것을 볼 수 있음
      ![화면-기록-2023-05-17-오후-7 34 25 (1)](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/22d3e0de-f245-4b01-9583-ab8f98412ff4)
      - 이런 특성은 
        1. React의 state가 스냅샷과 같이 작동하기 때문   
          내가 업데이트 하는 내용을 스냅샷 처럼 찍어두고 원래 그려져 있던 DOM트리와 비교해서 바꾸는 느낌이라고 생각하면 될 것 같다. 
            - 대충 이런 느낌    
              리렌더링 시 리액트가 해당 컴포넌트 호출     
              -> 컴포넌트가 업데이트된 내용을 스냅샷으로 뽑아서 리액트한테 줌     
              -> 리액트가 DOM트리를 비교함     
        1. 상태 설정 함수는 다음 렌더링을 위해서 상태를 업데이트 하기 때문    
          그러니까 함수로 전달해주지 않았을때는 세번 호출됐지만 그 세번의 상태 설정 함수에 들어간 number값을 모두 같았던 것
    - 이 문제는 함수로 전달하게되면 달라짐
      ```jsx
      import { useState } from 'react';

      const State = () => {
        const [number, setNumber] = useState(0);

        const handleClick = () => {
          setNumber((number) => number + 1);
          setNumber((number) => number + 1);
          setNumber((number) => number + 1);
          console.log('set 함수를 호출 시 함께 호출되는 콘솔 로그', number);
        };

        return (
          <div>
            <p>
              현재 숫자: <b>{number}</b>
            </p>
            {console.log('초기 렌더링과 리렌더링 시 함께 호출되는 콘솔 로그', number)}
            <button onClick={handleClick}>+ 1</button>
          </div>
        );
      };

      export default State;
      ```
      - 상태 설정 함수에 업데이트 값을 함수로 전달하니 내가 원하는대로 나오는 것을 볼 수 있음 [state updater function 참고](https://react.dev/learn/queueing-a-series-of-state-updates#updating-the-same-state-multiple-times-before-the-next-render)
        ![화면-기록-2023-05-17-오후-7 33 43_1](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/bb66b2a7-60bf-41d2-84d4-4d191b11ed70)
        - 대충 이렇게 동작하는 듯     
          함수로 전달하게 될 경우 리액트 큐에 해당 함수를 넣게됨     
          -> 이벤트 핸들러 내부의 코드가 모두 수행 됨     
          -> 다음 렌더링이 실행되는 동안 리엑트는 큐에 남아있는 작업을 수행함     
        
  - 최적화로 인해서 state에 기존에 있던 것과 똑같은 값을 전달해주면 리엑트에서 리렌더링을 스킵함
    - 위의 코드를 같은 값을 전달해주는 것으로 변경해보았다.
      ```jsx
      import { useState } from 'react';

      const State = () => {
        const [number, setNumber] = useState(0);

        const handleClick = () => {
          setNumber(1);
          console.log('sset 함수를 호출 시 함께 호출되는 콘솔 로그', number);
        };

        return (
          <div>
            <p>
              현재 숫자: <b>{number}</b>
            </p>
            {console.log('초기 렌더링과 리렌더링 시 함께 호출되는 콘솔 로그', number)}
            <button onClick={handleClick}>1</button>
          </div>
        );
      };

      export default State;
      ```
    - 2번 까지는 리렌더링을 해주지만 그 이후로는 해주지 않음
      ![화면-기록-2023-05-16-오후-8 32 21](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/f016860a-1ca6-494e-bcaf-a5aee2139e74)
      
  - 이벤트를 통해서 여러 state의 set 함수가 호출되더라도 한번의 리렌더링만 발생함
    - 버튼을 누르면 각기 다른 state를 업데이트해주는 함수를 호출함
      ```jsx
      import { useState } from 'react';

      const State = () => {
        const [number, setNumber] = useState(0);
        const [name, setName] = useState('');
        const [date, setDate] = useState(Date());

        const handleNumber = () => {
          setNumber(1);
          console.log('number set 함수를 호출', number);
        };

        const handleName = () => {
          setName('여름');
          console.log('name set 함수를 호출', name);
        };

        const handleDate = () => {
          setDate(Date());
          console.log('date set 함수를 호출', date);
        };

        return (
          <div>
            <p>
              현재 숫자: <b>{number}</b>
              <br />
              이름: <b>{name}</b>
              <br />
              시간: <b>{date}</b>
            </p>
            {console.log('초기 렌더링과 리렌더링 시 함께 호출되는 콘솔 로그', number)}
            <button
              onClick={() => {
                handleNumber();
                handleName();
                handleDate();
              }}
            >
              적용
            </button>
          </div>
        );
      };

      export default State;
      ```
    - 각 set함수가 호출될때마다 리렌더링 되는 것이 아니라 모든 state가 업데이트 된 이후에 렌더링을 진행함    
      (중간에 한번 렌더링을 안하는데 그건 숫자, 이름, 시간이 모두 동일한 값으로 들어갔기 때문)
      ![화면-기록-2023-05-16-오후-8 55 09](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/37d1a9ec-ad99-4f47-b070-6c593b65f622)
  

- 예제
  ```jsx
  import { useState } from 'react';

  const testFuntion = () => {
    console.log('initialize state');
  };
  const State = () => {
    const [number, setNumber] = useState(0);

    return (
      <div>
        <p>
          현재 숫자: <b>{number}</b>
        </p>
        <button onClick={() => setNumber(number + 1)}>+ 1</button>
        <button onClick={() => setNumber(number - 1)}>- 1</button>
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

