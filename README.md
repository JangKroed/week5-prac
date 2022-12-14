# Layered Architecture Pattern (계층형 아키텍처 패턴)

3계층 아키텍처 (3-Layered Architecture)로 구현해보려 했으며,</br>
객체지향 프로그래밍과 객체지향 설계 5원칙(SOLID)에 맞게끔 계속적인 수정이 필요하다고 생각합니다.

***

# ERD
![ERD](./img/drawSQL-export-2022-10-12_15_32.png)

***

# API
|기능|METHOD|API URL|REQUEST|RESPONSE|
|:-----:|------|-------|-------|--------|
|회원 가입|POST|/signup|{ nickname, password, confirm }|{ "message" }|
|로그인|POST|/login|{ nickname, password }|{ "token" : "..." }|
|게시글 작성|POST|/posts|{ title, content }|{ "message" }|
|게시글 조회|GET|/posts||{ data: [{ postId, userId, nickname, title, createdAt, updatedAt, likes }] }|
|게시글 상세 조회|GET|/posts/:postId||{ data: [{ postId, userId, nickname, title, content, createdAt, updatedAt, likes }] }|
|게시글 수정|PUT|/posts/:postId|{ title, content }|{ "message" }|
|게시글 삭제|DELETE|/posts/:postId||{ "message" }|
|댓글 생성|POST|/comments/:postId|{ comment }|{ "message" }|
|댓글 목록 조회|GET|/comments/:postId||{ data: [{ commentId, userId, nickname, comment, createdAt, updatedAt }] }|
|댓글 수정|PUT|/comments/:commentId|{ comment }|{ "message" }|
|댓글 삭제|DELETE|/comments/:commentId||{ "message" }|
|좋아요 게시글 조회|GET|/posts/like||{ data: [{ postId, userId, nickname, title, createdAt, updatedAt, likes }] }|
|게시글 좋아요|PUT|/posts/:postId/like||{ "message" }|
