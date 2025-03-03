package com.simplecoding.simpledms.security.jwt;

import com.simplecoding.simpledms.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author : KTE
 * @fileName : AuthTokenFilter
 * @since : 24. 11. 14.
 * description : TODO : 필터 ( 자동 인증 )
 *                => 1) 체크 : 웹토큰 유효(위조, 만료 등)
 *                => 2) 우리 회원인지? DB (상세조회)
 *                   (UserDetailsServiceImpl 이용)
 *                => 3) 스프링시큐리티에게 인증완료 알림
 *                => 4) 홀더(필통)에 넣기
 */
@Slf4j

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private  JwtUtils jwtUtils;                        // 웹토큰
    @Autowired
    private  UserDetailsServiceImpl userDetailsService;// 상세조회

    //    함수재정의 : 생성 - 메소드구현(메뉴 클릭)
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{
// *                => 1) 체크 : 웹토큰 유효(위조, 만료 등)
            String jwt = parseJwt(request);
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
// *                => 2) 우리 회원인지? DB (상세조회) , 기본키(이메일)
                String email = jwtUtils.getUserNameFromJwtToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
// *                => 3) 스프링시큐리티에게 인증통과 알림
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
//                  => 4) 홀더(필통)에 넣기
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.debug("인증을 할 수 없습니다. : " + e);
        }
        filterChain.doFilter(request, response); // 필터 정의 완료
    }

    //   용도 : 프론트에서 보내준 헤더에 있는 웹토큰을 꺼내는 함수
//         예) html 헤더 : headers : { Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIi..." }
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth.startsWith("Bearer ")) {
//            웹토큰 : 7자리부터 시작해서 끝까지 문자열 잘라냄
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }
}
