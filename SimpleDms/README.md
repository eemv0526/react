# 1) 회원가입
    - insert 실행
    - 패스워드 암호화 필요
    - insert 구현
# 2) 로그인
    - 인증 : 
      1) 과거(jsp/스프링) : 쿠키/세션 인증
      2) 현대(jwt(웹토큰) : 웹토큰 인증
      3) 웹토큰(jwt) : json web token
        - 구조 : 헤더(종류).내용(실데이터).서명(보안)
          => 내용 : 토큰발급자, 제목, 만료시간 설정
      4)스프링 시큐리티 : 인증/권한처리  
         절차 : 
           (1) id/pwd 인증(확인) : 통과
           (2) 통과된 유저들 => 필통(홀더)에 보관 : 인증완료
           (3) 웹토큰 발급(벡엔드) : 카드패스(호텔카드키)
           (4) 혹시 권한정보가 있으면 그것도 정의(생략) : ROLE_ADMIN,ROLE_USER
           (5) 택배상자(DTO)에 담기 : 1) 웹토큰, 2) 유저정보 
               => 프론트로 전송
       5) 프론트 유저는 꼭(반드시) 웹토큰을 지녀야 사이트 서핑이 가능
           => 코딩해석 : 부서게시판 조회 -> 벡엔드(웹토큰) 전송
                        -> 벡엔드 확인(내가 발급한것인지?) -> 결과 전송
# 3) 필터 : 자동인증 (다른 게시판 CRUD 시 자동 체크)

- security/jwt/AuthTokenFilter
- 등록 : WebSecurityConfig
- 




