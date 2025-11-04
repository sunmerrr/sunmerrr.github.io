---
title: "Next.js `next/font/local` 사용 시 V8 메모리 폭발 원인과 해결 방법"
excerpt: "Node.js가 OOM(Out of Memory)으로 죽을 수 있긴한데 원인을 찾는게 어렵다.."

categories:
  - Developer
tags:
  - [Software, web, Developer, font, Next.js]

toc: true
toc_sticky: true
 
date: 2025-10-13
last_modified_at: 2025-11-3
---   

> **TL;DR**: `next/font/local`로 큰 용량의 `.woff2` 폰트를 등록하면, dev 서버 실행 중 Node.js가 OOM(Out of Memory)으로 죽을 수 있다. 원인은 `.woff2` 파싱 중 V8의 `mark-compact GC` 루프가 감당하지 못하기 때문. 해결 방법은 폰트 수 쪼개거나, `@font-face` 방식으로 우회하는 것이다.

### 문제 상황
yarn dev 를 했는데 갑자기 실행이 안된다!    
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```
터미널 에러는 이렇게 뜨는데 내가 사용하고 있는 맥북 제외하고 모든 맥북에서 실행이 잘 되어서 용량 문제인가 싶었다.
    
limit 을 늘려봄    
```
NODE_OPTIONS="--max-old-space-size={용량 최대치}
```
최대까지 늘려도 다 실패했고,   
여기서 용량 문제가 아님을 파악했다..    

터미널에 찍히는 에러로는 이거 외에 어떤 문제 인지 알 수가 없어서 한동안 개인 맥북으로 개발했다..ㅜㅜ     

그러고도 한 6개월 정도 지났나.. 다른 프로젝트도 같은 에러를 내기 시작했다. 물론 실행도 되지 않았다.    

### 원인 파악
해당 프로젝트는 거의 매주 배포하고 있어서 터지는 시점을 쉽게 찾을 수 있었는데..     
아래와 같은 용량이 큰 폰트(2MB 초과) 등록이 원인이었다.

```ts
PretendardVariable.woff2
```

뭔가 '엥..?'스럽지만 폰트를 삭제하고 나니까 `heap out of memory` 에러가 사라졌다.        

> V8 GC와 `.woff2` 파싱
>
> Next.js는 `next/font/local()` 사용 시, `.woff2` 파일을 단순 링크하는 것이 아니라 다음 > 작업을 내부적으로 수행한다:
> 
> 1. `.woff2` 파일을 **직접 읽고**
> 2. **헤더 및 메타데이터를 파싱**
> 3. 해당 정보를 바탕으로 `@font-face`, `preload`, `font-family` 클래스를 자동 생성
> 
> 이 과정은 빌드 타임 또는 dev 서버 기동 시 발생하며, `.woff2`의 **파일 크기**와 **복잡성**이 > 클수록 Node.js의 **GC 부담이 커진다**.
   
GPT는 위와 같이 분석을 해주었는데 납득이 잘 되지는 않았다.   
GC 부담이 커진다는건 알겠는데 왜 내 맥북에서만 발생했는지는 맥북 사양을 보고도 파악하지 못하는 멍청이 주인1과 멍청이 GPT가 있어서 일까....    
      
### 해결 방법
1. 폰트 파일 수 최소화    
    불필요한 weight 제거 → 예: Regular(400), Bold(700)만 사용   
    ```ts
    src: [
      { path: './PretendardGOV-Regular.subset.woff2', weight: '400', style: 'normal' },
      { path: './PretendardGOV-Bold.subset.woff2', weight: '700', style: 'normal' },
      ...
    ]
    ```

1. Variable 대신 subset 사용   
    Variable Font(`.woff2`)는 내부적으로 훨씬 복잡하며, 단일 파일이 1MB 이상일 경우 문제가 더 커질 수 있다.  
    가능하다면 **정적 서브셋(weight별 `.woff2`)**을 사용하는 것이 좋다.

그 외 
1. `public/` + `@font-face` 방식으로 우회    
    이 방법도 있지만 next의 기능을 사용하고자 한 것이라 사용하지는 않았다.
1. Node.js 버전 변경    
    동료들과 같은 node 버전을 사용하고 있어서 근본적인 해결책이 아니라는 생각때문에 건너 뛰었다. 

### 이후에 해볼 것
- node 버전을 낮추지 말고 높여 보기
- 맥 새로 띄울때 기본으로 함께 실행되는 프로그램 모두 없애고 실행해보기(실행 당시 displayLink 하나만 기본으로 실행됨)
- 다른 맥북과 - .zprofile, .zshrc 등이 다른지 체크해보기

#### 참고
- [Next.js Fonts 공식 문서](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Pretendard 폰트 GitHub](https://github.com/orioncactus/pretendard)
- [`mark-compact` GC 설명 (V8 공식)](https://v8.dev/blog/trash-talk)

#### mark-compact GC란?(GPT가 말아줌)     
V8의 mark-compact GC는 살아있는 객체를 식별(mark)하고, 정리(compact)하는 GC 단계다.    
이 단계는 다음과 같은 상황에서 문제가 발생할 수 있다:   
- `.woff2` 파싱 중 메모리 상에서 **순환 구조 or 반복 객체 생성**
- GC가 객체를 회수하기도 전에 계속 힙이 증가
- 결과적으로 Node.js는 `heap limit`을 초과하고 강제 종료 

