---
title: "리액트 컴포넌트 추상화로 재사용성 높이기"
excerpt: "추상화: 리액트로 재사용성 극대화하기"

categories:
  - React
tags:
  - [react, javascript, library, function component, abstraction]

toc: true
toc_sticky: true
 
date: 2023-08-20
last_modified_at: 2023-08-26
---

이번에 회사에서 내부 서비스를 개발하던 중에 select, input, button 등의 기능을 반복적으로 사용을 해야 했다. 기능은 같은데 스타일이 조금씩 달라서 따로 컴포넌트로 만들어두고 재사용하기가 애매해서 그냥 쓰고 있었다.     
그런데 코드를 새로 짜고, 유지보수 하다보니 생각보다 유지보수가 어렵고 비슷하게 생겼지만 조금씩 다른 컴포넌트 때문에 헷갈리는 문제가 발생했다. 이번에 추상화를 통해서 이런 문제도 해결하고, 어짜피 다른 곳에서도 잘 사용할 기능이라고 생각해서 추상화를 공부하며 공용 컴포넌트로 빼보았다.

### 1. 재사용 컴포넌트 기준 + 예시
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
      handleChange: (value: string) => void; // 값이 변경될 때 호출되는 콜백 함수
      styles?: object; // 스타일 객체
    }

    function SelectComponent({ options, value, handleChange, styles }: SelectProps) {
      const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       handleChange(e.target.value)
      }

      return (
        <select value={value} onChange={onChange} style={{...styles}}>
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

    *select component 안에 onChnage 함수를 따로 만든것은 혹시 select component 안에서 따로 value state를 관리해주는 것이 좋을까 고민의 흔적이다. 없어도 되는 아이라는 생각이 든다.*

  - 사용
    ```tsx
    import React, { useState } from 'react';
    import SelectComponent from './SelectComponent';

    function LanguageSelection() {
      // 선택할 옵션 배열
      const languageOptions = [
        { value: 'en', label: '영어' },
        { value: 'es', label: '스페인어' },
        { value: 'fr', label: '프랑스어' },
      ];

      // value 값으로 전달해줄 state
      const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);

      // onChange로 전달해줄 event 정의
      const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
      };

      return (
        <div>
          <h2>언어 선택</h2>
          <SelectComponent options={languageOptions} value={selectedLanguage} handleChange={handleLanguageChange} />
          <p>선택한 언어: {selectedLanguage}</p>
        </div>
      );
    }

    export default LanguageSelection;
    ```

### 2. 추상화 장단점
추상화를 왜 해야하지? 추상화를 안하는게 다른 사람이 보기에 이해하기 쉽지 않나? 라는 생각이었는데 위에 본 것과 같이 본연의 기능에만 집중할 수 있는 component를 다른 곳에서도 꾀나 유연하게 사용할 수 있게 된 것 같아서 생각이 많이 바뀌었다.
하지만 그럼에도 불구하고 어디까지 추상화를 해주는 것이 좋을지에 대한 고민은 여전히 남아있는 것 같다.
###### 장점
  - 재사용성: 비슷한 기능을 여러 곳에서 사용할 수 있다.
  - 유지 보수성: 변경이 필요할 때 추상화된 요소 하나만 수정하면 모든 사용처에 영향을 줄 수 있다.
  - 일관성: 추상화된 컴포넌트는 일관된 스타일과 동작을 제공할 수 있어서 애플리케이션 전반에 일관성을 부여해줄 수 있고 그에 따라서 사용자도 일관성 있는 경험을 할 수 있다.
  - 가독성: 핵심 로직과 세부 사항을 분리할 수 있어 보기 편해진다.

###### 단점
  - 추상화 비용: 추상화를 설계하고 구현하는 데 시간과 노력이 소요된다. 그런데 여러번 반복하면 괜찮을 것 같기도..
  - 오버 엔지니어링: 지나치게 복잡하게 추상화하면 오히려 개발 과정이 더 복잡해질 수 있을 것 같다.
  - 러닝 커브: 추상화된 요소를 처음 접하는 개발자들에게는 러닝 커브가 있을 수 있다. 그런데 읽기 좋게 만들어두면 조금 괜찮지 않을까 싶다.

###### 결론
  추상화를 해주는것이 가독성이나 유지보수 면에서 내가 생각했던 것 보다 훨씬 유용했고, 사용자도 일관된 경험을 할 수 있기 때문에 반복되는 스타일 + 기능 사용 가능하다. 때문에 여러곳에서 사용하는 컴포넌트라면 추상화를 해주는 것이 훨씬 좋아 보였다.

### 3. 타입
타입 지정으로 컴포넌트를 사용할때 조금 시행착오가 있었다. 
1. 안정성 확보    
  컴포넌트나 함수의 타입을 정확하게 지정해주어서 어느정도의 안정성을 확보해줘야 한다. 안정성을 확보해줄 수록 컴포넌트를 올바로 사용할 수 있게 된다.
2. 유연성&복잡성     
  타입 지정은 타입 안정성을 확보하면서도 유연성을 유지해야 하고, 너무 복잡한 타입 정의는 코드를 이해하기 어렵게 만들 수 있다고 한다. 나는 단순히 이해하기 쉽게 만들기 위해서 노력했는데 생각보다 복잡한 코드를 작성하게 될 수도 있다는 것을 깨달았다. 아른 사람이 봤을때 알아보기 쉽고, 사용하기도 쉽게 만들기 위해서는 필요한 타입 정보만 제공하고 복잡도를 최소화해주는 것이 중요한 것 같았다.(아직 어려움..)

[참고-타입스크립트](https://www.typescriptlang.org/ko/docs/)
[참고-단단한 컴포넌트 부수기(feat. 조합, IoC)](https://brunch.co.kr/@finda/556)
