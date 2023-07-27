---
title: "React useState 톺아보기 #1 주의사항과 예시"
excerpt: "리액트를 다루는 기술 스터디 #7-1 - Hooks: useState"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, state, useState]

toc: true
toc_sticky: true
 
date: 2023-05-08
last_modified_at: 2023-06-13
---

### 주의
##### 업데이트 시점
  - 상태 설정 함수를 통해서 새로운 상태(state)를 업데이트 하면 업데이트된 값은 리렌더링 이후(스크린에 그려진 이후)에 반영함    
    그 전에 상태 값을 호출하면 새로운 상태 값이 아닌 기존의 상태 값을 반환 받음. 새로운 상태 값을 사용하고 싶다면 리렌더링 된 이후에 사용하면 됨
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
  - 만약 이미 상태 설정 함수가 호출되고 리렌더링이 이뤄지고 있는데 같은 상태 설정 함수를 업데이트 해준다면 그건 반영이 되지 않음
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
    - 이런 특성은 React의 state가 스냅샷과 같이 작동하기 때문   
        상태를 스냅샷 처럼 찍어두고 원래 그려져 있던 DOM트리와 비교해서 바꾸는 느낌이라고 생각하면 될 것 같음     
          - 대충 이런 느낌    
            리렌더링 시 리액트가 해당 컴포넌트 호출     
            -> 컴포넌트가 업데이트된 내용을 스냅샷으로 뽑아서 리액트한테 줌     
            -> 리액트가 DOM트리를 비교함     
        그러니까 세번 호출되는 것은 맞지만 그 세번의 상태 설정 함수에 들어간 number값은 모두 같았던 것
      ```jsx
      ...

      const [number, setNumber] = useState(0);
      // 초기값을 0으로 전달해 줬으니 리액트는 0이라는 스냅샷을 가지고 있음
      // 해당 스냅샷으로 리렌더링이 완료되기 전까지 계속 사용함

      const handleClick = () => {
        setNumber(number + 1); // 이 줄에서 업데이트가 이루어지고 해당 상태 값을 가지고 다음 줄로 넘어가는게 아닌 것
        setNumber(number + 1); // 결국 여기도 위와 똑같은 number 값을 전달 받게 됨
        setNumber(number + 1);
        console.log('set 함수를 호출 시 함께 호출되는 콘솔 로그', number);
      };

      ...
      ```

  - 이 문제는 업데이트 함수로 전달하면 해결 됨 [state updater function](https://react.dev/learn/queueing-a-series-of-state-updates#updating-the-same-state-multiple-times-before-the-next-render)
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

    - 상태 설정 함수에 업데이트 값을 함수로 전달하니 내가 원하는대로 나오는 것을 볼 수 있음 
      ![화면-기록-2023-05-17-오후-7 33 43_1](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/bb66b2a7-60bf-41d2-84d4-4d191b11ed70)
      - 대충 이렇게 동작하는 듯     
        함수로 전달하게 될 경우 리액트 큐에 해당 함수를 넣게됨     
        -> 이벤트 핸들러 내부의 코드가 모두 수행 됨     
        -> 다음 렌더링이 실행되는 동안 리엑트는 큐에 남아있는 작업을 수행함    
      
##### 최적화
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

  - 두 번 까지는 리렌더링을 해주지만 그 이후로는 해주지 않음
    ![화면-기록-2023-05-16-오후-8 32 21](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/f016860a-1ca6-494e-bcaf-a5aee2139e74)

##### 여러 state 업데이트
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
            현재 숫자: <b>{number}</b><br />
            이름: <b>{name}</b><br />
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
    (중간에 한번 리렌더링을 안하는데 그건 숫자, 이름, 시간이 모두 동일한 값으로 들어갔기 때문)
    ![화면-기록-2023-05-16-오후-8 55 09](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/37d1a9ec-ad99-4f47-b070-6c593b65f622)     


###### 출처 1: 리액트를 다루는 기술(개정판) - 김민준 저
###### [출처 2: react.dev](https://react.dev/reference/react/useState)


### useState와 useRef

| useState | useRef |
| --- | --- |
|return: `current: initialValue`|return: `[value, setValue]`|
|변경 시 리렌더링 발생하지 않음|변경 시 리렌더링 발생|
|렌더링과 관계없이 current의 value를 수정 및 업데이트 가능|'불변 객체', 렌더링 순서에 맞춰서 변경해야하며 setting 함수로만 state 수정 가능|
|렌더링 되는 동안 current 값을 읽거나 사용할 수 없음|아무때나 state를 읽어올 수 있음(매 렌더링마다 state의 값을 스냅샷으로 가지고 있으며, 해당 값을 가져올 수 있음)|