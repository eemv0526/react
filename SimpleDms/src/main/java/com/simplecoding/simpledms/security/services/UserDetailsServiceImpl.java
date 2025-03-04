package com.simplecoding.simpledms.security.services;


import com.simplecoding.simpledms.mapper.sign.SignMapper;
import com.simplecoding.simpledms.security.dto.MemberDto;

import com.simplecoding.simpledms.vo.sign.Sign;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * @author : KTE
 * @fileName : UserDetailsServiceImpl
 * @since : 24. 11. 13.
 * description : TODO: 스프링시큐리티 사용 클래스 : 사용자가 우리 회원인지 확인
 *                     => .authenticate() 함수가 실행되면 유저를 체크함(상세조회?)
 *                 => MemberDto 관리시(인증통과) : 암호화 객체(Bcrypt)
 *                 => config/WebSecurityConfig 클래스 등록
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final SignMapper signMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // TODO: 1) 유저가 우리 회원인지? DB에서 확인 => 상세조회
        Sign sign = signMapper.selectSign(email)
                .orElseThrow(() -> new UsernameNotFoundException("우리 회원이 아닙니다."));

        // TODO: 2) MemberDto에 유저정보 + 권한정보 넣기
        GrantedAuthority authority = new SimpleGrantedAuthority(sign.getCodeName());
        
        // TODO: 3) 위의 권한을 배열로 관리 : EX) 관리자, 중재자
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(authority);

        return new MemberDto(sign.getEmail(), sign.getPassword(), authorities);
    }

}
