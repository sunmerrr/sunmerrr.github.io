---
title: "컴포넌트 추상화로 재사용성 높이기"
excerpt: "추상화: 리액트로 재사용성 극대화하기"

categories:
  - React
tags:
  - [react, javascript, library, function component, abstraction]

toc: true
toc_sticky: true
 
date: 2023-08-20
last_modified_at: 2023-08-26


## 컴포넌트 추상화 기준
이번에 회사에서 내부 서비스를 개발하던 중에 select, input, button 등의 기능을 반복적으로 사용을 해야 했다. 기능은 같은데 스타일이 조금씩 달라서 따로 컴포넌트로 만들어두고 재사용하기가 애매해서 그냥 쓰고 있었다.     
그런데 코드를 새로 짜고, 유지보수 하고 하다보니 생각보다 유지보수가 어렵고 비슷하게 생겼지만 조금씩 다른 컴포넌트 때문에 헷갈리는 문제가 발생했다. 이런 문제도 해결하고, 어짜피 다른 곳에서도 잘 사용할 기능이라서 추상화를 공부하며 공용 컴포넌트로 빼보았다.

1. 내가 만든 재사용 컴포넌트 기준 + 예시
  - 공통으로 사용 될 수 있는 select, button, input 컴포넌트를 기준으로 추상화 해봤다.
  - 예시 - select component
    ```tsx
    import React from 'react';

    interface Option {
      value: string;
      label: string;
    }

    interface SelectProps {
      options: Option[]; // 선택 가능한 옵션 배열
      value: string; // 현재 선택된 값
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // 값이 변경될 때 호출되는 콜백 함수
    }

    function SelectComponent({ options, value, onChange }: SelectProps) {
      return (
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    export default SelectComponent;
    ```

  - 사용

2. 추상화 장단점
3. 타입 지정시 주의할 점