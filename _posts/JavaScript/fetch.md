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
        const errorData = await response.json().catch(() => null); // JSON 파싱 시 에러 방지
        const errorMessage = errorData?.message || response.statusText || 'Unknown Error';

        const error = new Error(errorMessage) as Error & { response?: Response };

        error.response = response;
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


### 3. 문제 파악
- fetch 의 then, catch 의 활용성
  - fetch 만 사용 했을때
  - try, catch 로 감싸서 사용할때
- error 핸들링 
  - 위 코드에서 error 발생 시

### 4. 개선 코드
- 이미 fetch 함수에서

### 5. 생각해 볼 것