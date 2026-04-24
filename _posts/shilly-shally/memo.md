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