---
title: "Storybook으로 컴포넌트 테스트 하기"
excerpt: ""

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer]

toc: true
toc_sticky: true
 
date: 2024-01-30
last_modified_at: 2024-01-30
---

## Storybook JS 소개
Storybook JS는 UI 컴포넌트 개발, 문서화 및 테스트를 위한 도구로, 주로 React, Vue, Angular 등의 프레임워크로 작성된 컴포넌트를 다룰 때 활용된다.    
[Storybook docs](https://storybook.js.org/docs/get-started/install).   

### Stroybook 장/단점
- 장점
  - 컴포넌트 개발 및 테스트 용이성: 각 컴포넌트를 독립적으로 개발, 테스트 할 수 있고, 시각적으로 확인 가능
  - 문서화: 간편한 문서화를 통해 프로젝트의 컴포넌트에 대한 이해도 상승
  - 시각적 테스팅: 시각적 스탭샷을 통해서 컴포넌트의 시각적 변화를 감지하고 테스트
  - 컴포넌트 재사용성: 다른 프로젝트에서도 쉽게 컴포넌트를 재사용 할 수 있음

- 단점
  - 러닝커브: 처음 사용 시 러닝커브 발생
  - 범위: UI 컴포넌트에 중점을 두고 있어서 프로젝트의 전반적인 테스트를 수행하기 어려움

### Jest, Cypress와의 비교
**Storybook vs. Jest & Cypress**    
* Storybook: 주로 UI 컴포넌트 개발, 문서화, 시각적 테스팅
* Jest: 주로 유닛 테스트, 모듈 테스트에 사용. 코드 품질 보장 및 모듈 독립적 테스트에 용이
* Cypress: 엔드 투 엔드 테스트를 위해 사용. 웹 애플리케이션의 전반적인 동작을 테스트

## Storybook 적용

### Install
1. install    
    스토리북 최신 버젼 install
    ```
    npx storybook@latest init
    ```

2. run    
    설치가 완료되면 일단 실행해보자
    ```
    npm run storybook
    ```

3. 가이드    
    일단 시작하면 아래와 같은 가이드가 뜬다. 이것만 잘 읽고 따라가도 반은 먹힌다.     
    ![storybook install](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/3dcea71d-4217-4468-8759-7499c1537a20)   
    [출처: Install Stroybook](https://storybook.js.org/docs/get-started/install)

### 스토리 작성
대충 둘러봤으니 이제 내 프로젝트의 컴포넌트를 작성해보자

1. 테스트 할 컴포넌트 설정    
    나는 아래의 버튼 컴포넌트를 테스트 하려고 한다.    
    디폴트 스타일이 있고 사용자 입장에서 사용하면서 스타일을 변경할 수도 있다.    
    ```tsx
    const Button:React.FC<Props> = ({label, icon, onClick, buttonStyle, iconStyle, children}) => {
      return (
        <ButtonComponrnt
          onClick={onClick}
          style={{...buttonStyle}}
        >
          {icon && (
            <IconContainer style={{...iconStyle}}>
              <img src={icon} alt="button icon" />
            </IconContainer>
          )}
          {label}
          {children}
        </ButtonComponrnt>
      )
    }

    export default Button
    ```

2. 테스트 코드(스토리) 작성
    작성하는 요령은 [storybook docs](https://storybook.js.org/docs/writing-stories)에도 잘 나와있어서 그냥 따라치면 된다.     
    
    - 파일트리 
      테스트 파일은 컴포넌트와 같은 폴더 안에 만들어도된다.
      ```plaintext
      src/
      |-- components/
      |   |-- Common/
      |       |-- Button.tsx
      |       |-- Button.stories.tsx
      ```
    
    - 테스트 코드
      ```tsx
      import { Meta, StoryObj } from '@storybook/react';
      import { action } from '@storybook/addon-actions';

      import Button from './Button';
      import { userIcon } from '../../Assets/icon';

      const meta: Meta<typeof Button> = { component: Button }

      export default meta;
      type Story = StoryObj<typeof Button>;

      export const Default: Story = {
        args: {
          onClick: action('the Default Button clicked'),
          label: 'button',
        }
      };
      ```

      디폴트 스타일의 버튼을 보여주는 테스트를 먼저 작성해보고 `npm run storybook`으로 컴포넌트가 잘 뜨는지 확인해본다.


      


