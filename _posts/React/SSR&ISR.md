---
title: "SSR과 ISR의 장점"
excerpt: ""

categories:
  - React
tags:
  - [react, javascript, Next.js, framework, ssr, isr]

toc: true
toc_sticky: true
 
date: 2024-04-07
last_modified_at: 2024-04-07
---

## SSR과 ISR이 왜 필요하고 장점이 무엇인지, 구현은 어떻게 하는지 알아보는 글
[ssr과 csr을 간단하게 비교한 글](https://sunmerrr.github.io/react/CSRvsSSR/)

### 1. SSR
Server Side Rendering 의 약자로 서버에서 페이지의 HTML을 미리 생성하여 클라이언트로 보내주는 방식이다.     

<img width="439" alt="ssr image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/28fa8536-d688-4631-9012-b4b1a44b45f3">     

#### 장점
- 초기 로딩 시간 단축: 기존에 react에서는 빈 html을 보여주고 서버에 요청하여 html, css, js 파일을 받아온게 해주는 프로세스라서 사용자는 순간적이지만 빈 페이지를 보게 될 수밖에 없었다(너무 잠깐이라서 사용자가 모르고 지나갈 수도 있음) ssr을 사용하게되면 페이지의 html 을 서버에서 그려서 보내주기 때문에 사용자는 빠르게 완성된 UI를 볼 수 있다.
- SEO 최적화: 검색 엔진은 JavaScript를 실행시키지 않고 HTML 내용만으로 크롤링하기 때문에 완성된 HTML을 보내주는 SSR방식은 SEO 최적화에 유리하다.
- 소셜 미디어 최적화: 서버에서 받는 HTML페이지는 URL을 공유할때 메타 데이터를 통해서 풍부한 미리보기를 제공할 수 있다.
- 사용자 경험 개선: 빠른 초기 페이지 로딩으로 콘텐츠를 바로 보여주어 사용자 경험을 개선시킨다.

#### 예시
  ```tsx
  import { GetServerSideProps } from 'next';

  interface Props {
    data: {
      id: number;
      title: string;
      message: string;
    }
  }

  const HomePage: React.FC<Props> = ({ data }) => {
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.message}</p>
      </div>
    );
  };

  export const getServerSideProps: GetServerSideProps = async (context) => {
    // 서버 측에서 필요한 데이터를 미리 불러오는 로직
    const data = { message: 'This is server-side rendered!' };

    // props로 페이지 컴포넌트에 데이터 전달
    return { props: { data } };
  };

  export default HomePage;
  ```
