---
title: "React 함수 컴포넌트의 Hooks - useRef"
excerpt: "리액트를 다루는 기술 스터디 #8 - useRef"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, useRef]

toc: true
toc_sticky: true
 
date: 2023-07-11
last_modified_at: 2023-07-14
---

## useRef 특징
- DOM 요소나 다른 값을 저장하고 관리하는데 사용됨
- 컴포넌트의 생명주기와 상관 없이 값을 유지하기 때문에 컴포넌트 리렌더링이 일어나도 값을 유지함
- `current` 프로퍼티를 이용하지 않으면 useRef 안에 들어있는 값에 접근 할 수 없음

## 사용
- 예시
  ```jsx
  const {ref name} = useRef({initialValue})

  <div ref={ref name} ></div>
  ```
- initialValue     
  - `current` 프로퍼티에 들어가길 원하는 초기값을 넣어줌
  - 아무 타입이나 될 수 있으며, 첫 렌더링 이후에는 무시됨
- current
  - useRef가 return 하는 값
  - 초기에 넣어준 initialValue를 가지고 있으며, 추후에 value값을 변경 가능함
  - JSX node에 ref를 사용하면 React는 해당 node를 current에 넣음

##### 1. DOM 요소에 접근
- 예시
  ```jsx
  import React, { useRef } from "react";

  const FocusInputExample = () => {
    const inputRef = useRef(null);

    const handleButtonClick = () => {
      inputRef.current.focus();
      console.log('set focus to the input field');
    };

    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleButtonClick}>Focus Input</button>
      </div>
    );
  };
  ```

  - 결과 화면
    ![DOM example](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/bc72e03c-3229-4fab-b678-2b2abc3fded4)

##### 2. 값의 저장과 변경
- DOM 상태 변화에 따른 리렌더링이 필요 없을때 사용
- 예시
  ```jsx
  import React, { useRef } from "react";

  export const RefExample = () => {
    const inputRef = useRef(null);

    const handleInputChange = () => {
      const inputValue = inputRef.current.value;
      console.log("Input Value:", inputValue);
    };

    return (
      <div>
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Type something..."
        />
      </div>
    );
  };
  ```
  
  - 결과 화면
    ![DOM example](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/43d7367d-b2a3-47ec-afc9-17a9b64b4e7c)

##### 3. 외부 라이브러리와의 통합
- useRef를 사용하여 외부 라이브러리와 상호작용
- 예시
  ```jsx
  import React, { useRef } from "react";
  import Select from "react-select";

  export const ExternalLibraryExample = () => {
    const selectRef = useRef(null);

    const options = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" }
    ];

    const handleButtonClick = () => {
      // 외부 라이브러리와의 상호작용
      console.log('set focus to the select field');
      if (selectRef.current) selectRef.current.focus();
    };

    return (
      <div>
        <Select ref={selectRef} options={options} />
        <button onClick={handleButtonClick}>Set Focus to Select</button>
      </div>
    );
  };
  ```

  - 결과 화면
    ![External with useRef](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/592f3d4a-a9a4-4624-91fb-ff762384ade3)
