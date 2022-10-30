---
title: "함수"
excerpt: "clean code study #2-1"

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, Clean Code]

toc: true
toc_sticky: true
 
date: 2022-10-18
last_modified_at: 2022-10-20
---

#### 함수를 잘 만드는 법

1. 작게
  함수가 3줄이 넘어가지 않도록 한다.
2. 한가지만
  함수가 되도록이면 한가지 일만 하도록 한다
3. 함수 추상화 수준은 하나로
4. 내려가기 규칙
  위에서 아래로 내려가며 읽는 느낌으로
  각 함수가 다음 함수를 소개한다
5. switch 문 감추기
6. 서술적인 이름 사용
7. 함수 인수
    - 많이 쓰는 단항 형식
    - 플래그 인수
    - 이항함수
    - 삼항함수
    - 인수 객체 : 인수의 개수가 많고 성격이 같다면 객체로 묶어주는것이 좋음. 객체로 묶어주면서 인수의 성격을 표현하게 되므로 이해도를 더 높일 수 있음
    - 동사와 키워드 : 이름에 인수 키워드를 넣어 동사로 묶어주면 훨씬 이해가 쉽고, 인수의 순서를 외우지 않아도 됨
8. 부수 효과를 일으키지 말것
9. 명령과 조회 분리
10. 오류 코드보다 예외를 사용할 것
11. 중복 만들지 말것 - 반복하지 않을 것
13. 함수를 어떻게 짜죠?
    - 소프트웨어를 짜를 행위는 여느 글짓기와 비슷하다.
      1. 처음에는 길고 복잡한 서투른 코드를 짠다.
      2. 서투른 코드를 빠짐없이 테스트하는 단위 테스트 케이스를 만든다.
      3. 리펙토링하며 코드를 다듬고, 함수를 만들고, 이름을 바꾸고, 중복을 제거한다. 
      4. 코드는 항상 단위 테스트를 통과한다.
#### 정리
  * ###### 함수는 위에서 아래로 글을 읽듯이 이어지게 짜야한다. 최대한 간결한 문장이 이해가 잘되듯 함수도 최대한 짧고 간결한것이 이해하기 쉬우며, 인수가 적을수록 읽는 사람의 이해도가 높아진다. 함수의 이름은 길어도 읽는 사람이 함수안에서 어떤 일이 일어나는지 알려줘야 한다.
#### 예시
  - 이름 변경
    ```tsx
    const handleData = (type) => refetch({ type });
    ```
    위 함수를 따로 떼어내었을때 이름만 보고도 기능을 알 수 있도록 해당 역할을 넣어주면 좋을 것 같다.
    ```tsx
    const handleRefetchDataByType = (type) => refetch({ type });
    ```
  - 쪼개기
    ```tsx
    const filterReservations = () => {
      return (
        payments
          ?.filter(({ pay_products, status }) => {
            return pay_products.product_type === ADVANCE_RESERVATION && status === PRODUCT_STATUS.complete;
          })
          // Sorting is very simpler for reservations:
          // Recent -> Old purchase order
          .sort((a, b) => {
            const dateA = moment(a.pay_products.created_at);
            const dateB = moment(b.pay_products.created_at);
            if (dateA > dateB) {
              return -1;
            } else if (dateA < dateB) {
              return 1;
            }
            return 0;
          })
      );
    };
    ```
    위 함수는 세가지 일을 해주고 있다.
    1. 목록 필터
    2. 정렬
    ```tsx
    const sortingRecentToOld = (programList) => {
      return programList?.sort((a, b) => {
        const dateA = moment(a.pay_products.created_at);
        const dateB = moment(b.pay_products.created_at);
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
    };

    const filterReservations = () => {
      return payments?.filter(({ pay_products, status }) => {
        return pay_products.product_type === ADVANCE_RESERVATION && status === PRODUCT_STATUS.complete;
      });
    };

    const getReservationProgram = () => {
      const programList = filterReservations();
      return sortingRecentToOld(programList);
    };
    ```

