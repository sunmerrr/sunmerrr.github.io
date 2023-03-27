---
title: "SWR 사용과 장단점"
excerpt: "SWR 사용방법과 장단점"

categories:
  - React
tags:
  - [react, javascript, Next.js, hooks, swr, fetch]

toc: true
toc_sticky: true
 
date: 2023-03-11
last_modified_at: 2023-03-11
---

#### SWR 이란
- 원격 데이터 패치를 위한 리액트 커스텀 훅이다.

#### SWR 사용방법

- 리액트 커스텀 훅이지만 npm을 통해서 설치를 해줘야 한다.
- npm으로 SWR을 설치해주기면 하면 사용은 쉽다.
  ##### 데이터 불러오기
    ```tsx
    import { useSWR } from 'swr';

    // api를 전달해주는 url과 fetcher를 준비해준다.
    const url = '/api/'
    const fetcher = async(url) => {
      // 전달받은 parameter url 은 useSWR 훅에 넘겨준 url이 넘어온다. 
      const res = await axios.get(url) // axios 사용해도 되고 fetch 함수를 사용해도 된다.

      return res.data
    }

    // useSWR 훅에 위 url과 fetcher를 argument로 전달해 준다.
    const { data } = useSWR(url, fetcher)
    ```

  ##### 데이터 업데이트
    - mutate 하기   
      mutate의 경우에는 해당 api를 통해서 업데이트 하고자하는 데이트를 서버를 통하지 않고 바로 UI에 반영하는 것이다. 따라서 서버를 통해서 전달 받아야하는 유니크한 값(ID)의 경우에는 mutate되지 않는다. 
      ```tsx
      import { useSWR } from 'swr';

      // url과 fetcher 설정 생략

      // useSWR에서 data 뿐만아니라 mutate도 받아 올 수 있다.
      const { data, mutate } = useSWR(url, fetcher)

      // mutate할 데이터 값을 넣어준다.
      // id 같이 서버에서 넘겨줘야 하는 값의 경우에는 해당하지 않는다.
      muteat(data: [
        ...data,
        {
          name,
          age,
        }
      ])
      ```

    - trigger 사용하기   
      trigger의 역할은 해당하는 api를 통해서 사용자가 업데이트하면 해당 api에 get요청을 한번 더 보내서 업데이트 된 데이터를 서버로부터 가져오는 역할을 한다.
      ```tsx
      import { useSWR, trigger } from 'swr';

      // 위에서 url이라는 변수로 선언해준 api를 넣어준다.(아주 쉽고 간편하다!)
      trigger( key: 'url' )
      ```


#### SWR 장단점
- 장점
  - 데이터 패칭, 뮤테이션 등이 간편하다
  - 
  - 기본적으로 data fetch 진행 상태에 따라서 isLoading, isValidating을 제공하기 때문에 사용자 경험을 개선 시킬 수 있다.
  - 한 부모 아래 다른 컴포넌트에서 같은 api로 서버 호출이 있어도 한번의 통신으로 처리할 수 있다. = 리소스 사용을 효율적으로 할 수 있다.