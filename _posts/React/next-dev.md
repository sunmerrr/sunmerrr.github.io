
## next dev 를(npm run dev) 했을때 일어나는 일
```
 yarn dev (= next dev --turbopack)
    │
    ① Node.js 프로세스 시작
    │
    ② Turbopack(번들러)이 src/ 코드를 분석
    │   - Server Component → 서버용 번들
    │   - Client Component ('use client') → 브라우저용 번들
    │   - Server Action ('use server') → API 엔드포인트로 등록
    │
    ③ HTTP 서버 시작 (localhost:3000)
    │
    ④ 요청이 오면:
    │   → middleware.ts 실행 (Edge Runtime)
    │   → 라우트 매칭 (app/ 폴더 구조 기반)
    │   → Server Component 실행 → HTML 생성
    │   → 브라우저에 HTML + JS 번들 전송
    │
    ⑤ 브라우저에서:
    │   → JS 번들 로드
    │   → React hydration (HTML에 이벤트 핸들러 연결)
    │   → Client Component 인터랙션 가능
    │
    ⑥ 파일 수정 감지 → HMR (Hot Module Replacement)
        → 수정된 부분만 브라우저에 즉시 반영
```