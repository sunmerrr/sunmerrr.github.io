---
title: "TMC 메모"
excerpt: ""

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer]

toc: true
toc_sticky: true
 
date: 2025-07-25
last_modified_at: 2025-07-25
---   

## toss makers conference

나였다면 어떻게 만들었을까 고민하기.     
나도 언젠가 저 자리에 설 수 있을까(이거는....)      


### 60개 React Native 패키지, 하나의 프레임워크로
* 하나에만 집중할 수 있도록 하는 것에 집중하여 프레임워크를 만듬
- 고민 -> 악순화의 신호
  역학과 책임이 분리된 수많은 라이브러리 들을 만들게 됨
  라이브러리 하나를 변경하면 해당 라이브러리를 의존하고 있는 기능들에도 변경이 생김
  라이브러리 테스트만 하는게 아니라 ios, 안드로이드 모두 테스트 해야함
  업데이트 이후 안내 및 소통이 어려워짐
라이브러리를 관리, 테스트 자동화, 서비스 적용
- 해결 
  - 프레임워크화
    - 프레임워크 테스트(변경에 대한 두려움 극복 차원)
    - 버젼 안내
    - 문서화 쉬움
- 기반
  - 규칙: E2E 테스트 / 문서화
- 역할 정의(역할 분리): 역할에 맞는 기능만 수행 할 수 있도록 해줘야 한다.(필수 요소 파악)
- 테스트1: 동작 관점, 테스트 문서, 안전장치
- 테스트2: 지속 가능해야함 - 코드가 변경될 때마다 테스트를 다시 작성하는 것은 옳지 않다
- 문서: 명확한 역할 정의가 선행되면 문서화 쉬워짐(곧 레퍼런스 라고 생각해도)
- 선순환의 신호
  - 테스트 자동화 
  - 공식 문서로 공유
  - 버전 릴리스
-----

### Native ESM에 올라탄 마이크로 프론트엔드
- 토스앱의 웹뷰 기반 mts
- 고민 -> 하나의 next.js / 빌드 / 도메인 
  - 배포/롤백의 어려움
  - 변경 영향도 문제
  - 개발 환경의 불편함(450개 페이지) - 빌드만 30분..
- 배포의 단위를 작게 나누는게 중요하겠다는 생각
- 도매인 분할 단위 : 페이지 단위로 나눔
- 런타임 통합: 마이크로 앱 모듈 동적 로딩
- 각각 분리되어있는 micro app 을 동적으로 가져와서 사용
- native ESM에 집중 
  - 브라우저에서 esm import 문을 사용할 수 있음
  - 실행 시점에 모듈을 다운로드 함
  - import Map: 다운로드 할 모듈 주소를 맵핑해줌
  - 라우팅 테이블 사용
    - 각 페이지들이 어떤 마이크로앱에 속해있는지 기억하고 있음
  - 마이크로 앱 실행 후 호스트 앱이 해당 페이지에 접속하면 알맞게 호스트 해줌
  - 페이지 이동
    - spa 라우터 라이브러리를 개발해서 호스팅
- 구현 / 적용 사례
  - 각팀에서 독립적으로 빌드&배포 할 수 있도록 만듬 
  - 번들 주소 합침 - import map 활용 
  - 개별 배포 구현
    - v2 로 배포 시 조립된 import map 에 맵핑을 업데이트 침
    - 유저는 다른 화면은 그냥 두고 v2 로 배포된 앱만 경험하게 됨
  - 카나리 배포 - 특정 인원에게만 v2 를 보여줌 - 점점 비율을 높임
  - 프리뷰 배포 - 내부 임직원 등 특정 인원만 미리 볼 수 있도록 함
  - 로컬 개발 환경
    - 데브서버 자원을 가져올 수 있도록 
    - 로컬 호스트로 오버라이딩할 수 있도록 함
  - 번들 사이즈 최적화
    - 코드 중복은 문제 안됨 
    - 특정 라이브러리를 위해 
    - shared modules 를 만들어서 너무 큰 라이브러리 때문에 발생 할 수 있는 번들 사이즈를 줄임
  - 브라우저 호완성..ㄷㄷ
    - SystemJS 로 해결

----
### 언제나, 누구에게나, 평등하게 빠른 웹
- 최신 핸드폰 / 최신 맥북으로 개발하는 우리는 항상 최상의 상태를 경험함
- 네트워크, 하드웨어의 상태에 따라서 유저 경험이 달라질 수 있음
- 같은 유저에게 항상 같은 경험을 제공 할 수 있도로 해야함
- 모두에게 항상 같은 성능

* 기기, 네트워크 변수를 없애함 
    * 기기 문제는 조금 어려움
