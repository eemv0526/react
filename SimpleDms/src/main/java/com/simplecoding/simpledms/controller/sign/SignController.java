package com.simplecoding.simpledms.controller.sign;
import com.simplecoding.simpledms.service.sign.SignService;
import com.simplecoding.simpledms.vo.dto.UserReqDto;
import com.simplecoding.simpledms.vo.dto.UserResDto;
import com.simplecoding.simpledms.vo.sign.Sign;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SignController {


    private final SignService signService;


    // 회원가입
    // @RequestBody - 객체로 전달
    @PostMapping("/api/sign/sign")
    public ResponseEntity<?> insert(@RequestBody Sign sign) {

        signService.insert(sign);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로그인 : Post 방식
    @PostMapping("/api/sign/login")
    public ResponseEntity<?> login(@RequestBody UserReqDto userReqDto) {

        UserResDto userResDto = signService.login(userReqDto);

        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }





}
