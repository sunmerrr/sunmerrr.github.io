---
title: "데이터 요청 핸들링 제대로 하기"
excerpt: ""

categories:
  - web
tags:
  - [web, Fetch]

toc: true
toc_sticky: true
 
date: 2025-04-19
last_modified_at: 2025-04-19
---

## fetch를 잘못 알고 사용한걸까 핸들링을 제대로 못한 것일까
### 1. 글을 쓰도록 만들어준 문제의 코드
- 어떤것이 문제 인지 바로 알아 차렸다면.. 이 글은 패스해 주시길
  ```ts
  cancelTicket({ ticketId, authToken, })
    .then((res) => {
      console.log('✅ 티켓이 정상적으로 취소되었습니다:', res);

      queryClient.refetchQueries({ queryKey: ['ticket-detail'] });
      openPopup('ticket-cancel-popup');
    })
    .catch(() => {
      toast.error('티켓 취소에 실패했습니다.');
    });


  const cancelTicket = async ({ ticketId, authToken }: { ticketId: string; authToken?: string; }) => {
    const url = `/api/ticket/cancel`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ id: ticketId }),
    }

    const response = await fetchApi(url, options);

    return response.data;
  }

  async function fetchApi<T>(url: string, option: : RequestInit): Promise<T>) {
    try {
      const response = await fetch(url, options);

      if (response.ok === false) {
        throw error;
      }

      const json: ApiResponse<T> = await response.json();
      return json;
    } catch (error) {
      if (error instanceof Error && error) {
        console.error(`API Fetch error: ${error.message}, Error Name: ${error.name}`);
      } else if (error instanceof Error) {
        console.error(`API Fetch error: ${error.message}`);
      }
      throw error;
    }
  };
  ```


### 2. fetch 복습
- fetch 란?
    네트워크를 통해 서버로 HTTP 요청을 보내고, 비동기적으로 응답을 처리할 수 있도록 해주는 Promise 기반의 Web API
- 특징
  - **XMLHttpRequest(XHR)** 보다 간결하고 현대적인 방식
  - Response 객체에서 .json(), .text(), .blob() 등으로 변환 가능
  - 대부분의 현대 브라우저에서 기본 지원
  - `fetch()`는 HTTP 400, 500 에러를 실패로 간주하지 않음


### 3. 문제 파악    
- 위 코드의 호출부인 `cancelTicket()` 에서 에러가 발생해도 `.catch()`에는 잡히지 않음    
  여기서의 문제는 '에러'를 어디까지 정의할 것인지이다. 위 코드에서 보면 내가 정의한 에러의 상황은 `response.ok === false` 또는 런타임 에러가 발생했을때다.    
  - `fetch()` 호출 자체 실패
  - `fetchApi()` 내부의 `response.ok === false` 조건 만족으로 `throw error`를 실행한 경우
  - 응답을 `response.json()`으로 파싱하는 중 발생하는 JSON 포맷 오류(`SyntaxError`)
  - 그 외 내가 원하는 조건을 충족하지 못해서 명시적으로 `throw` 했을 때

### 4. 개선 코드
- 이미 fetchApi 함수에서 throw error 를 해주기 때문에 error를 잘 잡기만 하면 된다고 생각했다.
- 그럼 데이터를 불러올때는 try catch 안해줘도 될까?

### 5. 생각해 볼 것