* 네트워크 변수를 없애기로
    * 크리티컬 리소스를 다운로드 하는 과정에서 CDN 사용으로 사람에 따라 다른 네트워크 경험을 하게 됨
    * 리소스를 로컬에서 가져오는 방식(브라우저 캐싱)
* 한번 다운로드한 css, js 를 캐싱해둠
* Html 은 제외(ssr 환경때문에)
* SWR Stale while revalidate
    * 크리티컬 리소스가 업데이트 되었을때 업데이트 동안 기존 데이터를 미리 이용하고 있음 - 캐싱 또한 업데이트
    * Ssr 환경에서는 어려움!
* 프리로드
    * 백그라운드에서 미리 캐싱
    * 서비스 워커
        * 다양한 도메인 환경
        * iOS 에서는 어려움
    * 네이티브 앱
* 프리로드 페이지모든 리소스를 프리로드 하기엔 한계, 비효율성이 있음
    * 유저 유입이 많은 페이지
    * 첫 집입 페이지
* 크리티컬 리소스 포함 여부
    * 배포 시 번들링 노트를 참고
    * 참고한 파일을 프리로드 리스트로 업데이트
* 프리로드 때문에 토스뱅크에 접속하지 않고 토스앱만 사용하는 사용자도 모두 cdn을 이용
    * E-tag 를 사용하여 변화를 감지할 수 있도록 함
    * 만료일 적용 - 토스 뱅크 5일 내에 접속 한 사람만으로 제한
    * Wifi, 무제한 요금자 사용자만으로 제한

* Fade out 함
    * 너무 잦은 배포로 인해서 맞지 않다고 판단

----
### 더 나은 UX를 위한 프론트엔드 전략
- 통장 상세 페이지 개선
  - 사용자 경험을 결정짓는 요소 - 로딩 속도 / 화면의 안정성
  - 로딩 속도
    - 스크립트 실행, 데이터 패칭 시간을 줄임 (네트워크 구간은 위 세션에서 이야기함)
    - ssr 사용하여 초기 로딩 속도 개선
      - 어떤 UI 를? - 계좌 잔액 부분
      - 비지니스 적 측면 - 가장 먼저 확인하고자 하는 부분 - 해당 페이지(도메임)에 가장 중요한 역할
      - 기술적 측면 - ?
    - 거래 내역: 클라이언트 사이드 캐싱
    - JS 번들 사이즈
      - 웹팩 에널리스트 사용
      - 미사용 의존성 제거
      - 라이브러리를 가벼운 것으로 대체
      - 등등
    - API 웨터폴 개선
      - tanstack의 suspence - 잘못된 suspence 설정으로 api fmf wlrfuffh aksemfrp ehla
  - 화면 안정성
    - 하이드레이션 전/후 상태를 자연스럽게 연결해주는 애니메이션
    - 이미지 불러오기
    - 더 많은 유저의 입장으로 ui 의 초기 상태를 설정
    - 레이아웃 시프트 - 디자인 및 애니메이션으로 개선

- 홈 서비스 개선 (LCP 최적화 과정)
  - api 호출 방식 & 특정 api 느림
    - http 요청이 느려짐 - 한 도메인당 호출 개수 한도가 있음 6개정도
    - 서버에서 어그리게이션 api 로 묶어서 한번에 데이터를 내려줌
  - ssr 충분히 활용 못함
    - 필요한 영역 먼저 ssr 로 보여줌

----
### 100년 가는 프론트엔드 코드, SDK
- 가맹점에서 사용하는 SDK의 유지보수성, 확장성을 고민
- 문제
  - 특정 가맨점에서만 안됨
  - 특정 런타임 또는 기기에서 안됨
- 해결: 모니터링 시스템을 만듬
  - 결제 요청 로그 -> 결제 완료 로그
  - 안정성: 단위테스트, 통합테스트, E2E 테스트, 얼럿 시스템 등
  - 확장성: 
    - 각 가맹점 마다 각기 다른 요구사항을 다 들어줌
    - 핵심 로직과 특정 가맹점의 로직을 구분함
    - 레고블럭을 변경하는 것만으로도 가맹점의 요구사항을 들어줄 수 있도록 구현
      - 표준 / 개별 custom 으로 구분
    - 레고 블록 끼리 조립은?
      - 변경의 원인이 되는 곳을 따라서 경계를 그어라
  - 명확성
    - SDK 인터페이스를 계약으로 분리
    - 계약을 명확히 하고 npm 패키지로 분리 제공
    - 계약서이자 히스토리 북으로 Git 을 활용할 수 있게됨
    - 살아있는 연동문서
    - 유효성 검증 계층     
      typescript 로 되어있는 것을 zod schema 로 옮겨서 유효성 검증을 거침
