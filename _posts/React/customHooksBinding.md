---
title: "Bind 함수 - 컴포넌트와 커스텀 훅 바인딩하기"
excerpt: "chatGPT가 "

categories:
  - React
tags:
  - [react, api, library, hooks, binding, custom hooks, function component]

toc: true
toc_sticky: true
 
date: 2023-08-17
last_modified_at: 2023-08-18
---

chatGPT랑 같이 코드 짰던거라 대화 대용을 토대로 블로그 글로 써달라고 부탁해봤다, 아래 내용은 모두 GPT가 작성한 초안을 검토해서 올린 글이다.
'습니다'체 말고 '이다' 체로 작성하도록 해달라고 했더니 좀 웃긴 글이 됐다..;

## Bind 함수로 컴포넌트랑 훅 한 번에 묶는 꿀팁!
#### Bind 함수가 뭐하는 놈이냐?
코드를 깔끔하게 유지하려고 컴포넌트 디자인하고 로직 구현하는 걸 따로따로 하자니, 그때마다 컴포넌트에 로직을 연결하는게 귀찮더라. 그래서 생각해낸 게 바로 이 Bind 함수야. 한 번에 컴포넌트랑 custom hook을 묶어준다!

#### Bind 함수 뭐가 좋아?
이제 custom hook과 컴포넌트 디자인을 아주 깔끔하게 분리할 수 있어. 한 번에 묶어서 쓸 수 있어서 매번 컴포넌트에 로직 넣는 거 걱정 안 해도 돼.

#### 코드 한 번 볼까?
- 제일 많이 만드는 TODO List로 예시를 짜봤다.
  1. 바인딩 해주는 함수를 추상화 해준다.
 
    ```jsx
    // Bind Function
    function Bind<T, P>(hookFn: () => T, Component: React.ComponentType<T & P>) {
      return function WrappedComponent(props: P): React.ReactElement | null {
        const hookResults = hookFn();
        return <Component {...hookResults} {...props} />;
      };
    }
    ```
    
  2. 커스텀 훅에 로직을 작성한다.
     
    ```jsx
    // Custom Hook
    function useTodoLogic() {
      const [todos, setTodos] = useState([]);
    
      // ...로직들
    
      return { todos, setTodos };
    }
    ```

  3. 자식 함수에 로직이 들어갈 수 있도록 바인딩 해준다.
     나는 이런식으로 바인딩을 했는데 다른 방식으로 해도 괜찮을 것 같다

    ```jsx
    // Child Component
    const TodoList: React.FC<typeof useTodoLogic> = ({ todos }) => {
      return (
        <ul>
          {todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
        </ul>
      );
    }
    
    export default Bind(useTodoLogic, TodoList);
    ```

  4. 부모 컴포넌트에 자식을 import 해서 사용한다.
     
    ```jsx
    // Parent Component
    ```
