---
title: "리액트 컴포넌트 반복"
excerpt: "리액트를 다루는 기술 스터디 #5 - 컴포넌트 반복 [map]"

categories:
  - React
tags:
  - [react, javascript, library, map]

toc: true
toc_sticky: true
 
date: 2023-04-24
last_modified_at: 2023-04-26
---


### 배열 메소드를 통해 컴포넌트 반복 다루기
- 자바스크립트 배열의 map()함수를 통해서 반복되는 컴포넌트를 다룸

#### map 함수란?(아주 간단히)
- 자바스크립트 배열 객체의 내장 함수
- 파라미터로 전달된 함수를 사용하여 배열 내 각 요소를 원하는 규칙에 따라 수행 후 새로운 배열을 리턴함
- 예시
  ```js
  var numbers = [1, 2, 3, 4, 5];

  var processed = numbers.map((num) => {
    return num * num;
  });

  console.log(processed) // [1, 4, 9, 16, 25] 복사본 반환
  console.log(numbers) // [1, 2, 3, 4, 5] 기존 배열 값은 변하지 않음
  ```

#### 컴포넌트에 활용해보기
- 컴포넌트 내부에서 JSX와 함께 작성할 수 있음
- JSX로 작성할때는 DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 됨
- 컴포넌트나 DOM요소를 map으로 반복 하게 될때는 react에서 어떤 순서의 DOM 값에서 변화가 있었는지 식별 할 수 있도록 꼭 key를 넣어줘야 함
- key 값은 언제나 유일해야 하며, 데이터가 가진 고윳값이나 배열의 index로 설정해줌
  ```jsx
  const IterationSample = () => {
    const names = ['snowman', 'ice', 'snow', 'wind'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);

    return <ul>{nameList}</ul>;
  }
  ```
  - 결과 화면
    <img border="1px solid #c4c4db" width="619" alt="image" src="https://user-images.githubusercontent.com/65106740/235340915-349807a0-b8f4-47f9-a24a-332f18cc0ef6.png">


#### 요소 추가하기
- 배열에 요소를 추가해주는 이벤트를 만들어주고 이벤트를 실행시키면 자동으로 요소가 출력됨
  ```jsx
  import { useState } from 'react';

  const FunctionMap = () => {
    // 배열 key값을 위해 유니크한 값의 id를 넣어주었다. 중복되면 안된다.
    // 업데이트하고 해당 데이터를 유지해야하기 때문에 state에 넣어주었다.
    const [names, setNames] = useState([
      { id: 1, text: 'snowman' },
      { id: 2, text: 'ice' },
      { id: 3, text: 'snow' },
      { id: 4, text: 'wind' },
    ]);
    const [inputText, setInputText] = useState('');
    // 배열에 추가될 요소의 id 값을 정해줄 state, 지금은 id를 4까지 지정해 두었기 때문에 초기값을 5로 넣었다.
    const [nextId, setNextId] = useState(5);

    const nameList = names.map((name, index) => <li key={name.id}>{name.text}</li>);

    const handleChange = (e) => setInputText(e.target.value);

    const handleButtonClick = () => {
      // 배열에 추가해줄 새로운 요소 객체를 만들어 준다.
      const addName = names.concat({ id: nextId, text: inputText });
      // 만든 요소를 setState를 통해서 해당 배열 state에 넣어준다.
      setNames(addName);
      // key값을 위해서 만든 id는 중복될 수 없으므로 이벤트가 실행될 때마다 nextId를 1씩 더해준다.
      setNextId(nextId + 1);
      setInputText('');
    };

    return (
      <div>
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={handleButtonClick}>추가</button>
        <ul>{nameList}</ul>
      </div>
    );
  };

  export default FunctionMap;
  ```
  1. 배열에 요소를 추가해주는 이벤트 버튼을 누름
  1. 버튼 클릭 시 새로운 요소를 만들고 배열에 추가함
  1. 자동으로 map을 통해서 띄운 DOM요소 또는 컴포넌트에 반영됨
  - 결과 화면
    ![map add event](https://user-images.githubusercontent.com/65106740/235107023-7e516acf-9910-4dde-bed8-245e5a247c8b.gif)

#### 배열속 요소 삭제하기
- 추가하는 것을 해봤으니 삭제하는 것도 해보자
  ```jsx
  import { useState } from 'react';

  const FunctionMap = () => {
    ( ... ) // 기존에 작성된 코드

    const nameList = names.map((name, index) => (
      <div key={name.id} style={{ display: 'flex', justifyContent: 'space-between', width: '146px' }}>
        <li>{name.text}</li>
        <button onClick={() => hanldeDelete(name.id)}>삭제</button>
      </div>
    ));

    const hanldeDelete = (id) => {
      const newNames = names.filter((name) => name.id !== id);
      setNames(newNames);
    };

    ( ... )
    
    return ( ... );
  };

  export default FunctionMap;
  ```
  - 순서는 추가해주는 것과 같다. (버튼 클릭 -> 삭제 -> 자동 반영)
  - 결과 화면
    ![map delete event](https://user-images.githubusercontent.com/65106740/235114475-8b408467-fed0-4fa9-ab72-d1a4d4152dfd.gif)