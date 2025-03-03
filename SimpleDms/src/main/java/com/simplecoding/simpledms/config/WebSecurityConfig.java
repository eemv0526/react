package com.simplecoding.simpledms.config;

import com.simplecoding.simpledms.security.jwt.AuthTokenFilter;
import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author : KTE
 * @fileName : WebSecurityConfig
 * @Configuration : 자바 클래스 위에 붙이면 설정파일이 됨
 * @since : 24. 11. 12.
 * description : 스프링 시큐리티 보안설정 파일
 */
@Configuration
public class WebSecurityConfig {

    //    TODO: 암호화 객체 생성 함수 : UserDetailsServiceImpl 사용함
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



      //  필터 클래스 보안 귀찮으면 여길 주석으로막아
       @Bean
       public AuthTokenFilter authenticationJwtTokenFilter() {
           return new AuthTokenFilter();
      }






    // 개발자가 작성한 웹토큰 인증필터 생성자 함수
    //    TODO: 스프링 시큐리티 설치 (보안모드) : 이미지, css , js 등은 보안 비활성화(무시)
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
//        사용법 : (web) -> web.ignoring().requestMatchers("경로", "경로2",...)
        return (web) -> web.ignoring().requestMatchers(
                "/img/**",
                "/css/**",
                "/js/**",
                "/api/advanced/fileDb/{uuid}",
                "/api/home/home/{uuid}"
        );
    }

    //    TODO: 함수 : 보안 설정 예) 부서/사원메뉴 실행할수있게 허용
//      => 화면의 CRUD 기능을 허용/불가 설정을 하는것
//      => cors 보안 : 1개의 컴퓨터에서 포트번호 및 ip를 여러개 사용할수 있게 하는 설정
//          예) vue (8080) <-> springboot(8000) : x(기본) -> o(허용)
//      @Bean, @Service, @Mapper, @Repository, @Components
//                    => 스프링이 시작시 객체를 생성함(IOC)
//       => 설정 자바파일에 사용함
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()); // 1) cors 보안설정 사용
        http.csrf((csrf) -> csrf.disable());  // 2) csrf 해킹공격(쿠키/세션 인증) 방어 비활성화
        http.sessionManagement(sessionManagement
                -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // 3) 쿠키/세션 인증 비활성화(다른인증사용)
        http.formLogin(req -> req.disable()); // 4) jsp 방식 비활성화 -> axios 통신사용

//      TODO: 본격적 : 화면별 보안설정 : 예) 부서화면 모두(CRUD) 허용, 사원 허용안함
//        용어 : 인증(authentication)  / 권한(authority)
//           1) 인증 : 로그인하는것 (id/pwd 확인)
//           2) 권한 : 화면별로 (관리자/유저) 관리자가 볼수 있는것,
//                                        유저가 볼수 있는것을 나눈것
        http.authorizeHttpRequests(
                req -> req.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll() // 옵션(페이지이동 허용)
                        .requestMatchers("/").permitAll()                           // 홈페이지 URL 인증 없이 허용
                        .requestMatchers("/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/localhost:3000/**").permitAll()
                        // 모든 경로 인증 없이 허용                   // 부서 url 은 모두 접근 허용(로그인 관계없이)
                        .anyRequest().authenticated()

        );                               // 나머지 url 은 로그인해야 볼수 있음


        //  시프링시큐리티에 적용 : 토큰필터 보안 귀찮으면 여길 주석으로막아
       http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);


        return http.build();                                                          // 권한/인증 규칙 설정완료(반영)
    }
}
