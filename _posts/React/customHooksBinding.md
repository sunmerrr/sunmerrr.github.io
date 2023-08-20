---
title: "Bind 함수 - 컴포넌트와 커스텀 훅 바인딩하기 with chatGPT"
excerpt: "chatGPT가 쓴 블로그"

categories:
  - React
tags:
  - [react, api, library, hooks, binding, custom hooks, function component, chatGPT]

toc: true
toc_sticky: true
 
date: 2023-08-17
last_modified_at: 2023-08-19
---

*bind 함수를 작성하면서 만났던 에러를 chatGPT한테 물어보며 해결했고, 해당 내용을 토대로 블로그 글을 써달라고 부탁해봤다, 아래 내용은 모두 GPT가 작성한 초안을 검토해서 올린 글이다.*     
*'습니다'체 말고 '이다' 체로 작성하도록 부탁했더니 좀 웃긴 글이 됐다..;*

## Bind 함수로 컴포넌트랑 훅 한 번에 묶는 꿀팁!
#### Bind 함수가 뭐하는 놈이냐?
코드를 깔끔하게 유지하려고 컴포넌트 디자인하고 로직 구현하는 걸 따로따로 하자니, 그때마다 컴포넌트에 로직을 연결하는게 귀찮더라. 그래서 생각해낸 게 바로 이 Bind 함수야. 한 번에 컴포넌트랑 custom hook을 묶어준다!

#### Bind 함수 뭐가 좋아?
이제 custom hook과 컴포넌트 디자인을 아주 깔끔하게 분리할 수 있어. 한 번에 묶어서 쓸 수 있어서 매번 컴포넌트에 로직 넣는 거 걱정 안 해도 돼.

#### 코드 한 번 볼까?
제일 많이 만드는 TODO List로 예시를 짜봤다.
1. 바인딩 해주는 함수를 추상화 해준다.

    ```tsx
    // Bind Function
    function Bind<T, P>(hookFn: () => T, Component: React.ComponentType<T & P>) {
      return function WrappedComponent(props: P): React.ReactElement | null {
        const hookResults = hookFn();
        return <Component {...hookResults} {...props} />;
      };
    }
    ```
  
2. 커스텀 훅에 로직을 작성한다.    
    만약 부모가 자식에게 내려주는 props가 있다면 Custom Hook에서 받아주면 된다.
   
    ```tsx
    // Custom Hook
    function useTodoList() {
      const [todos, setTodos] = useState([]);
    
      // ...로직들
    
      return { todos, setTodos };
    }
    ```

3. 자식 함수에 로직이 들어갈 수 있도록 바인딩 해준다.
   나는 이런식으로 바인딩을 했는데 다른 방식으로 해도 괜찮을 것 같다.

    ```tsx
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
   
    ```tsx
    // Parent Component
    import TodoListComponent from './TodoList';

    const App: React.FC = () => {
      return (
        <div>
          <h1>Todo List</h1>
          <TodoListComponent />
        </div>
      );
    }
    ```

#### 어려웠던 점
1. `'Component' refers to a value, but is being used as a type here. Did you mean 'typeof Component'?``: 이게 뭔 말인가 싶었는데, 타입스크립트가 Component의 타입을 제대로 알아차리질 못해서 그랬어. 근데 React.ComponentType 쓰니까 해결되더라.
1. `Type 'T & P' is not assignable to type 'IntrinsicAttributes & T & P'``: 이것도 뭐지 싶었는데, 타입이 겹치는 부분이 있어서 발생한 거였어. 좀 바꿔보니까 해결됐다니까!

#### 장점은?
1. 로직 따로따로: 로직과 디자인을 따로 만들 수 있어서 코드 보기 좋아졌어.
1. 재사용 꿀: 같은 로직을 여러 컴포넌트에서 쓸 때 이걸로 쓰면 아주 편해.
1. 프롭스 깔끔: 바인딩해서 쓰니까 컴포넌트에 넣어줘야 할 것만 넣어주면 돼서 깔끔!

#### 단점도 있어?
1. 좀 복잡하다: 바인딩 함수를 쓰니까 코드가 좀 복잡해진 감이 있어.
1. 타입 오류 까다로움: 타입스크립트 쓸 때 타입 정의가 좀 까다로워져서 여러 번 헤맸다니까!
     

그럼 이제 너도 이 Bind 함수 써서 깔끔하게 컴포넌트와 훅을 묶어봐!

*(다시한번 말하지만 chatGPT가 작성한 초안을 검토만하고 거의 고치지 않고 올린 글이다.)*