package com.simplecoding.simpledms.controller.auth;

import com.simplecoding.simpledms.service.auth.MemberService;
import com.simplecoding.simpledms.vo.auth.Member;
import com.simplecoding.simpledms.vo.dto.UserReqDto;
import com.simplecoding.simpledms.vo.dto.UserResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : KTE
 * @fileName : MemberController
 * @since : 24. 11. 11.
 * description :
 */
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    // @RequestBody - 객체로 전달
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> insert(@RequestBody Member member) {

        memberService.insert(member);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // 로그인 : Post 방식
    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody UserReqDto userReqDto) {

        UserResDto userResDto = memberService.login(userReqDto);

        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

}
