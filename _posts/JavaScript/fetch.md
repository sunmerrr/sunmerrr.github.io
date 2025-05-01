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
- 어떤것이 문제 인지 바로 알아 차렸다면..
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
    try {
      const response = await fetch(`/api/ticket/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ id: ticketId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || '서버 응답 실패';
        throw new Error(message);
      }

      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error('빈 응답 데이터');
      }

      return data;
    } catch (err) {
      console.error('❌ 티켓 취소 중 오류 발생:', err);
      throw err;
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
