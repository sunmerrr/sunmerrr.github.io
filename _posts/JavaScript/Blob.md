---
title: "[HTTP]Content-Disposition을 통한 파일 다운로드 기능 구현 예시"
excerpt: "서버에서 받아온 pdf 파일, 다운로드와 미리보기 기능 구현하기"

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, HTTP, Bolb]

toc: true
toc_sticky: true
 
date: 2024-01-16
last_modified_at: 2024-01-16
---

## 서버에서 받아온 pdf 파일 다운로드와 미리보기 기능 구현하기
> 서버에 요청해서 받아온 pdf 파일에 대한 처리 내용을 담았다.

이번에 pdf 파일 다운로드 작업을 하게 되었는데 내가 한 방식이 흔하지 않은 방식인건지 적당한 예제를 못 찾아서(예제를 복붙하는 꿀을 빨지 못해서) 그냥 내가 남겨두려고 글을 쓴다.

1. **서버 호출을 통한 pdf 파일 받기**    
    처음부터 막힌게 좀 웃기지만 서버 호출하는 것 부터 잘 안됐다.
    api가 배포되기 전이라 endpoint와 query 값, headers에 어떤 값을 넣어서 보내주는지 백엔드와 이야기해서 로직을 먼저 짰다.    
    그리고 api 작업이 완료되고 연결을 해보았는데... 
    1. 1트

        ```jsx
         const handleDownload = async(filename: string) => {
          try {
            const pdfResponse = await ApiKeyInstance.get(`/download/pdf`, {
              headers: {
                'Content-Disposition': `attachment; filename=${filename}.pdf`,
              }
            })
        ```

        이렇게 하면 아래와 같은 에러가 뜬다    

        <img width="560" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/dbdbb7f8-0f46-4310-bbc0-aa9df65fbad0">

        일반 문자를 인코딩해야하는데 안해서 나는 에러다.

    1. 2트
        찾아보다가 랜덤 블로그에서 response type에 blob을 넣어줘야 한다는 것을 보고 그것만 넣어줬다.    

        ```jsx
         const handleDownload = async(filename: string) => {
          try {
            const pdfResponse = await ApiKeyInstance.get(`/download/pdf`, {
              responseType: 'blob',
              headers: {
                'Content-Disposition': `attachment; filename=${filename}.pdf`,
              }
            })
        ```

        1트에서 났던 에러가 똑같이 난다.    
        에러가 어떻게하면 해결되는지 분명하게 메세지를 주고 있는데 말을 듣지 않는 나의 심리는.,...,,..,.. 나도 나를 모르겠다.     
            
        ???: 그니까 내가 인코딩 해야한다고 말했자나..     

    1. 3트
        이제 정신차리고 인코딩을 제대로 해줬다.    
        headers에 content type도 추가해줬다.

        ```jsx
         const handleDownload = async(filename: string) => {
          try {
            const encodedFilename = encodeURIComponent(`${filename}.pdf`);

            // db에서 파일을 불러올 수 있는 api를 아래에 삽입하여 연결
            const pdfResponse = await ApiKeyInstance.get(`/download/pdf`, {
              responseType: 'blob',
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${encodedFilename}.pdf`,
              }
            })
        ```

        이렇게 해주면 파일이 잘 들어온다. 굳굳

1. **다운로드 기능 구현하기**    


        ```jsx
            const url = URL.createObjectURL(new Blob([pdfResponse.data], {type: 'application/pdf'}));
            // 가상 링크 생성
            const downloadLink = document.createElement('a');
            downloadLink.href = url;

            downloadLink.setAttribute('download', `${filename}.pdf`);
            document.body.appendChild(downloadLink);

            if (type === 'preview') {
              window.open(url)
            }

            if (type === 'download') {
              downloadLink.click();
            }

          } catch (error) {
            console.error('Error donloading PDF:', error);
            alert('준비중입니다')
          }
        }
        ```