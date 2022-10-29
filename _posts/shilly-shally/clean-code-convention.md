---
title: "형식"
excerpt: "clean code study #3-1"

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, Clean Code]

toc: true
toc_sticky: true
 
date: 2022-10-25
last_modified_at: 2022-10-29
---


## 형식 맞추기
- ###### 코드 형식은 의사소통의 일환이다. 의사소통은 전문 개발자의 일차적인 의무다.
- ###### 좋은 소프트웨어는 읽기 쉬운 문서로 이루어진다. 스타일은 일관적이고 매끄러워야 한다.

#### 1. 적절한 행 길이 유지
  - 일반적으로 큰 파일보다 작은 파일이 이해하기 쉬움<br/>

  - 신문기사처럼 작성
    1. 표제: 최상단에서 기사를 몇마디로 요약
    2. 요약: 첫 문단에 전체 기사 내용 요약
    3. 세부 내용: 읽어 내려 갈 수록 세부 내용 표시
    - 소스 파일
      1. 소스 파일 이름(표제): 간단하면서도 설명이 가능
      2. 첫 부분(요약): 고차원 개념과 알고리즘 설명
      3. 세무 내용: 아래로 내려갈수록 소스 파일 의도를 세세하게 묘사, 마지막에 가장 저차원 함수와 세부 내역이 나옴
  - 빈 행
    - 개념 분리: 빈 행은 새로운 개념을 시작한다는 시각적 단서로 사용
  - 세로 밀집도(+ 수직거리)
    - 연관성 분리: 서로 밀접한 코드 행은 세로로 가까이 놓여야 함
    - 타당한 그건가 없다면 서로 밀접한 개념은 한 파일 속에 모음
    - 세로 거리로 연관성을 표현

###### 1. 변수 선언
  - 변수는 사용하는 위치에 최대한 가까이 선언
###### 2. 인스턴스 변수
  - 모두가 알고 있는 위치에 인스턴스 변수를 모음
###### 3. 종속 함수
  - 한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치
  - 호출하는 함수를 호출되는 함수보다 먼저 배치
###### 4. 개념적 유사성
  - 친화도에 비례하여 코드 위치 지정
  - 고차원 ----> 저차원 함수로 배치

  - 친화도 높은 요인
    1. 직접적인 종속성
    2. 변수와 그 변수를 사용하는 함수
    3. 비슷한 동작을 수행하는 일군의 함수

#### 2. 가로 형식 맞추기
  - 프로그래머는 명백하게 짧은 행을 선호한다.
  - 가로 공백: 개념의 밀집도를 표현
  - 가로 정렬
  - 들여쓰기: 들여쓰는 정도는 계층에서 코드가 자리잡은 수준과 비례
    - 들여쓰기 무시하기 예제
      ```tsx
      const getURL = () => {
        if (!isValid) return "";

        return attachments.reduce(
          (signedUrl, element) => (Number(attachment_id) === Number(element.attachment_id) ? element.url : signedUrl),
          "",
        );
      };
      ``` 
      if 문은 간단해서 들여쓰기를 무시하는 것이 가독성에 더 좋을지 모르겠다.
      하지만 이런식으로 `return` 을 생략하며 버릇처럼 들여쓰기를 무시하기도 하는 것 같다.
      위 예시는 return 생략 + 삼항 연산자의 사용으로 가로 길이가 너무 길어져서 오히려 가독성을 해치는 것 같다.
      ```tsx
      const attachmentId = Number(attachment_id)

      const getURL = () => {
        if (!isValid) return "";
        
        return attachments.reduce(
          (signedUrl, element) => {
            const eleAttachmentId = Number(element.attachment_id);
            return(attachmentId === eleAttachmentId ? element.url : signedUrl)},
          "",
        );
      };
      ``` 
  - 가짜 범위

#### 3. 팀 규칙
  - 팀 내에서의 의사소통과 가독성을 위해서 규칙이 필요하다. 규칙이 있음으로 인해서 조금 더 매끄러운 의사소통을 할 수 있다.
  - 예제(아래와 같은 규칙을 정리해서 한번에 볼 수 있도록 모아둔 페이지가 있다.)
    ![image](https://user-images.githubusercontent.com/65106740/198835204-41dd2dbe-4a22-420e-8891-f46caa30a674.png)

#### 4. 밥아저씨의 형식 규칙
  - 코드 자체가 최고의 구현 표준 문서가 되도록 한다.


#### 5. 예제
  ```tsx
  const { attachments, isValid } = useDownloadBySchedule(productId, Number(duration));

  const getURL = () => {
    if (!isValid) return "";
    return attachments.reduce(
      (signedUrl, element) => (Number(attachment_id) === Number(element.attachment_id) ? element.url : signedUrl),
      "",
    );
  };

  const getIsLink = () => {
    if (!isValid) return false;
    return attachments.reduce(
      (isLink, element) => (Number(attachment_id) === Number(element.attachment_id) ? element.isLink : isLink),
      false,
    );
  };

  const onClick = () => {
    if (duePassed) return;
    useUpdateCount(productId, attachment_id).then((result) => {
      if (getIsLink()) return window.open(getURL());
      return result;
    });
  };
  ```
  1. 고차원 -> 저차원
  2. 빈 행
  3. 들여쓰기
  4. 이름 수정
  ```tsx
  const { attachments, isValid } = useDownloadBySchedule(productId, Number(duration));
  const attachmentId = Number(attachment_id);

  const onAttachmentDownloadButtonClick = () => {
    if (duePassed) return;

    useUpdateCount(productId, attachment_id).then((result) => {
      if (getIsLink()) return window.open(getURL());
      return result;
    });
  };

  const getIsLink = () => {
    if (!isValid) return false;

    return attachments.reduce((isLink, element) => {
      const eleAttachmentId = Number(element.attachment_id);
      return attachmentId === eleAttachmentId ? element.isLink : isLink;
    }, false);
  };

  const getDownLoadURL = () => {
    if (!isValid) return "";

    return attachments.reduce((signedUrl, element) => {
      const eleAttachmentId = Number(element.attachment_id);
      return attachmentId === eleAttachmentId ? element.url : signedUrl;
    }, "");
  };
  ```

