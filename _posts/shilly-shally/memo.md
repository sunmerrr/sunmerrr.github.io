이벤트는 스마트 컨트랙트에서 상속 가능한 멤버입니다. 이벤트가 발생하면 트랜잭션 로그에 전달된 인수를 저장합니다. 이러한 로그는 블록체인에 저장되며, 컨트랙트가 블록체인에 존재하는 동안 컨트랙트 주소를 통해 접근할 수 있습니다.



# 워크트리 명령어
- 생성 (새 브랜치)    
`git worktree add <경로> -b <브랜치명> <기준브랜치>`    
예: git worktree add .claude/worktrees/my-feature -b my-feature main    
- 생성 (기존 브랜치)    
`git worktree add <경로> <브랜치명>`
- 목록 확인    
`git worktree list`
- 삭제    
`git worktree remove <경로>`
- 강제 삭제 (서브모듈 등)                   
`git worktree remove --force <경로>`


정리: 
원인: hd-split-left에 lg:overflow-y-auto를 걸어 부모를 스크롤 컨텍스트로 만든 상태에서, 첫 자식 탭이 sticky + flex-shrink: 0 미지정이라   
flex-col 레이아웃이 첫 페인트에 탭 높이를 잡지 못했습니다. lulu-pc 원본은 명시적으로 flex-shrink:0을 걸고, 스크롤은 부모가 아니라 콘텐츠  
래퍼에 두는 구조라서 같은 문제가 발생하지 않습니다.

수정:
- CentralizedRingTabs.tsx: lg:shrink-0 추가, 디버그용 useEffect/ref/console.log/bg-red-500 제거 → 원래 의도였던 bg-bg-nav border-border
복원

- HoldemLobbyView.tsx: hd-split-left의 lg:overflow-y-auto 제거하고 리스트를 flex flex-col lg:flex-1 lg:min-h-0 lg:overflow-y-auto 래퍼로
감쌈 (lulu-pc style.css:1091의 .tn-tab-content.active 구조 미러링)

yarn tsc --noEmit 통과. PC에서 다시 띄워서 탭이 표시되는지, 카드 많을 때 좌측 스크롤이 정상인지 확인해 주세요.