*토스 페이먼츠 개발자 어쩌구에 방문하면 코드 샌드박스가 있어서 경험 가능!*

----
### 알림부터 대응까지, 장애 대응을 시스템으로
- MSA 구조로 장애 대응이 어려움
- 인지하는 것도 어려움
- Sentry 알림 (슬랙 알림)
- Apxmflr duffle
- 장애 알림이 플랫폼팀으로 몰림
- 해결
    - 알림 개선
        - sentry알림 개선
        - Opsgenie 도입(사진)
    - alert설정도 코드로 관리하니 번거로움
        - terraform으로 만듬
    - 문제: 알림은 잘 가는데 응답이 없음
        - 대응 후 기록이 누락
        - 해결된건지 제연이 안된건지 모름
        - alert발생 -> 자연 해소 -> alert꺼짐 -> 문제는 그대로..
    - 해결: 단계별 구분 (다시 터지는 문제를 줄이게 됨)
        - 알림을 확인했다는 응답
        - 해결
        - 대응 확인: 실제로 문제가 해결되었는지 수동 체크
- alert이 너무 많아도 문제
    - sentry사용량 추이 수집
    - 반복되지만 alert이 오지 않는 버그도 발견 할 수 있음
    - 모니터링 함
- 장애 대응 시스템도 장애 날 수 있다..
    - 휴먼 에러, 소프트웨어 에러 등을 지표로 추적 중..!
- 모든 alert가 똑같이 급한건 아님
    - 코드 오너가 바로 대응하지 안는 경우
    - 영향이 작거나 곧 사라질 가능성, 우선순위에 따른 선택
    - 판단 가능한 구조를 만들고 위험한 alert만 강조
- 다음 목표
    - sre팀 신설 -> 장애 분석 및 기준 정립 강화
    - 어떤 문제를 alert로 보낼지, 어떤 지표를 볼지 함게 고민

### 기술 중심 엔지니어에서, 조직 중심 엔지니어로
- 박소* 생각나게 하는 세션이넹
- '좋은 기술'이 '쓰이고 확산'되도록
- 기술적으로 완벽하게 만들었는데 아무도 안 쓴다
  - 회사에 필요한 기술인데..
- 개발자가 해야 할 일 중 코드를 치는 것 말고도 많고, 규모가 크고 시니어가 될 수록 많아짐

**잘 만드는 것 -> 쓰이게 만드는 것**
- 전체 조직이 계속 커져도, 작은 통합팀으로 커버 가능한 우아한 협업을 가능하게 하려면
- 똑독하게 만들고
  - 장착 가능하게 설계하기
    - 기술을 '쓸 수 없게' 만듬: 팀 구조를 바꿔야함, 라이브러리와 충돌, 테스트를 할 수 없음, 실행 환경에 따라 실행 여부가 다름
    - 누가 어떻게 쓸 건지를 미리 알아야
- 똑똑하게 퍼트리기
  - 직접 개발 해줄까? vs 함께 하게 만들까? -> 둘 모두 해야함
  - 팀 회고를 통해서 혼란(어려웠던 점), 좋았던 점을 모아봄 
    -> 나침반을 만들음
  - 주관적 판단이 아닌, 팀 모두가 공감할 수 있는 '결정 구조'가 생김
  - 퍼뜨리기
    - 기술을 가장 잘 아는 사람이 팔아야함
    - 문제를 구현하고, 맥락을 해석한 건 우리 팀 -> 해석을 타 팀도 공감할 수 있도록 전달 해야함  
    - 상대의 맥락부터 파악
      - 상대 팀이 이번 분기 집중하고 있는 목표와 연결 할 수 있어야
    - 조직 전체를 함게 보며 우선순위 정하기
    - 신뢰를 얻는 기술 설명
      - VC에게 피치하듯, 가치 중심으로 말하기
        - 의도적으로 기술 디테일을 피해서 말해도
      - 선제적으로 리스크를 짚고, 해결책까지 제시
      - 상대 도메인 미리 파악하기
    - 기억을 돕는 시스템을 두는 것도
    - 전사로 퍼뜨리기
      - 입에 오르내리게 만들기:
        - 기억에 남는 이름으로
        - 읽지 않아도 머리에 들어오도록: 엄청 짧은 요약
      - 안쓰면 손해인 것 처럼:
        - 조직의 표준처럼 느껴지도록
        - 도입현황 시각화
      - 미래 함께 설계하기
        - 각팀의 계뢱표에 미리 들어가기 - 사전 얼라인
        - 공통 로드맵을 만들기 - 한장의 로드맵
        - 워크샵
- 조직에서 유사한 변화를 성공적으로 이끈 사례를 조사

----