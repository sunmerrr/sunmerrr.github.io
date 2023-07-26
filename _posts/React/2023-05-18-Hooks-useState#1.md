---
title: "React useState 톺아보기 #1 사용법과 예시"
excerpt: "리액트를 다루는 기술 스터디 #7-1 - Hooks: useState"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, state, useState]

toc: true
toc_sticky: true
 
date: 2023-05-08
last_modified_at: 2023-05-18
---

**가장 자주 사용하고, 가장 친숙한 state를 사용할때 주의해야하는 점 위주로 작성함**     
**리액트 블로그를 보고 작성하는데 생각보다 내용이 너무 많아서 다 적지는 못했음**

## useState
- 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해줘서 상태 관리를 가능하게 해줌
- 기본 형태
  ```js
  const [state, setState] = useState(initialState);
  ```
- 상태 설정 함수(setState)를 호출하면 컴포넌트는 상태(state) 값을 업데이트하면서 해당 컴포넌트도 새로 리렌더링 함

### 사용
- 업데이트 되는 상태값이 필요 할 때
- 업데이트 이전의 값을 토대로 업데이트 되는 상태값이 필요 할 때
- 이전 렌더링에서의 내용을 저장해야 할 때

### 특징
- 상태 설정 함수를 통해서 상태를 업데이트 하면 해당 컴포넌트와 자식 컴포넌트 들에게 리렌더링 일어남
- 초기값(inisialState)은 첫렌더링 이후 상태가 업데이트 되면 무시함
- 상태 설정 함수를 통해서 업데이트 하지 않는 상태는 렌더링 되어도 이전 상태를 유지함
- 여러개의 상태를 사용할 수 있고, 배열, 객체 등의 다양한 형태의 값을 넣어줄 수 있음
- 상태 설정 함수를 통하지 않고 직접 상태를 업데이트 하면 안됨

### 예제
##### 숫자, 문자 등 업데이트
  ```jsx
  import { useState } from 'react';

  const State = () => {
    const [number, setNumber] = useState(0); // 상태와 상태 설정 함수의 이름은 편하게 지어주면 된다.

    return (
      <div>
        <p>
          현재 숫자: <b>{number}</b>
        </p>
        <button onClick={() => setNumber(number + 1)}>+ 1</button> // 버튼을 누르면 +1 해주는 이벤트를 걸었다.
        <button onClick={() => setNumber(number - 1)}>- 1</button> // 버튼을 누르면 -1 해주는 이벤트를 걸었다.
      </div>
    );
  };

  export default State;
  ```

  - 결과 화면
    ![화면-기록-2023-05-18-오후-8 28 17](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/fb33a578-15da-4eb2-a6ad-37cacf90e866)

##### 배열 업데이트
  ```jsx
  import { useState } from 'react';

  let nextId = 3;
  const initialTodos = [
    { id: 1, title: '블로그 쓰기', done: false },
    { id: 2, title: '요가 하기', done: false },
    { id: 3, title: '도시락 만들기', done: false },
  ];

  const TodoList = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [title, setTitle] = useState('');

    function handleAdd(title) {
      setTodos([
        ...todos,
        {
          id: ++nextId,
          title: title,
          done: false,
        },
      ]);
    }

    function handleChange(nextTodo) {
      setTodos(
        todos.map((t) => {
          if (t.id === nextTodo.id) {
            return nextTodo;
          } else {
            return t;
          }
        }),
      );
    }

    function handleDelete(todoId) {
      setTodos(todos.filter((t) => t.id !== todoId));
    }

    return (
      <div>
        <input placeholder="Add Todo" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button
          onClick={() => {
            setTitle('');
            handleAdd(title);
          }}
        >
          추가
        </button>
        <ul style={{ padding: '0' }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ listStyleType: 'none' }}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => {
                    handleChange({
                      ...todo,
                      done: e.target.checked,
                    });
                  }}
                />
                {todo.title}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default TodoList;
  ```
  
  - 결과 화면
    ![state-array](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/ada5f40d-f1a4-44c8-83c3-24a591424ac6)

  
##### 객체 업데이트
  ```jsx
  import { useState } from 'react';

  const State = () => {
    const [form, setForm] = useState({ name: 'summer', phoneNumber: '010-', birthDay: '2023.' });

    const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
      <div>
        <label>
          name:
          <input type="text" placeholder="name" value={form.name} name="name" onChange={handleInput}></input>
        </label>
        <br />
        <label>
          phone number:
          <input
            type="text"
            placeholder="phoneNumber"
            value={form.phoneNumber}
            name="phoneNumber"
            onChange={handleInput}
          ></input>
        </label>
        <br />
        <label>
          birth day:
          <input type="text" placeholder="birthDay" value={form.birthDay} name="birthDay" onChange={handleInput}></input>
        </label>
        <p>
          {form.name} / {form.phoneNumber} / {form.birthDay}
        </p>
      </div>
    );
  };

  export default State;
  ```

  - 결과 화면
    ![ezgif-3-b523f178f7](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/28db2de5-a7b3-402d-98a2-f628b0f8c850)
